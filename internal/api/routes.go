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
		ag.POST("/connect", api.Connect)
		ag.GET("/health", api.wrapperResult(api.GetHealth))
		ag.GET("/metrics", api.wrapperResult(api.GetMetrics))
		ag.POST("/metrics/:name", api.wrapperResult(api.GetMetric))
		ag.GET("/env", api.wrapperResult(api.GetEnv))
		ag.GET("/beans", api.wrapperResult(api.GetBeans))
		ag.GET("/conditions", api.wrapperResult(api.GetConditions))
		ag.GET("/configprops", api.wrapperResult(api.GetConfigprops))
		ag.GET("/caches", api.wrapperResult(api.GetCaches))
		ag.DELETE("/caches", api.wrapperResult(api.EvictAllCaches))
		ag.DELETE("/caches/:cacheManager/:name", api.wrapperResult(api.EvictCache))
		ag.GET("/loggers", api.wrapperResult(api.GetLoggers))
		ag.POST("/loggers", api.wrapperResult(api.SetLoggerLevel))
		ag.GET("/mappings", api.wrapperResult(api.GetMappings))
		ag.GET("/httpexchanges", api.wrapperResult(api.GetHttpExchanges))
		ag.GET("/scheduledtasks", api.wrapperResult(api.GetScheduledTasks))
		ag.GET("/togglz", api.wrapperResult(api.GetTogglz))
		ag.POST("/togglz/:instanceId", api.wrapperResult(api.UpdateTogglz))
	}
}
