package main

import (
	"context"
	"net/http"

	"github.com/mawen12/actuatorx/internal/client"
)

type contextKey string

const isAuthenticationContextKey = contextKey("isAuthenticated")

const clientContextKey = contextKey("client")

func (app *application) contextSetClient(r *http.Request, cli *client.Client) *http.Request {
	ctx := context.WithValue(r.Context(), clientContextKey, cli)
	return r.WithContext(ctx)
}

func (app *application) contextGetClient(r *http.Request) *client.Client {
	cli, ok := r.Context().Value(clientContextKey).(*client.Client)
	if !ok {
		panic("missing client value in request context")
	}
	return cli
}
