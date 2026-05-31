package api

import (
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id,X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
		c.Header("Access-Control-Expose-Headers", "*")
		c.Header("Access-Control-Allow-Origin", "*")
	}
}

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

func logger(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		path := r.URL.Path

		next.ServeHTTP(w, r)

		fields := make([]slog.Attr, 0)
		fields = append(fields, slog.String("method", r.Method), slog.String("remote_addr", r.RemoteAddr), slog.Int64("duration_ms", time.Since(start).Milliseconds()), slog.String("path", path))

		slog.LogAttrs(r.Context(), slog.LevelInfo, "http_request", fields...)
	}
}

// @deprecated
func loggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path

		c.Next()

		latency := time.Now().Sub(start)
		fields := make([]slog.Attr, 0)
		fields = append(fields,
			slog.Int("status", c.Writer.Status()),
			slog.String("method", c.Request.Method),
			slog.String("remote_addr", c.ClientIP()),
			slog.Int64("duration_ms", latency.Milliseconds()),
			slog.String("path", path),
		)

		level := slog.LevelInfo
		if err := c.Errors.Last(); err != nil {
			fields = append(fields, slog.String("err", err.Error()))
			level = slog.LevelError
		}

		slog.LogAttrs(c.Request.Context(), level, "http_request", fields...)

	}
}
