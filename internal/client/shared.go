package client

import (
	"net/http"
	"sync"
	"time"
)

var (
	sharedClient *http.Client
	once         sync.Once
)

func SharedClient() *http.Client {
	once.Do(func() {
		sharedClient = &http.Client{
			Timeout: 10 * time.Second,
			Transport: &http.Transport{
				MaxIdleConns:        20,
				MaxIdleConnsPerHost: 10,
				IdleConnTimeout:     90 * time.Second,
			},
		}
	})

	return sharedClient
}
