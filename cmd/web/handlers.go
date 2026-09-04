package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/mawen12/actuatorx/internal/client"
	"github.com/mawen12/actuatorx/static"
)

func GetHome() http.Handler {
	return http.StripPrefix("", static.GetHandler())
}

func (app *application) Connect(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		serveError(w, err)
		return
	}

	var form struct {
		Url               string `form:"url"`
		AuthType          string `form:"authType"`
		BasicAuthUsername string `form:"basicAuthUsername"`
		BasicAuthPassword string `form:"basicAuthPassword"`
		BasicToken        string `form:"bearerToken"`
	}
	if err = app.formDecoder.Decode(&form, r.PostForm); err != nil {
		serveError(w, err)
		return
	}

	opts := make([]client.RequestOption, 0)
	opts = append(opts, client.WithBaseURL(form.Url))

	switch form.AuthType {
	case "Basic Auth":
		opts = append(opts, client.WithBasicAuthHeader(form.BasicAuthUsername, form.BasicAuthPassword))
	case "Bearer Token":
		opts = append(opts, client.WithHeader("Authorization", "Bearer "+form.BasicToken))
	}

	cli := client.NewClient(opts...)
	err = cli.Init(r.Context())
	if err != nil {
		serveError(w, err)
		return
	}

	err = app.sessionManager.RenewToken(r.Context())
	if err != nil {
		serveError(w, err)
		return
	}

	uid := uuid.NewString()
	app.clients[uid] = cli
	app.sessionManager.Put(r.Context(), "uid", uid)

	w.WriteHeader(200)
}

func (app *application) Disconnect(w http.ResponseWriter, r *http.Request) {
	uid := app.sessionManager.GetString(r.Context(), "uid")
	delete(app.clients, uid)

	app.logger.Info("client disconnected", "uid", uid)

	if err := app.sessionManager.RenewToken(r.Context()); err != nil {
		serveError(w, err)
		return
	}

	w.WriteHeader(200)
}

func (app *application) wrap(handler func(http.ResponseWriter, *http.Request) (interface{}, error)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data, err := handler(w, r)
		if err != nil {
			app.logger.Warn("handler err", "err", err)
			serveError(w, err)
			return
		}

		writeJson(w, r, data)
	}
}

func (app *application) Abilities(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Abilities(r.Context()), nil
}

func (app *application) GetHealth(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Health(r.Context())
}

func (app *application) GetMetrics(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Metrics(r.Context())
}

func (app *application) GetMetric(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	name := r.PathValue("name")
	if name == "" {
		return nil, errors.New("name parameter is required")
	}

	opts := make([]client.RequestOption, 0)

	// tags is optional
	var m map[string]string
	// r.Body = http.MaxBytesReader(w, r.Body, int64(1024*1024))
	dec := json.NewDecoder(r.Body)
	if err := dec.Decode(&m); err == nil {
		for k, v := range m {
			opts = append(opts, client.WithQueryAdd("tag", fmt.Sprintf("%s:%s", k, v)))
		}
	}

	cli := app.contextGetClient(r)
	return cli.Metric(r.Context(), name, opts...)
}

func (app *application) GetEnv(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Env(r.Context())
}

func (app *application) GetBeans(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Beans(r.Context())
}

func (app *application) GetConditions(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Conditions(r.Context())
}

func (app *application) GetConfigprops(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Configprops(r.Context())
}

func (app *application) GetCaches(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Caches(r.Context())
}

func (app *application) EvictAllCaches(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return nil, cli.EvictAllCaches(r.Context())
}

func (app *application) EvictCache(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cacheManager := r.PathValue("cacheManager")
	if cacheManager == "" {
		return nil, errors.New("cacheManager parameter is required")
	}

	name := r.PathValue("name")
	if name == "" {
		return nil, errors.New("name parameter is required")
	}

	opt := client.WithQueryAdd("cacheManager", cacheManager)

	cli := app.contextGetClient(r)
	return nil, cli.EvictCache(r.Context(), name, opt)
}

func (app *application) GetLoggers(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Loggers(r.Context())
}

func (app *application) SetLoggerlevel(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	name := r.URL.Query().Get("name")
	if name == "" {
		return nil, errors.New("name parameter is required")
	}

	level := r.URL.Query().Get("level")

	opt := client.WithJSONSet("configuredLevel", level)

	cli := app.contextGetClient(r)
	return nil, cli.SetLoggerLevel(r.Context(), name, opt)
}

func (app *application) GetMappings(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Mappings(r.Context())
}

func (app *application) GetHttpExchanges(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.HttpExchanges(r.Context())
}

func (app *application) GetScheduledTasks(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.ScheduledTasks(r.Context())
}

func (app *application) GetTogglz(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.Togglz(r.Context())
}

func (app *application) UpdateTogglz(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	name := r.PathValue("name")
	if name == "" {
		return nil, errors.New("instanceId parameter is required")
	}

	enabledStr := r.URL.Query().Get("enabled")
	if enabledStr == "" {
		return nil, errors.New("enabled parameter is required")
	}

	enabled, err := strconv.ParseBool(enabledStr)
	if err != nil {
		return nil, errors.New("enabled parameter is invalid")
	}

	opt := client.WithJSONSet("enabled", enabled)

	cli := app.contextGetClient(r)
	return nil, cli.UpdateTogglz(r.Context(), name, opt)
}

func (app *application) GetThreadDump(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	cli := app.contextGetClient(r)
	return cli.ThreadDump(r.Context())
}

func (app *application) DownloadThreadDump(w http.ResponseWriter, r *http.Request) {
	opt := client.WithHeader("Accept", "text/plain")

	cli := app.contextGetClient(r)

	bs, err := cli.DownloadThreadDump(r.Context(), opt)
	if err != nil {
		serveError(w, err)
		return
	}

	w.Header().Set("Content-Disposition", "attachment;")
	w.Header().Set("Content-Type", "application/octet-stream")

	reader := bytes.NewReader(bs)

	_, err = io.Copy(w, reader)
	if err != nil {
		serveError(w, err)
		return
	}
}
