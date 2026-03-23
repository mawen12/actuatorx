package client

import (
	"context"
	"sync"
	"sync/atomic"
	"time"
)

type Resource struct {
	value        *Client
	creationTime time.Time
	lastUsedNano int64
	refs         atomic.Int32
}

func (res *Resource) Value() *Client {
	return res.value
}

func (res *Resource) Release() {
	res.refs.Add(-1)
	res.lastUsedNano = time.Since(time.Now()).Nanoseconds()
}

type Pool struct {
	clients map[string]*Resource

	closed bool
	cancel context.CancelFunc
	mux    sync.RWMutex
}

func NewPool() *Pool {
	p := &Pool{
		clients: make(map[string]*Resource),
	}

	ctx, cancel := context.WithCancel(context.Background())
	p.cancel = cancel

	go p.run(ctx)

	return p
}

func (p *Pool) Close() {
	p.mux.Lock()
	defer p.mux.Unlock()

	if p.closed {
		return
	}
	p.closed = true

	for urlStr, client := range p.clients {
		if client.refs.Load() == 0 {
			p.clients[urlStr] = nil
		}
	}
}

func (p *Pool) Add(urlStr string, value *Client) {
	p.mux.Lock()
	defer p.mux.Unlock()

	p.clients[urlStr] = &Resource{
		value:        value,
		creationTime: time.Now(),
	}
}

func (p *Pool) TryAcquire(ctx context.Context, urlStr string) (*Resource, bool) {
	p.mux.RLock()
	defer p.mux.RUnlock()

	if p.closed {
		return nil, false
	}

	c, exists := p.clients[urlStr]
	if exists {
		c.refs.Add(1)
	}
	return c, exists
}

func (p *Pool) run(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		}
	}
}
