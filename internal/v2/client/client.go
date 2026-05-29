package client

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/jtacoma/uritemplates"
)

type AbilityError struct {
	Ability string
}

func (a *AbilityError) Error() string {
	return fmt.Sprintf("Ability: %s not found", a.Ability)
}

type Client struct {
	Options []RequestOption

	abilities map[string]*UriTemplate
}

var emptyTmplParams map[string]interface{}

type UriTemplate struct {
	*uritemplates.UriTemplate
	Source       string
	ActuatorLink ActuatorLink
}

func (u *UriTemplate) Expand() (string, error) {
	return u.UriTemplate.Expand(emptyTmplParams)
}

func (u *UriTemplate) ExpandWithParam(param map[string]interface{}) (string, error) {
	return u.UriTemplate.Expand(param)
}

func NewClient(opts ...RequestOption) (r Client) {
	opts = append(DefaultClientOptions(), opts...)

	r = Client{Options: opts}
	return
}

func (c *Client) Init(ctx context.Context) error {
	res, err := c.Links(ctx)
	if err != nil {
		return err
	}

	c.abilities = make(map[string]*UriTemplate)
	for ability, link := range res.Links {
		raw := strings.ReplaceAll(link.Href, "{*path}", "{+path}")
		template, err := uritemplates.Parse(raw)
		if err != nil {
			return fmt.Errorf("parse %s failed: %v", link.Href, err)
		}
		c.abilities[ability] = &UriTemplate{Source: ability, ActuatorLink: link, UriTemplate: template}
	}

	return nil
}

func (c *Client) Links(ctx context.Context) (*ActuatorResp, error) {
	var res ActuatorResp
	err := ExecuteNewRequest(ctx, http.MethodGet, "", nil, &res, c.Options...)
	return &res, err
}

func (c *Client) AbilityCheck(ability string) (*UriTemplate, error) {
	template, exists := c.abilities[ability]
	if !exists {
		return nil, &AbilityError{Ability: ability}
	}
	return template, nil
}

func (c *Client) Health(ctx context.Context, opts ...RequestOption) (*HealthResp, error) {
	link, err := c.AbilityCheck("health")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res HealthResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Metrics(ctx context.Context, opts ...RequestOption) (*MetricsResp, error) {
	link, err := c.AbilityCheck("metrics")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res MetricsResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

// tags should be provide in opts
func (c *Client) Metric(ctx context.Context, metricName string, opts ...RequestOption) (*MetricResp, error) {
	link, err := c.AbilityCheck("metrics-requiredMetricName")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.ExpandWithParam(map[string]interface{}{
		"requiredMetricName": metricName,
	})
	if err != nil {
		return nil, err
	}

	var res MetricResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Env(ctx context.Context, opts ...RequestOption) (*EnvResp, error) {
	link, err := c.AbilityCheck("env")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res EnvResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Beans(ctx context.Context, opts ...RequestOption) (*BeansResp, error) {
	link, err := c.AbilityCheck("env")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res BeansResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Conditions(ctx context.Context, opts ...RequestOption) (*ConditionsResp, error) {
	link, err := c.AbilityCheck("conditions")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res ConditionsResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Configprops(ctx context.Context, opts ...RequestOption) (*ConditionsResp, error) {
	link, err := c.AbilityCheck("configprops")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res ConditionsResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Caches(ctx context.Context, opts ...RequestOption) (*CachesResp, error) {
	link, err := c.AbilityCheck("caches")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res CachesResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) EvictAllCaches(ctx context.Context, opts ...RequestOption) error {
	link, err := c.AbilityCheck("caches")
	if err != nil {
		return err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return err
	}

	return ExecuteNewRequest(ctx, http.MethodDelete, urlStr, nil, nil, append(c.Options, opts...)...)
}

// cacheManager 通过 opt 传递
func (c *Client) EvictCache(ctx context.Context, cache string, opts ...RequestOption) error {
	link, err := c.AbilityCheck("caches-cache")
	if err != nil {
		return err
	}

	urlStr, err := link.ExpandWithParam(map[string]interface{}{
		"cache": cache,
	})
	if err != nil {
		return err
	}

	return ExecuteNewRequest(ctx, http.MethodDelete, urlStr, nil, nil, append(c.Options, opts...)...)
}

func (c *Client) Loggers(ctx context.Context, opts ...RequestOption) (*LoggersResp, error) {
	link, err := c.AbilityCheck("loggers")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res LoggersResp
	err = ExecuteNewRequest(ctx, http.MethodDelete, urlStr, nil, nil, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) SetLoggerLevel(ctx context.Context, name string, opts ...RequestOption) error {
	link, err := c.AbilityCheck("loggers-name")
	if err != nil {
		return err
	}

	urlStr, err := link.ExpandWithParam(map[string]interface{}{
		"name": name,
	})
	if err != nil {
		return err
	}

	return ExecuteNewRequest(ctx, http.MethodPost, urlStr, nil, nil, append(c.Options, opts...)...)
}

func (c *Client) Mappings(ctx context.Context, opts ...RequestOption) error {
	link, err := c.AbilityCheck("mappings")
	if err != nil {
		return err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return err
	}

	return ExecuteNewRequest(ctx, http.MethodPost, urlStr, nil, nil, append(c.Options, opts...)...)
}

func (c *Client) HttpExchanges(ctx context.Context, opts ...RequestOption) (*HttpExchangesResp, error) {
	link, err := c.AbilityCheck("mappings")
	if err != nil {
		return nil, err
	}

	urlStr, err := link.Expand()
	if err != nil {
		return nil, err
	}

	var res HttpExchangesResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}
