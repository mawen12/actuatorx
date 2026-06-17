package client

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/jtacoma/uritemplates"
	"github.com/mawen12/actuatorx/internal/model"
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
	ActuatorLink model.ActuatorLink
}

func (u *UriTemplate) Expand() (string, error) {
	return u.UriTemplate.Expand(emptyTmplParams)
}

func (u *UriTemplate) ExpandWithParam(param map[string]interface{}) (string, error) {
	return u.UriTemplate.Expand(param)
}

func NewClient(opts ...RequestOption) *Client {
	opts = append(DefaultClientOptions(), opts...)

	return &Client{Options: opts}
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

func (c *Client) Links(ctx context.Context) (*model.ActuatorResp, error) {
	var res model.ActuatorResp
	err := ExecuteNewRequest(ctx, http.MethodGet, "", nil, &res, c.Options...)
	return &res, err
}

func (c *Client) Abilities(ctx context.Context) []string {
	result := make([]string, 0)
	for key := range c.abilities {
		result = append(result, key)
	}
	return result
}

func (c *Client) abilityCheck(ability string) (*UriTemplate, error) {
	template, exists := c.abilities[ability]
	if !exists {
		return nil, &AbilityError{Ability: ability}
	}
	return template, nil
}

func (c *Client) getAbility(ability string) (string, error) {
	link, err := c.abilityCheck(ability)
	if err != nil {
		return "", err
	}

	return link.Expand()
}

func (c *Client) getAbilityWithParam(ability string, param map[string]interface{}) (string, error) {
	link, err := c.abilityCheck(ability)
	if err != nil {
		return "", err
	}

	return link.ExpandWithParam(param)
}

func (c *Client) Health(ctx context.Context, opts ...RequestOption) (*model.HealthResp, error) {
	urlStr, err := c.getAbility("health")
	if err != nil {
		return nil, err
	}

	var res model.HealthResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Metrics(ctx context.Context, opts ...RequestOption) (*model.MetricsResp, error) {
	urlStr, err := c.getAbility("metrics")
	if err != nil {
		return nil, err
	}

	var res model.MetricsResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

// tags should be provide in opts
func (c *Client) Metric(ctx context.Context, metricName string, opts ...RequestOption) (*model.MetricResp, error) {
	urlStr, err := c.getAbilityWithParam("metrics-requiredMetricName", map[string]interface{}{
		"requiredMetricName": metricName,
	})
	if err != nil {
		return nil, err
	}

	var res model.MetricResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Env(ctx context.Context, opts ...RequestOption) (*model.EnvResp, error) {
	urlStr, err := c.getAbility("env")
	if err != nil {
		return nil, err
	}

	var res model.EnvResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Beans(ctx context.Context, opts ...RequestOption) (*model.BeansResp, error) {
	urlStr, err := c.getAbility("beans")
	if err != nil {
		return nil, err
	}

	var res model.BeansResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Conditions(ctx context.Context, opts ...RequestOption) (*model.ConditionsResp, error) {
	urlStr, err := c.getAbility("conditions")
	if err != nil {
		return nil, err
	}

	var res model.ConditionsResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Configprops(ctx context.Context, opts ...RequestOption) (*model.ConfigpropsResp, error) {
	urlStr, err := c.getAbility("configprops")
	if err != nil {
		return nil, err
	}

	var res model.ConfigpropsResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Caches(ctx context.Context, opts ...RequestOption) (*model.CachesResp, error) {
	urlStr, err := c.getAbility("caches")
	if err != nil {
		return nil, err
	}

	var res model.CachesResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) EvictAllCaches(ctx context.Context, opts ...RequestOption) error {
	urlStr, err := c.getAbility("caches")
	if err != nil {
		return err
	}

	return ExecuteNewRequest(ctx, http.MethodDelete, urlStr, nil, nil, append(c.Options, opts...)...)
}

// cacheManager 通过 opt 传递
func (c *Client) EvictCache(ctx context.Context, cache string, opts ...RequestOption) error {
	urlStr, err := c.getAbilityWithParam("caches-cache", map[string]interface{}{
		"cache": cache,
	})
	if err != nil {
		return err
	}

	return ExecuteNewRequest(ctx, http.MethodDelete, urlStr, nil, nil, append(c.Options, opts...)...)
}

func (c *Client) Loggers(ctx context.Context, opts ...RequestOption) (*model.LoggersResp, error) {
	urlStr, err := c.getAbility("loggers")
	if err != nil {
		return nil, err
	}

	var res model.LoggersResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) SetLoggerLevel(ctx context.Context, name string, opts ...RequestOption) error {
	urlStr, err := c.getAbilityWithParam("loggers-name", map[string]interface{}{
		"name": name,
	})
	if err != nil {
		return err
	}

	return ExecuteNewRequest(ctx, http.MethodPost, urlStr, nil, nil, append(c.Options, opts...)...)
}

func (c *Client) Mappings(ctx context.Context, opts ...RequestOption) (*model.MappingsResp, error) {
	urlStr, err := c.getAbility("mappings")
	if err != nil {
		return nil, err
	}

	var res model.MappingsResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) HttpExchanges(ctx context.Context, opts ...RequestOption) (*model.HttpExchangesResp, error) {
	urlStr, err := c.getAbility("httpexchanges")
	if err != nil {
		return nil, err
	}

	var res model.HttpExchangesResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) ScheduledTasks(ctx context.Context, opts ...RequestOption) (*model.ScheduledTasksResp, error) {
	urlStr, err := c.getAbility("scheduledtasks")
	if err != nil {
		return nil, err
	}

	var res model.ScheduledTasksResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) Togglz(ctx context.Context, opts ...RequestOption) (*model.TogglzResp, error) {
	urlStr, err := c.getAbility("togglz")
	if err != nil {
		return nil, err
	}

	var res model.TogglzResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) UpdateTogglz(ctx context.Context, name string, opts ...RequestOption) error {
	urlStr, err := c.getAbilityWithParam("togglz-name", map[string]interface{}{
		"name": name,
	})
	if err != nil {
		return err
	}

	return ExecuteNewRequest(ctx, http.MethodPost, urlStr, nil, nil, append(c.Options, opts...)...)
}

func (c *Client) ThreadDump(ctx context.Context, opts ...RequestOption) (*model.ThreadResp, error) {
	urlStr, err := c.getAbility("threaddump")
	if err != nil {
		return nil, err
	}

	var res model.ThreadResp
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return &res, err
}

func (c *Client) DownloadThreadDump(ctx context.Context, opts ...RequestOption) ([]byte, error) {
	urlStr, err := c.getAbility("threaddump")
	if err != nil {
		return nil, err
	}

	var res []byte
	err = ExecuteNewRequest(ctx, http.MethodGet, urlStr, nil, &res, append(c.Options, opts...)...)
	return res, err
}
