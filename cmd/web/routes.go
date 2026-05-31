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

	dynamic := alice.New(app.sessionManager.LoadAndSave, app.authenticate)
	if !app.config.debug {
		dynamic = alice.New(app.sessionManager.LoadAndSave, app.noSurf, app.authenticate)
	}

	mux.Handle("POST /api/connect", dynamic.ThenFunc(app.Connect))
	mux.Handle("POST /api/disconnect", dynamic.ThenFunc(app.Disconnect))

	protected := dynamic.Append(app.requireAuthentication)
	protectedHandlerFunc := func(handler func(w http.ResponseWriter, r *http.Request) (interface{}, error)) http.Handler {
		return protected.ThenFunc(app.wrap(handler))
	}

	mux.Handle("GET /api/abilities", protectedHandlerFunc(app.Abilities))
	mux.Handle("GET /api/health", protectedHandlerFunc(app.GetHealth))
	mux.Handle("GET /api/metrics", protectedHandlerFunc(app.GetMetrics))
	mux.Handle("POST /api/metrics/{name}", protectedHandlerFunc(app.GetMetric))
	mux.Handle("GET /api/env", protectedHandlerFunc(app.GetEnv))
	mux.Handle("GET /api/beans", protectedHandlerFunc(app.GetBeans))
	mux.Handle("GET /api/conditions", protectedHandlerFunc(app.GetConditions))
	mux.Handle("GET /api/configprops", protectedHandlerFunc(app.GetConfigprops))
	mux.Handle("GET /api/caches", protectedHandlerFunc(app.GetCaches))
	mux.Handle("DELETE /api/caches", protectedHandlerFunc(app.EvictAllCaches))
	mux.Handle("DELETE /api/caches/{cacheManager}/{name}", protectedHandlerFunc(app.EvictCache))
	mux.Handle("GET /api/loggers", protectedHandlerFunc(app.GetLoggers))
	mux.Handle("POST /api/loggers", protectedHandlerFunc(app.SetLoggerlevel))
	mux.Handle("GET /api/mappings", protectedHandlerFunc(app.GetMappings))
	mux.Handle("GET /api/httpexchanges", protectedHandlerFunc(app.GetHttpExchanges))
	mux.Handle("GET /api/scheduledtasks", protectedHandlerFunc(app.GetScheduledTasks))
	mux.Handle("GET /api/togglz", protectedHandlerFunc(app.GetTogglz))
	mux.Handle("POST /api/togglz", protectedHandlerFunc(app.UpdateTogglz))
	mux.Handle("GET /api/threaddump", protectedHandlerFunc(app.GetThreadDump))

	standard := alice.New(recoverPanic, logRequest, commonHeader, cors)

	return standard.Then(mux)
}
