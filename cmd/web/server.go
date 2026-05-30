package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func serve() error {
	srv := &http.Server{
		Addr:         ":4010",
		Handler:      routes(NewActuatorApiV2()),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	shutdownError := make(chan error)

	// tip: this cannot use background, because it wait `group` to end, otherwise then into infinite loop
	go func() {
		quit := make(chan os.Signal, 1)
		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
		s := <-quit

		slog.Info("shutting down server quit", "signal", s)

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		err := srv.Shutdown(ctx)
		if err != nil {
			shutdownError <- err
		}

		shutdownError <- nil
	}()

	slog.Info("starting server ", "addr", srv.Addr)

	err := srv.ListenAndServe()
	if !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	err = <-shutdownError
	if err != nil {
		return err
	}

	slog.Info("stopped server")

	return nil
}

func writeJson(w http.ResponseWriter, r *http.Request, data any) {
	js, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		serveError(w, err)
		return
	}

	js = append(js, '\n')

	w.Header().Set("Content-Type", "application/json")
	{
		if start, ok := r.Context().Value("start").(time.Time); ok {
			w.Header().Set("Logs-Viewer-Cost-Ms", fmt.Sprint(time.Since(start).Milliseconds()))
		}
	}

	w.WriteHeader(200)
	w.Write(js)
}

func serveError(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusInternalServerError)
}
