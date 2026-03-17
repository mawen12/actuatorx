package client

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"

	"github.com/jtacoma/uritemplates"
)

type Client struct {
	*http.Client
	OriginURL string
	config    ConnectConfig
	enhancer  func(req *http.Request)

	baseURL   *url.URL
	abilities map[string]*uritemplates.UriTemplate
	closed    bool
}

type ConnectConfig struct {
	Url      string
	AuthType string
	Auth     Auther
}

func NewClient(urlStr string) (*Client, error) {
	uri, err := url.Parse(urlStr)
	if err != nil {
		return nil, err
	}

	c := Client{
		Client:    SharedClient(),
		OriginURL: urlStr,
		baseURL:   uri,
	}

	resp, err := c.Test(context.Background())
	if err != nil {
		return nil, err
	}

	if len(resp.Links) == 0 {
		return nil, &EndpointInvalidErr{Endpoint: urlStr}
	}

	abilities := make(map[string]*uritemplates.UriTemplate)
	for k, v := range resp.Links {
		tmpl, err := uritemplates.Parse(formatURL(v.Href))
		if err != nil {
			return nil, &LinkInvalidErr{Link: v.Href, err: err}
		}

		abilities[k] = tmpl
	}

	c.abilities = abilities

	return &c, nil
}

func Connect(config ConnectConfig) (*Client, error) {
	uri, err := url.Parse(config.Url)
	if err != nil {
		return nil, err
	}

	c := Client{
		Client:    SharedClient(),
		OriginURL: config.Url,
		baseURL:   uri,
		config:    config,
	}

	if config.Auth != nil {
		c.enhancer = config.Auth.Auth
	}

	resp, err := c.Test(context.Background())
	if err != nil {
		return nil, err
	}

	if len(resp.Links) == 0 {
		return nil, &EndpointInvalidErr{Endpoint: config.Url}
	}

	abilities := make(map[string]*uritemplates.UriTemplate)
	for k, v := range resp.Links {
		tmpl, err := uritemplates.Parse(formatURL(v.Href))
		if err != nil {
			return nil, &LinkInvalidErr{Link: v.Href, err: err}
		}

		abilities[k] = tmpl
	}

	c.abilities = abilities

	return &c, nil
}

func (c *Client) Test(ctx context.Context) (*ActuatorResp, error) {
	var resp ActuatorResp
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, c.baseURL.String(), nil)
	if err != nil {
		return nil, err
	}

	err = c.do(req, &resp)
	if err == nil {
		return &resp, nil
	}

	errMsg := err.Error()

	if regexErrConnectionRefused.MatchString(errMsg) {
		return nil, ErrConnectionRefused
	}
	if regexErrNotFound.MatchString(errMsg) {
		return nil, ErrNotFound
	}

	return nil, fmt.Errorf(errMsg)
}

func (c *Client) Health(ctx context.Context) (resp *HealthResp, err error) {
	err = c.get(ctx, "health", emptyTmplParams, &resp)
	return
}

func (c *Client) Metrics(ctx context.Context) (resp *MetricsResp, err error) {
	err = c.get(ctx, "metrics", emptyTmplParams, &resp)
	return
}

func (c *Client) Metric(ctx context.Context, metricName string, tags map[string]string) (*MetricResp, error) {
	var resp MetricResp

	u, err := c.evaluateTmpl("metrics-requiredMetricName", map[string]interface{}{
		"requiredMetricName": metricName,
	})
	if err != nil {
		return nil, err
	}

	if len(tags) > 0 {
		q := u.Query()
		for k, v := range tags {
			q.Add("tag", fmt.Sprintf("%s:%s", k, v))
		}
		u.RawQuery = q.Encode()
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
	if err != nil {
		return nil, err
	}
	if err := c.do(req, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) Env(ctx context.Context) (*EnvResp, error) {
	var resp EnvResp
	if err := c.get(ctx, "env", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) Beans(ctx context.Context) (*BeansResp, error) {
	var resp BeansResp
	if err := c.get(ctx, "beans", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) Conditions(ctx context.Context) (*ConditionsResp, error) {
	var resp ConditionsResp
	if err := c.get(ctx, "conditions", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) Configprops(ctx context.Context) (*ConfigpropsResp, error) {
	var resp ConfigpropsResp
	if err := c.get(ctx, "configprops", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) Caches(ctx context.Context) (*CachesResp, error) {
	var resp CachesResp
	if err := c.get(ctx, "caches", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) EvictAllCaches(ctx context.Context) error {
	return c.delete(ctx, "caches", emptyTmplParams)
}

func (c *Client) EvictCache(ctx context.Context, cacheManager, cache string) error {
	u, err := c.evaluateTmpl("caches-cache", map[string]interface{}{
		"cache": cache,
	})
	if err != nil {
		return err
	}

	q := u.Query()
	q.Add("cacheManager", cacheManager)
	u.RawQuery = q.Encode()

	req, err := http.NewRequestWithContext(ctx, http.MethodDelete, u.String(), nil)
	if err != nil {
		return err
	}

	return c.do(req, nil)
}

func (c *Client) Loggers(ctx context.Context) (*LoggersResp, error) {
	var resp LoggersResp
	if err := c.get(ctx, "loggers", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) SetLoggerLevel(ctx context.Context, name, level string) error {
	return c.post(ctx, "loggers-name", map[string]interface{}{
		"name": name,
	}, &LoggerLevelReq{ConfiguredLevel: level}, nil)
}

func (c *Client) Mappings(ctx context.Context) (*MappingsResp, error) {
	var resp MappingsResp
	if err := c.get(ctx, "mappings", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) HttpExchanges(ctx context.Context) (*HttpExchangesResp, error) {
	var resp HttpExchangesResp
	if err := c.get(ctx, "httpexchanges", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) Logfile(ctx context.Context, start, end int) (string, error) {
	u, err := c.evaluateTmpl("logfile", emptyTmplParams)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
	if err != nil {
		return "", err
	}

	if end != 0 {
		req.Header.Set("Range", fmt.Sprintf("bytes=%d-%d", start, end))
	}

	var resp string
	err = c.do(req, &resp)
	return resp, err
}

func (c *Client) ScheduledTasks(ctx context.Context) (resp *ScheduledTasksResp, err error) {
	err = c.get(ctx, "scheduledtasks", emptyTmplParams, &resp)
	return
}

func (c *Client) Togglz(ctx context.Context) (*TogglzResp, error) {
	var resp TogglzResp
	if err := c.get(ctx, "togglz", emptyTmplParams, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

func (c *Client) UpdateTogglz(ctx context.Context, enabled bool) (*TogglzResp, error) {
	var resp TogglzResp
	if err := c.post(ctx, "togglz", emptyTmplParams, TogglzReq{
		Enabled: enabled,
	}, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}

// internal methods

func (c *Client) evaluateTmpl(endpoint string, params map[string]interface{}) (*url.URL, error) {
	tmpl, exists := c.abilities[endpoint]
	if !exists {
		return nil, fmt.Errorf("%s not exists", endpoint)
	}

	urlStr, err := tmpl.Expand(params)
	if err != nil {
		return nil, err
	}

	return url.Parse(urlStr)
}

func (c *Client) get(ctx context.Context, endpoint string, params map[string]interface{}, out any) error {
	u, err := c.evaluateTmpl(endpoint, params)
	if err != nil {
		return err
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
	if err != nil {
		return err
	}

	return c.do(req, out)
}

func (c *Client) delete(ctx context.Context, endpoint string, tmplParams map[string]interface{}) error {
	u, err := c.evaluateTmpl(endpoint, tmplParams)
	if err != nil {
		return err
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodDelete, u.String(), nil)
	if err != nil {
		return err
	}

	return c.do(req, nil)
}

func (c *Client) post(ctx context.Context, endpoint string, tmplParams map[string]interface{}, payload interface{}, out any) error {
	u, err := c.evaluateTmpl(endpoint, tmplParams)
	if err != nil {
		return err
	}

	var body io.Reader
	if payload != nil {
		data, err := json.Marshal(payload)
		if err != nil {
			return err
		}

		body = bytes.NewReader(data)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, u.String(), body)
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	return c.do(req, out)
}

func (c *Client) do(req *http.Request, out any) error {
	if c.enhancer != nil {
		c.enhancer(req)
	}
	resp, err := c.Client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return &StatusCodeBadErr{StatusCode: resp.StatusCode, Method: req.Method, URL: req.URL.String()}
	}

	if out != nil {
		switch v := out.(type) {
		case *string:
			body, err := io.ReadAll(resp.Body)
			if err != nil {
				return err
			}
			*v = string(body)
		default:
			return json.NewDecoder(resp.Body).Decode(out)
		}
	}
	return nil
}

func formatURL(urlStr string) string {
	return strings.ReplaceAll(urlStr, "{*path}", "{+path}")
}
