package api

import "github.com/gin-gonic/gin"

func SetupMiddleware(group *gin.RouterGroup) {
	group.Use(corsMiddleware())
	group.OPTIONS("/*path", func(c *gin.Context) {
		c.Status(204)
	})
}

func SetupRoutes(router *gin.Engine, api *ActuatorApi) {
	router.GET("/", gin.WrapH(GetHome("")))
	router.GET("/static/*path", gin.WrapH(GetAssets("")))

	router.Static("/assets", "./static/assets")

	ag := router.Group("/api")
	SetupMiddleware(ag)
	{
		ag.GET("/health", api.wrapperResult(api.GetHealth))
		ag.GET("/metrics", api.wrapperResult(api.GetMetrics))
		ag.GET("/metric", api.wrapperResult(api.GetMetric))
	}
}
