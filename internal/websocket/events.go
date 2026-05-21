package websocket

type WebsocketEvent interface {
}

type WebsocketInitEvent struct {
	Uid  string `json:"uid"`
	Type string `json:"type"`
}

type WebsocketEventWrapper struct {
	WebsocketEvent
	uid string
}
