package main

import (
	"net/http"

	"github.com/mawen12/actuatorx/internal/v2/client"
)

type contextKey string

const isAuthenticationContextKey = contextKey("isAuthenticated")

func (app *application) contextSetClient(r *http.Request, cli *client.Client) {
		
}
