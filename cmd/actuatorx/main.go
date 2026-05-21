package main

import (
	"flag"
	"fmt"
	"log/slog"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mawen12/actuatorx/internal/api"
)

const version = "0.1.1"

type config struct {
	port    int
	version bool
	debug   bool
}

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", getEnvInt("PORT", 4000), "Server Port")
	flag.BoolVar(&cfg.version, "version", getEnvBool("VERSION", false), "print version and exit")
	flag.BoolVar(&cfg.debug, "debug", getEnvBool("DEBUG", false), "set gin debug")
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

	logger, err := NewLogger("actuatorx.log")
	if err != nil {
		fmt.Printf("new logger failed: %v, will fallback to stdout", err)
	}
	defer logger.Close()

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
