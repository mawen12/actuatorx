package main

import (
	"flag"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/alexedwards/scs/v2"
	"github.com/alexedwards/scs/v2/memstore"
	"github.com/go-playground/form/v4"
	"github.com/mawen12/actuatorx/internal/v2/client"
	"github.com/mawen12/actuatorx/pkg/env"
)

type application struct {
	config         config
	logger         *slog.Logger
	sessionManager *scs.SessionManager
	formDecoder    *form.Decoder
	clients        map[string]*client.Client
}

type config struct {
	port         int
	debug        bool
	handlerDebug bool
	pprof        bool
}

func main() {
	var cfg config
	flag.IntVar(&cfg.port, "port", env.GetInt("PORT", 4000), "Server port")
	flag.BoolVar(&cfg.debug, "debug", env.GetBool("DEBUG", false), "Enable debug mode")
	flag.BoolVar(&cfg.handlerDebug, "handler-debug", env.GetBool("HANDLER_DEBUG", false), "Enable debug handler")
	flag.BoolVar(&cfg.pprof, "pprof", env.GetBool("PPROF", false), "Enable debug handler")
	flag.Parse()

	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level:     slog.LevelDebug,
		AddSource: true,
	}))

	sessionManager := scs.New()
	sessionManager.Store = memstore.New()
	sessionManager.Lifetime = 12 * time.Hour
	sessionManager.Cookie.Secure = !cfg.debug
	sessionManager.Cookie.SameSite = http.SameSiteStrictMode

	app := &application{
		config:         cfg,
		logger:         logger,
		sessionManager: sessionManager,
		formDecoder:    form.NewDecoder(),
		clients:        make(map[string]*client.Client),
	}

	if cfg.pprof {
		go func() {
			logger.Info("pprof listening on :6060", "path", "/debug/pprof")
			logger.Error(http.ListenAndServe("localhost:6060", nil).Error())
		}()
	}

	if err := app.serve(); err != nil {
		logger.Error(err.Error())
		os.Exit(1)
	}
}
