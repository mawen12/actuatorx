package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mawen12/actuatorx/internal/api"
)

func main() {
	router := gin.New()

	router.Use(gin.Recovery())

	actuatorApi := api.NewActuatorApi()
	api.SetupRoutes(router, actuatorApi)

	if err := router.Run("localhost:8081"); err != nil {
		panic(err)
		os.Exit(1)
	}
}
