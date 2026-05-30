package main

import (
	"flag"
	"fmt"
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
	debug          bool
	logger         *slog.Logger
	sessionManager *scs.SessionManager
	formDecoder    *form.Decoder
	clients        map[string]*client.Client
}

var (
	addr    = flag.String("addr", env.Get("ADDR", ":4000"), "HTTP netword address")
	version = flag.Bool("version", env.GetBool("VERSION", false), "Print version and exit")
	debug   = flag.Bool("debug", env.GetBool("DEBUG", false), "Enable debug mode")
)

func main() {
	flag.Parse()

	if *version {
		fmt.Printf("ActuatorX Version \"%s\"\n", "0.1")
		os.Exit(0)
	}

	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level:     slog.LevelDebug,
		AddSource: true,
	}))

	sessionManager := scs.New()
	sessionManager.Store = memstore.New()
	sessionManager.Lifetime = 12 * time.Hour
	sessionManager.Cookie.Secure = true
	sessionManager.Cookie.SameSite = http.SameSiteStrictMode

	app := &application{
		debug:          *debug,
		logger:         logger,
		sessionManager: sessionManager,
		formDecoder:    form.NewDecoder(),
		clients:        make(map[string]*client.Client),
	}

	srv := &http.Server{
		Addr:         *addr,
		Handler:      app.routes(),
		ErrorLog:     slog.NewLogLogger(logger.Handler(), slog.LevelError),
		IdleTimeout:  time.Minute,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	logger.Info("starting server", "addr", *addr)

	err := srv.ListenAndServe()
	logger.Error(err.Error())
	os.Exit(1)
}
