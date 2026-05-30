package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-playground/form/v4"
	client2 "github.com/mawen12/actuatorx/internal/v1/client"
	"github.com/mawen12/actuatorx/static"
)

func GetHome() http.Handler {
	return http.StripPrefix("", static.GetHandler())
}

type ActuatorApiV2 struct {
	*client2.Pool
	formDecoder *form.Decoder
}

func NewActuatorApiV2() *ActuatorApiV2 {
	return &ActuatorApiV2{
		Pool: client2.NewPool(),
	}
}

func (a *ActuatorApiV2) Connect(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		serveError(w, err)
		return
	}

	var connectForm struct {
		Url               string `form:"url"`
		AuthType          string `form:"authType"`
		BasicAuthUsername string `form:"basicAuthUsername"`
		BasicAuthPassword string `form:"basicAuthPassword"`
		BasicToken        string `form:"bearerToken"`
	}
	if err = a.formDecoder.Decode(&connectForm, r.PostForm); err != nil {
		serveError(w, err)
		return
	}

	var auth client2.Auther
	switch connectForm.AuthType {
	case "Basic Auth":
		auth = &client2.BasicAuth{
			Username: connectForm.BasicAuthUsername,
			Password: connectForm.BasicAuthPassword,
		}
	case "Bearer Token":
		auth = &client2.BearerToken{
			Token: connectForm.BasicToken,
		}
	}

	cli, err := client2.Connect(client2.ConnectConfig{
		Url:      connectForm.Url,
		AuthType: connectForm.AuthType,
		Auth:     auth,
	})
	if err != nil {
		serveError(w, err)
	}

	a.Pool.Add(connectForm.Url, cli)
	writeJson(w, r, nil)
}

func (a *ActuatorApiV2) Abilities(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Abilities(), nil
}

func (a *ActuatorApiV2) GetHealth(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Health(r.Context())
}

func (a *ActuatorApiV2) GetMetrics(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Metrics(r.Context())
}

func (a *ActuatorApiV2) GetMetric(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
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

func (a *ActuatorApiV2) GetEnv(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Env(r.Context())
}

func (a *ActuatorApiV2) GetBeans(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Beans(r.Context())
}

func (a *ActuatorApiV2) GetConditions(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Conditions(r.Context())
}

func (a *ActuatorApiV2) GetConfigprops(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Configprops(r.Context())
}

func (a *ActuatorApiV2) GetCaches(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Caches(r.Context())
}

func (a *ActuatorApiV2) EvictAllCaches(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return nil, cli.EvictAllCaches(r.Context())
}

func (a *ActuatorApiV2) EvictCache(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
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

func (a *ActuatorApiV2) GetLoggers(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Loggers(r.Context())
}

func (a *ActuatorApiV2) SetLoggerlevel(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	name := r.URL.Query().Get("name")
	if name == "" {
		return nil, errors.New("name parameter is required")
	}

	level := r.URL.Query().Get("level")

	return nil, cli.SetLoggerLevel(r.Context(), name, level)
}

func (a *ActuatorApiV2) GetMappings(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Mappings(r.Context())
}

func (a *ActuatorApiV2) GetHttpExchanges(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.HttpExchanges(r.Context())
}

func (a *ActuatorApiV2) GetScheduledTasks(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.ScheduledTasks(r.Context())
}

func (a *ActuatorApiV2) GetTogglz(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.Togglz(r.Context())
}

func (a *ActuatorApiV2) UpdateTogglz(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
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

func (a *ActuatorApiV2) GetThreadDump(w http.ResponseWriter, r *http.Request, cli *client2.Client) (interface{}, error) {
	return cli.ThreadDump(r.Context())
}

type apiHandler func(w http.ResponseWriter, r *http.Request, cli *client2.Client) (data interface{}, err error)

func (a *ActuatorApiV2) wrap(handler apiHandler) http.HandlerFunc {
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
