package main

import (
	"context"
	"net/http"

	"github.com/mawen12/actuatorx/internal/v2/client"
)

type contextKey string

const isAuthenticationContextKey = contextKey("isAuthenticated")

const clientContextKey = contextKey("client")

func (app *application) contextSetClient(r *http.Request, cli *client.Client) {
	ctx := context.WithValue(r.Context(), clientContextKey, cli)
	r.WithContext(ctx)
}

func (app *application) contextGetClient(r *http.Request) *client.Client {
	cli, ok := r.Context().Value(clientContextKey).(*client.Client)
	if !ok {
		panic("missing client value in request context")
	}
	return cli
}
