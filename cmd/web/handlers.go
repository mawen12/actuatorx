package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	client2 "github.com/mawen12/actuatorx/internal/v2/client"
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

	opts := make([]client2.RequestOption, 0)
	opts = append(opts, client2.WithBaseURL(form.Url))

	switch form.AuthType {
	case "Basic Auth":
		opts = append(opts, client2.WithBasicAuthHeader(form.BasicAuthUsername, form.BasicAuthPassword))
	case "Bearer Token":
		opts = append(opts, client2.WithHeader("Authorization", "Bearer "+form.BasicToken))
	}

	cli := client2.NewClient(opts...)
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

	app.sessionManager.Put(r.Context(), "client", *cli)

	writeJson(w, r, nil)
}

func (app *application) Abilities(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	uid := r.Context().Value("uid").(string)
	app.clients[uid]
	return cli.Abilities(r.Context()), nil
}

func (app *application) GetHealth(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Health(r.Context())
}

func (app *application) GetMetrics(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Metrics(r.Context())
}

func (app *application) GetMetric(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	name := r.PathValue("name")
	if name == "" {
		return nil, errors.New("name parameter is required")
	}

	var m map[string]string
	r.Body = http.MaxBytesReader(w, r.Body, int64(1024*1024))
	dec := json.NewDecoder(r.Body)
	if err := dec.Decode(m); err != nil {
		return nil, err
	}

	return cli.Metric(r.Context(), name, m)
}

func (app *application) GetEnv(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Env(r.Context())
}

func (app *application) GetBeans(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Beans(r.Context())
}

func (app *application) GetConditions(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Conditions(r.Context())
}

func (app *application) GetConfigprops(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Configprops(r.Context())
}

func (app *application) GetCaches(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Caches(r.Context())
}

func (app *application) EvictAllCaches(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return nil, cli.EvictAllCaches(r.Context())
}

func (app *application) EvictCache(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	cacheManager := r.PathValue("cacheManager")
	if cacheManager == "" {
		return nil, errors.New("cacheManager parameter is required")
	}

	name := r.PathValue("name")
	if name == "" {
		return nil, errors.New("name parameter is required")
	}

	return nil, cli.EvictCache(r.Context(), cacheManager, name)
}

func (app *application) GetLoggers(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Loggers(r.Context())
}

func (app *application) SetLoggerlevel(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	name := r.URL.Query().Get("name")
	if name == "" {
		return nil, errors.New("name parameter is required")
	}

	level := r.URL.Query().Get("level")

	return nil, cli.SetLoggerLevel(r.Context(), name, level)
}

func (app *application) GetMappings(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Mappings(r.Context())
}

func (app *application) GetHttpExchanges(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.HttpExchanges(r.Context())
}

func (app *application) GetScheduledTasks(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.ScheduledTasks(r.Context())
}

func (app *application) GetTogglz(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Togglz(r.Context())
}

func (app *application) UpdateTogglz(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	enabledStr := r.URL.Query().Get("enabled")
	if enabledStr == "" {
		return nil, errors.New("enabled parameter is required")
	}

	enabled, err := strconv.ParseBool(enabledStr)
	if err != nil {
		return nil, errors.New("enabled parameter is invalid")
	}

	return cli.UpdateTogglz(r.Context(), enabled)
}

func (app *application) GetThreadDump(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.ThreadDump(r.Context())
}

type apiHandler func(w http.ResponseWriter, r *http.Request, cli *client2.Client) (data interface{}, err error)

func (app *application) wrap(handler apiHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		url := r.URL.Query().Get("url")
		cli, ok := a.TryAcquire(r.Context(), url)
		if !ok {
			serveError(w, errors.New("resource not exists"))
			return
		}
		defer cli.Release()

		data, err := handler(w, r, cli.Value())
		if err != nil {
			serveError(w, err)
			return
		}
		writeJson(w, r, data)
	}
}
