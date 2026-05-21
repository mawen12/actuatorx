package websocket

import (
	"fmt"
	"net/http"
	"time"

	ws "github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
)

var Upgrader = ws.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Hub struct {
	ids     map[string]*Client
	clients map[*Client]bool

	broadcast  chan WebsocketEventWrapper
	register   chan *Client
	unregister chan *Client
	shutdown   chan struct{}
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan WebsocketEventWrapper, 1024),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		ids:        make(map[string]*Client),
		clients:    make(map[*Client]bool),
		shutdown:   make(chan struct{}, 1),
	}
}

func (h *Hub) Close() {
	h.shutdown <- struct{}{}
	close(h.register)
	close(h.unregister)
	close(h.broadcast)
	close(h.shutdown)
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.ids[client.uid] = client
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				delete(h.ids, client.uid)
				close(client.send)
			}
		case message := <-h.broadcast:
			if client, ok := h.ids[message.uid]; ok {
				select {
				case client.send <- message.WebsocketEvent:
				default:
					close(client.send)
					delete(h.clients, client)
					delete(h.ids, client.uid)
				}
			}
		case <-h.shutdown:
			for client := range h.clients {
				go client.Close()
			}
			fmt.Println("receive shutdown")
			return
		}
	}
}