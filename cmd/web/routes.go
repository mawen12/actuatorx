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

	dynamic := alice.New(app.sessionManager.LoadAndSave, noSurf, app.authenticate)

	mux.Handle("POST /api/connect", dynamic.ThenFunc(app.Connect))

	protected := dynamic.Append(app.requireAuthentication)
	protectedHandlerFunc := func(handler func(w http.ResponseWriter, r *http.Request) (interface{}, error)) http.Handler {
		return protected.ThenFunc(app.wrap(handler))
	}

	mux.Handle("GET /abilities", protectedHandlerFunc(app.Abilities))
	mux.Handle("GET /health", protectedHandlerFunc(app.GetHealth))
	mux.Handle("GET /metrics", protectedHandlerFunc(app.GetMetrics))
	mux.Handle("GET /metrics/:name", protectedHandlerFunc(app.GetMetric))
	mux.Handle("GET /env", protectedHandlerFunc(app.GetEnv))
	mux.Handle("GET /beans", protectedHandlerFunc(app.GetBeans))
	mux.Handle("GET /conditions", protectedHandlerFunc(app.GetConditions))
	mux.Handle("GET /configprops", protectedHandlerFunc(app.GetConfigprops))
	mux.Handle("GET /caches", protectedHandlerFunc(app.GetCaches))
	mux.Handle("DELETE /caches", protectedHandlerFunc(app.EvictAllCaches))
	mux.Handle("DELETE /caches/:cacheManager/:name", protectedHandlerFunc(app.EvictCache))
	mux.Handle("GET /loggers", protectedHandlerFunc(app.GetLoggers))
	mux.Handle("POST /logger", protectedHandlerFunc(app.SetLoggerlevel))
	mux.Handle("GET /mappings", protectedHandlerFunc(app.GetMappings))
	mux.Handle("GET /httpexchanges", protectedHandlerFunc(app.GetHttpExchanges))
	mux.Handle("GET /scheduledtasks", protectedHandlerFunc(app.GetScheduledTasks))
	mux.Handle("GET /togglz", protectedHandlerFunc(app.GetTogglz))
	mux.Handle("POST /togglz", protectedHandlerFunc(app.UpdateTogglz))
	mux.Handle("GET /threaddump", protectedHandlerFunc(app.GetThreadDump))

	standard := alice.New(recoverPanic, logRequest, commonHeader, cors)

	return standard.Then(mux)
}
