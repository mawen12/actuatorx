package websocket

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"
	ws "github.com/gorilla/websocket"
)

type Client struct {
	hub *Hub

	uid  string
	conn *ws.Conn

	send          chan WebsocketEvent
	readShutdown  chan struct{}
	writeShutdown chan struct{}
}

func NewClientAndRegister(hub *Hub, conn *ws.Conn) *Client {
	client := &Client{
		hub:           hub,
		uid:           uuid.New().String(),
		conn:          conn,
		send:          make(chan WebsocketEvent, 1024),
		readShutdown:  make(chan struct{}, 1),
		writeShutdown: make(chan struct{}, 1),
	}

	client.hub.register <- client

	return client
}

func (c *Client) Init() {
	c.send <- WebsocketInitEvent{Uid: c.uid, Type: "init"}
}

func (c *Client) Run() {
	go c.writePump()
	go c.readPump()
}

func (c *Client) Close() {
	c.readShutdown <- struct{}{}
	c.writeShutdown <- struct{}{}
}

func (c *Client) readPump() {
	var needUnregister = true
	defer func() {
		if needUnregister {
			c.hub.unregister <- c
		}
		c.conn.Close()
		close(c.readShutdown)
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error {
		c.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for range c.readShutdown {
		fmt.Println("receive read shutdown")
		needUnregister = false
		return
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
		close(c.writeShutdown)
	}()

	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.conn.WriteMessage(ws.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(ws.TextMessage)
			if err != nil {
				return
			}
			bs, err := json.MarshalIndent(message, "", "\t")
			if err != nil {
				return
			}
			w.Write(bs)

			if err := w.Close(); err != nil {
				return
			}
		case <-c.writeShutdown:
			fmt.Println("receive write shutdown")
			return
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(ws.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
