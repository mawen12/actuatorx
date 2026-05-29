package v2

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

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

type (
	ActuatorResp struct {
		Links map[string]ActuatorLink `json:"_links"`
	}

	ActuatorLink struct {
		Href     string `json:"href"`
		Template bool   `json:"template"`
	}
)

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

type (
	HealthResp struct {
		Status     string                         `json:"status"`
		Components map[string]HealthComponentResp `json:"components"`
	}

	HealthComponentResp struct {
		Status  string         `json:"status"`
		Details map[string]any `json:"details"`
	}
)

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

type (
	MetricsResp struct {
		Names []string `json:"names"`
	}

	MetricResp struct {
		Name          string               `json:"name"`
		Description   string               `json:"description"`
		BaseUnit      string               `json:"baseUnit"`
		Measurements  []MetricMeasurement  `json:"measurements"`
		AvailableTags []MetricAvailableTag `json:"availableTags"`
	}

	MetricMeasurement struct {
		Statistic string `json:"statistic"`
		Value     any    `json:"value"`
	}

	MetricAvailableTag struct {
		Tag    string   `json:"tag"`
		Values []string `json:"values"`
	}

	MetricLatestResp struct {
		Name string `json:"name"`
		// Description string            `json:"description"`
		// BaseUnit    string            `json:"baseUnit"`
		Value MetricLatestValue `json:"value"`
	}

	MetricLatestValue struct {
		Value     any       `json:"value"`
		Timestamp time.Time `json:"timestamp"`
	}
)

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

type (
	EnvResp struct {
		ActiveProfiles  []string            `json:"activeProfiles"`
		PropertySources []EnvPropertySource `json:"propertySources"`
	}

	EnvPropertySource struct {
		Name       string                 `json:"name"`
		Properties map[string]EnvProperty `json:"properties"`
	}

	EnvProperty struct {
		Value any `json:"value"`
	}

	EnvPropertyResp struct {
		Property struct {
			Source string `json:"source"`
			Value  any    `json:"value"`
		}
		ActiveProfiles  []string            `json:"activeProfiles"`
		DefaultProfiles []string            `json:"defaultProfiles"`
		PropertySources []EnvPropertySource `json:"propertySources"`
	}
)

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

type (
	BeansResp struct {
		Contexts map[string]BeansContext `json:"contexts"`
	}

	BeansContext struct {
		ParentId string          `json:"parentId"`
		Beans    map[string]Bean `json:"beans"`
	}

	Bean struct {
		Aliases      []string `json:"aliases"`
		Scope        string   `json:"scope"`
		Type         string   `json:"type"`
		Resource     string   `json:"resource"`
		Dependencies []string `json:"dependencies"`
	}
)

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

type (
	ConditionsResp struct {
		Contexts map[string]ConditionsContext `json:"contexts"`
	}

	ConditionsContext struct {
		NegativeMatches      map[string]ConditionNegativeMatch `json:"negativeMatches"`
		PositiveMatches      map[string][]ConditionMatch       `json:"positiveMatches"`
		UnconditionalClasses []string                          `json:"unconditionalClasses"`
	}

	ConditionNegativeMatch struct {
		NotMatched []ConditionMatch `json:"notMatched"`
		Matched    []ConditionMatch `json:"matched"`
	}

	ConditionMatch struct {
		Condition string `json:"condition"`
		Message   string `json:"message"`
	}
)

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

type (
	ConfigpropsResp struct {
		Contexts map[string]ConfigpropsContext `json:"contexts"`
	}

	ConfigpropsContext struct {
		ParentId string                     `json:"parentId"`
		Beans    map[string]ConfigpropsBean `json:"beans"`
	}

	ConfigpropsBean struct {
		Prefix     string                 `json:"prefix"`
		Inputs     map[string]interface{} `json:"inputs"`
		Properties map[string]interface{} `json:"properties"`
	}
)

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

type (
	CachesResp struct {
		CacheManagers map[string]CacheManager `json:"cacheManagers"`
	}

	CacheManager struct {
		Caches map[string]CacheResp `json:"caches"`
	}

	CacheResp struct {
		Target string `json:"target"`
	}
)

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

type (
	LoggersResp struct {
		Levels  []string               `json:"levels"`
		Loggers map[string]Logger      `json:"loggers"`
		Groups  map[string]LoggerGroup `json:"groups"`
	}

	Logger struct {
		ConfiguredLevel string `json:"configuredLevel"`
		EffectiveLevel  string `json:"effectiveLevel"`
	}

	LoggerGroup struct {
		ConfiguredLevel string   `json:"configuredLevel"`
		Members         []string `json:"members"`
	}

	LoggerOrGroupResp struct {
		ConfiguredLevel string   `json:"configuredLevel"`
		EffectiveLevel  string   `json:"effectiveLevel"`
		Members         []string `json:"members"`
	}

	LoggerLevelReq struct {
		ConfiguredLevel string `json:"configuredLevel"`
	}
)

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

type (
	HttpExchangesResp struct {
		Exchanges []HttpExchange `json:"exchanges"`
	}

	HttpExchange struct {
		Timestamp time.Time    `json:"timestamp"`
		Request   HttpRequest  `json:"request"`
		Response  HttpResponse `json:"response"`
		TimeTaken string       `json:"timeTaken"`
	}

	HttpRequest struct {
		URI     string              `json:"uri"`
		Method  string              `json:"method"`
		Headers map[string][]string `json:"headers"`
	}

	HttpResponse struct {
		Status  int                 `json:"status"`
		Headers map[string][]string `json:"headers"`
	}
)

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
