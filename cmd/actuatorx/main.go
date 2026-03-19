package main

import (
	"flag"
	"fmt"
	"log/slog"
	"os"
	"path"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mawen12/actuatorx/internal/api"

	"github.com/lmittmann/tint"
)

type config struct {
	port int
}

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "Server Port")
	flag.Parse()

	log := path.Join(os.TempDir(), "actuatorx.log")
	logfile, err := os.OpenFile(log, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0600)
	if err != nil {
		slog.Error("log file init failed", "log", log, "err", err)
		os.Exit(1)
	}
	defer logfile.Close()

	slog.SetDefault(slog.New(tint.NewHandler(logfile, &tint.Options{
		Level:      slog.LevelInfo,
		TimeFormat: time.RFC3339,
	})))

	slog.Info("Starting server", "port", cfg.port)

	router := gin.New()

	router.Use(gin.Recovery())

	actuatorApi := api.NewActuatorApi()
	api.SetupRoutes(router, actuatorApi)

	if err := router.Run(fmt.Sprintf(":%d", cfg.port)); err != nil {
		panic(err)
	}
}
