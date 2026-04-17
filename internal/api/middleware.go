package api

import (
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

// func loggerMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		start := time.Now()
// 		path := c.Request.URL.Path

// 		c.Next()

// 		latency := time.Now().Sub(start)
// 		fields := make([]slog.Attr, 0)
// 		fields = append(fields,
// 			slog.Int("status", c.Writer.Status()),
// 			slog.String("method", c.Request.Method),
// 			slog.String("remote_addr", c.ClientIP()),
// 			slog.Int64("duration_ms", latency.Milliseconds()),
// 			slog.String("path", path),
// 		)

// 		level := slog.LevelInfo
// 		if err := c.Errors.Last(); err != nil {
// 			fields = append(fields, slog.String("err", err.Error()))
// 			level = slog.LevelError
// 		}

// 		slog.LogAttrs(c.Request.Context(), level, "http_request", fields...)

// 	}
// }
