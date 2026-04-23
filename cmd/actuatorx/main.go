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

const version = "0.1"

type config struct {
	port    int
	version bool
	debug   bool
}

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "Server Port")
	flag.BoolVar(&cfg.version, "version", false, "print version and exit")
	flag.BoolVar(&cfg.debug, "debug", false, "set gin debug")
	flag.Parse()

	if cfg.version {
		fmt.Printf("ActuatorX Version \"%s\"\n", version)
		os.Exit(0)
	}

	if cfg.debug {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

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
	fmt.Println("Starting server", fmt.Sprintf(":%d", cfg.port))

	router := gin.New()

	router.Use(gin.Recovery())

	actuatorApi := api.NewActuatorApi()
	api.SetupRoutes(router, actuatorApi)

	if err := router.Run(fmt.Sprintf(":%d", cfg.port)); err != nil {
		panic(err)
	}
}
