package api

import (
	"github.com/gin-gonic/gin"
	"github.com/mawen12/actuatorx/static"
)

func SetupMiddleware(group *gin.RouterGroup) {
	group.Use(corsMiddleware())
	group.Use(loggerMiddleware())
	group.OPTIONS("/*path", func(c *gin.Context) {
		c.Status(204)
	})
}

func SetupRoutes(router *gin.Engine, api *ActuatorApi) {
	router.GET("/", gin.WrapH(GetHome()))
	router.GET("/static/*path", gin.WrapH(GetAssets()))

	router.GET("/favicon.ico", gin.WrapH(static.GetHandler()))
	router.StaticFS("/assets", static.GetAssetsFilesystem())

	ag := router.Group("/api")
	SetupMiddleware(ag)
	{
		ag.POST("/connect", api.Connect)
		ag.GET("/abilities", api.wrap(api.Abilities))
		ag.GET("/health", api.wrap(api.GetHealth))
		ag.GET("/metrics", api.wrap(api.GetMetrics))
		ag.POST("/metrics/:name", api.wrap(api.GetMetric))
		ag.GET("/env", api.wrap(api.GetEnv))
		ag.GET("/beans", api.wrap(api.GetBeans))
		ag.GET("/conditions", api.wrap(api.GetConditions))
		ag.GET("/configprops", api.wrap(api.GetConfigprops))
		ag.GET("/caches", api.wrap(api.GetCaches))
		ag.DELETE("/caches", api.wrap(api.EvictAllCaches))
		ag.DELETE("/caches/:cacheManager/:name", api.wrap(api.EvictCache))
		ag.GET("/loggers", api.wrap(api.GetLoggers))
		ag.POST("/loggers", api.wrap(api.SetLoggerLevel))
		ag.GET("/mappings", api.wrap(api.GetMappings))
		ag.GET("/httpexchanges", api.wrap(api.GetHttpExchanges))
		ag.GET("/scheduledtasks", api.wrap(api.GetScheduledTasks))
		ag.GET("/togglz", api.wrap(api.GetTogglz))
		ag.POST("/togglz/:instanceId", api.wrap(api.UpdateTogglz))
		ag.GET("/threaddump", api.wrap(api.GetThreadDump))
		ag.GET("/threaddump/download", api.wrap(api.DownloadThreadDump))
	}
}
