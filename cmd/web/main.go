package main

import (
	"flag"
	"fmt"
	"log/slog"
	"os"

	"github.com/mawen12/actuatorx/internal/logger"
	"github.com/mawen12/actuatorx/pkg/env"
)

const version = "0.1.1"

type config struct {
	port    int
	version bool
	debug   bool
}

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", env.GetInt("PORT", 4000), "Server Port")
	flag.BoolVar(&cfg.version, "version", env.GetBool("VERSION", false), "print version and exit")
	flag.BoolVar(&cfg.debug, "debug", env.GetBool("DEBUG", false), "set gin debug")
	flag.Parse()

	if cfg.version {
		fmt.Printf("ActuatorX Version \"%s\"\n", version)
		os.Exit(0)
	}

	logger, err := logger.NewLogger("actuatorx.log")
	if err != nil {
		fmt.Printf("new logger failed: %v, will fallback to stdout", err)
	}
	defer logger.Close()

	slog.Info("Starting server", "port", cfg.port)
	fmt.Println("Starting server", fmt.Sprintf(":%d", cfg.port))

	if err := serve(); err != nil {
		slog.Error("Start serve", "err", err)
	}
}
