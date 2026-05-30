package main

import (
	"net/http"

	"github.com/justinas/alice"
	"github.com/mawen12/actuatorx/static"
)

func (app *application) routes() http.Handler {
	mux := http.NewServeMux()

	mux.Handle("/", GetHome())
	mux.Handle("/static/*path", static.GetHandler())
	mux.Handle("/favicon.svg", static.GetHandler())

	dynamic := alice.New(app.sessionManager.LoadAndSave)

	mux.Handle("POST /api/connect", api.Connect)
	mux.HandleFunc("GET /abilities", api.wrap(api.Abilities))
	mux.HandleFunc("GET /health", api.wrap(api.GetHealth))
	mux.HandleFunc("GET /metrics", api.wrap(api.GetMetrics))
	mux.HandleFunc("GET /metrics/:name", api.wrap(api.GetMetric))
	mux.HandleFunc("GET /env", api.wrap(api.GetEnv))
	mux.HandleFunc("GET /beans", api.wrap(api.GetBeans))
	mux.HandleFunc("GET /conditions", api.wrap(api.GetConditions))
	mux.HandleFunc("GET /configprops", api.wrap(api.GetConfigprops))
	mux.HandleFunc("GET /caches", api.wrap(api.GetCaches))
	mux.HandleFunc("DELETE /caches", api.wrap(api.EvictAllCaches))
	mux.HandleFunc("DELETE /caches/:cacheManager/:name", api.wrap(api.EvictCache))
	mux.HandleFunc("GET /loggers", api.wrap(api.GetLoggers))
	mux.HandleFunc("POST /logger", api.wrap(api.SetLoggerlevel))
	mux.HandleFunc("GET /mappings", api.wrap(api.GetMappings))
	mux.HandleFunc("GET /httpexchanges", api.wrap(api.GetHttpExchanges))
	mux.HandleFunc("GET /scheduledtasks", api.wrap(api.GetScheduledTasks))
	mux.HandleFunc("GET /togglz", api.wrap(api.GetTogglz))
	mux.HandleFunc("POST /togglz", api.wrap(api.UpdateTogglz))
	mux.HandleFunc("GET /threaddump", api.wrap(api.GetThreadDump))

	standard := alice.New(recoverPanic, logRequest, commonHeader, cors)

	return standard.Then(mux)
}
