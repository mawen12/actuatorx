package main

import (
	"fmt"
	"log/slog"
	"net/http"
	"time"
)

func recovery(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				w.Header().Set("Connection", "Close")
				serveError(w, fmt.Errorf("%s", err))
			}
		}()

		next.ServeHTTP(w, r)
	}
}

func cors(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id,X-Requested-With")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
		w.Header().Set("Access-Control-Expose-Headers", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
	}
}

func log(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		path := r.URL.Path

		next.ServeHTTP(w, r)

		fields := make([]slog.Attr, 0)
		fields = append(fields, slog.String("method", r.Method), slog.String("remote_addr", r.RemoteAddr), slog.Int64("duration_ms", time.Since(start).Milliseconds()), slog.String("path", path))

		slog.LogAttrs(r.Context(), slog.LevelInfo, "http_request", fields...)
	}
}
