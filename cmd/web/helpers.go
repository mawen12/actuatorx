package main

import "net/http"

func (app *application) isAuthenticated(r *http.Request) bool {
	isAuthenticated, ok := r.Context().Value(isAuthenticationContextKey).(bool)
	if !ok {
		return false
	}
	return isAuthenticated
}
