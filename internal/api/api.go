package api

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mawen12/actuatorx/internal/client"
)

type ActuatorApi struct {
	*client.Pool
}

func NewActuatorApi() *ActuatorApi {
	return &ActuatorApi{
		Pool: client.NewPool(),
	}
}

func (a *ActuatorApi) GetHealth(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Health(c.Request.Context())
}

func (a *ActuatorApi) GetMetrics(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Metrics(c.Request.Context())
}

func (a *ActuatorApi) GetMetric(c *gin.Context, cli *client.Client) (interface{}, error) {
	name := c.Param("name")
	if name == "" {
		return nil, errors.New("'name' parameter is required")
	}

	var m map[string]string
	if err := c.ShouldBindJSON(&m); err != nil {
		return nil, err
	}
	return cli.Metric(c.Request.Context(), name, m)
}

func (a *ActuatorApi) GetEnv(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Env(c.Request.Context())
}

func (a *ActuatorApi) GetBeans(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Beans(c.Request.Context())
}

func (a *ActuatorApi) GetConditions(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Conditions(c.Request.Context())
}

func (a *ActuatorApi) GetConfigprops(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Configprops(c.Request.Context())
}

func (a *ActuatorApi) GetCaches(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Caches(c.Request.Context())
}

func (a *ActuatorApi) EvictAllCaches(c *gin.Context, cli *client.Client) (interface{}, error) {
	err := cli.EvictAllCaches(c.Request.Context())
	return nil, err
}

func (a *ActuatorApi) EvictCache(c *gin.Context, cli *client.Client) (interface{}, error) {
	cacheManager := c.Param("cacheManager")
	if cacheManager == "" {
		return nil, errors.New("'cacheManager' parameter is required")
	}

	name := c.Param("name")
	if name == "" {
		return nil, errors.New("'name' parameter is required")
	}

	err := cli.EvictCache(c.Request.Context(), cacheManager, name)
	return nil, err
}

func (a *ActuatorApi) GetLoggers(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Loggers(c.Request.Context())
}

func (a *ActuatorApi) SetLoggerLevel(c *gin.Context, cli *client.Client) (interface{}, error) {
	name := c.Request.FormValue("name")
	if name == "" {
		return nil, errors.New("'name' parameter is required")
	}

	level := c.Request.FormValue("level")

	err := cli.SetLoggerLevel(c.Request.Context(), name, level)
	return nil, err
}

func (a *ActuatorApi) GetMappings(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Mappings(c.Request.Context())
}

func (a *ActuatorApi) GetHttpExchanges(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.HttpExchanges(c.Request.Context())
}

func (a *ActuatorApi) GetLogfile(c *gin.Context, cli *client.Client) (interface{}, error) {
	startStr := c.Query("start")
	endStr := c.Query("end")
	if (startStr == "" && endStr != "") || (startStr != "" && endStr == "") {
		return nil, errors.New("'start' or 'end' parameter is required")
	}

	start, err := strconv.Atoi(startStr)
	if err != nil {
		return nil, errors.New("'start' or 'end' parameter is invalid")
	}

	end, err := strconv.Atoi(endStr)
	if err != nil {
		return nil, errors.New("'start' or 'end' parameter is invalid")
	}

	return cli.Logfile(c.Request.Context(), start, end)
}

func (a *ActuatorApi) GetScheduledTasks(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.ScheduledTasks(c.Request.Context())
}

func (a *ActuatorApi) GetTogglz(c *gin.Context, cli *client.Client) (interface{}, error) {
	return cli.Togglz(c.Request.Context())
}

func (a *ActuatorApi) UpdateTogglz(c *gin.Context, cli *client.Client) (interface{}, error) {
	enabledStr := c.Query("enabled")
	if enabledStr == "" {
		return nil, errors.New("'enabled' parameter is required")
	}

	enabled, err := strconv.ParseBool(enabledStr)
	if err != nil {
		return nil, errors.New("'enabled' parameter is invalid")
	}

	return cli.UpdateTogglz(c.Request.Context(), enabled)
}

func (a *ActuatorApi) wrapperResult(handler func(c *gin.Context, cli *client.Client) (data interface{}, err error)) func(*gin.Context) {
	return func(c *gin.Context) {
		res, err := a.resource(c)
		if err != nil {
			errorResp(c, http.StatusBadRequest, err)
			return
		}
		defer res.Release()

		resp, err := handler(c, res.Value())
		serverResult(c, resp, err)
	}
}

func (a *ActuatorApi) resource(c *gin.Context) (*client.Resource, error) {
	urlStr := c.Param("url")
	res, err := a.TryAcquire(c.Request.Context(), urlStr)
	if err != nil {
		return nil, err
	}

	return res, nil
}
