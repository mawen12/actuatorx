package main

import (
	"flag"
	"fmt"
	"os"
	"path"

	"github.com/gin-gonic/gin"
	"github.com/mawen12/actuatorx/internal/api"
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
		fmt.Println("log file init failed", "log", log, "err", err)
		os.Exit(1)
	}
	defer logfile.Close()

	fmt.Println("Starting server", "port", cfg.port)

	router := gin.New()

	router.Use(gin.Recovery())

	actuatorApi := api.NewActuatorApi()
	api.SetupRoutes(router, actuatorApi)

	if err := router.Run(fmt.Sprintf(":%d", cfg.port)); err != nil {
		panic(err)
	}
}
