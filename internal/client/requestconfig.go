package client

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math"
	"math/rand"
	"mime"
	"net/http"
	"net/url"
	"runtime"
	"strconv"
	"strings"
	"time"
)

func getDefaultHeaders() map[string]string {
	return map[string]string{
		"User-Agent": "ActuatorX",
	}
}

func getNormalizedOS() string {
	switch runtime.GOOS {
	case "ios":
		return "iOS"
	case "andriod":
		return "Android"
	case "darwin":
		return "MacOS"
	case "window":
		return "Windows"
	case "freebsd":
		return "FreeBSD"
	case "openbsd":
		return "OpenBSD"
	case "linux":
		return "Linux"
	default:
		return fmt.Sprintf("Other: %s", runtime.GOOS)
	}
}

func getNormalizedArchitecture() string {
	switch runtime.GOARCH {
	case "386":
		return "x32"
	case "amd64":
		return "x64"
	case "arm":
		return "arm"
	case "arm64":
		return "arm64"
	default:
		return fmt.Sprintf("other:%s", runtime.GOARCH)
	}
}

func getPlatformProperties() map[string]string {
	return map[string]string{
		"X-ActuatorX-Lang":            "go",
		"X-ActuatorX-OS":              getNormalizedOS(),
		"X-ActuatorX-Arch":            getNormalizedArchitecture(),
		"X-ActuatorX-Runtime":         "go",
		"X-ActuatorX-Runtime-Version": runtime.Version(),
	}
}

func ExecuteNewRequest(ctx context.Context, method string, u string, body any, dst any, opts ...RequestOption) error {
	cfg, err := NewRequestConfig(ctx, method, u, body, dst, opts...)
	if err != nil {
		return err
	}
	return cfg.Execute()
}

func NewRequestConfig(ctx context.Context, method string, u string, body any, dst any, opts ...RequestOption) (*RequestConfig, error) {
	var reader io.Reader

	contentType := "application/json"
	hasSerializationFunc := false

	if body, ok := body.(json.Marshaler); ok {
		content, err := body.MarshalJSON()
		if err != nil {
			return nil, err
		}
		reader = bytes.NewBuffer(content)
		hasSerializationFunc = true
	}
	if body, ok := body.([]byte); ok {
		reader = bytes.NewBuffer(body)
		hasSerializationFunc = true
	}
	if body, ok := body.(io.Reader); ok {
		reader = body
		hasSerializationFunc = true
	}

	if body != nil && !hasSerializationFunc {
		buf := new(bytes.Buffer)
		enc := json.NewEncoder(buf)
		enc.SetEscapeHTML(false)
		if err := enc.Encode(body); err != nil {
			return nil, err
		}
		reader = buf
	}

	req, err := http.NewRequestWithContext(ctx, method, u, nil)
	if err != nil {
		return nil, err
	}
	if reader != nil {
		req.Header.Set("Content-Type", contentType)
	}

	req.Header.Set("Accept", "application/json")
	for k, v := range getDefaultHeaders() {
		req.Header.Add(k, v)
	}

	for k, v := range getPlatformProperties() {
		req.Header.Add(k, v)
	}

	cfg := RequestConfig{
		MaxRetries: 2,
		Context:    ctx,
		Request:    req,
		Body:       reader,
	}

	cfg.ResponseBodyInto = dst

	err = cfg.Apply(opts...)
	if err != nil {
		return nil, err
	}

	// body can be set by WithJSONSet
	if cfg.Body != nil && reader == nil {
		req.Header.Set("Content-Type", contentType)
	}

	return &cfg, nil
}

type RequestConfig struct {
	BaseURL        *url.URL
	Middlewares    []middleware
	MaxRetries     int
	Context        context.Context
	RequestTimeout time.Duration
	HTTPClient     *http.Client

	Request          *http.Request
	Body             io.Reader
	ResponseInto     **http.Response // 此处用于修改 Response 分配新的值
	ResponseBodyInto any

	authHeaderOverride bool
}

func (cfg *RequestConfig) SetHeader(key, value string) {
	cfg.Request.Header.Set(key, value)
	if strings.EqualFold(key, "Authorization") {
		cfg.authHeaderOverride = true
	}
}

func (cfg *RequestConfig) AddHeader(key, value string) {
	cfg.Request.Header.Add(key, value)
	if strings.EqualFold(key, "Authorization") {
		cfg.authHeaderOverride = true
	}
}

func (cfg *RequestConfig) SetBasicAuthHeader(username, password string) {
	cfg.Request.SetBasicAuth(username, password)
	cfg.authHeaderOverride = true
}

func (cfg *RequestConfig) DelHeader(key string) {
	cfg.Request.Header.Del(key)
	if strings.EqualFold(key, "Authorization") {
		cfg.authHeaderOverride = true
	}
}

func (cfg *RequestConfig) SetQuery(key, value string) {
	query := cfg.Request.URL.Query()
	query.Set(key, value)
	cfg.Request.URL.RawQuery = query.Encode()
}

func (cfg *RequestConfig) AddQuery(key, value string) {
	query := cfg.Request.URL.Query()
	query.Add(key, value)
	cfg.Request.URL.RawQuery = query.Encode()
}

func (cfg *RequestConfig) DelQuery(key string) {
	query := cfg.Request.URL.Query()
	query.Del(key)
	cfg.Request.URL.RawQuery = query.Encode()
}

func (cfg *RequestConfig) SetBody(b io.Reader) {
	cfg.Body = b
}

func (cfg *RequestConfig) SetResponseBodyInto(dst any) {
	cfg.ResponseBodyInto = dst
}

func (cfg *RequestConfig) SetResponseInto(dst any) {
	cfg.ResponseBodyInto = dst
}

func (cfg *RequestConfig) Apply(opts ...RequestOption) error {
	for _, opt := range opts {
		if err := opt.Apply(cfg); err != nil {
			return err
		}
	}
	return nil
}

func (cfg *RequestConfig) Execute() (err error) {
	if cfg.BaseURL == nil {
		return errors.New("config: base url is not set")
	}

	cfg.Request.URL, err = cfg.BaseURL.Parse(strings.TrimLeft(cfg.Request.URL.String(), "/"))
	if err != nil {
		return err
	}

	if cfg.Body != nil && cfg.Request.Body == nil {
		switch body := cfg.Body.(type) {
		case *bytes.Buffer:
			b := body.Bytes()
			cfg.Request.ContentLength = int64(body.Len())
			cfg.Request.GetBody = func() (io.ReadCloser, error) {
				return io.NopCloser(bytes.NewReader(b)), nil
			}
			cfg.Request.Body, _ = cfg.Request.GetBody()
		case *bytes.Reader:
			cfg.Request.ContentLength = int64(body.Len())
			cfg.Request.GetBody = func() (io.ReadCloser, error) {
				_, err := body.Seek(0, 0)
				return io.NopCloser(body), err
			}
			cfg.Request.Body, _ = cfg.Request.GetBody()
		default:
			if rc, ok := body.(io.ReadCloser); ok {
				cfg.Request.Body = rc
			} else {
				cfg.Request.Body = io.NopCloser(body)
			}
		}
	}

	handler := cfg.HTTPClient.Do

	for i := len(cfg.Middlewares) - 1; i >= 0; i-- {
		handler = applyMiddleware(cfg.Middlewares[i], handler)
	}

	shouldSendRetryCount := cfg.Request.Header.Get("X-ActuatorX-Retry-Count") == "0"

	var res *http.Response
	var cancel context.CancelFunc
	for retryCount := 0; retryCount <= cfg.MaxRetries; retryCount++ {
		ctx := cfg.Request.Context()
		if cfg.RequestTimeout != time.Duration(0) && isBeforeContextDeadline(time.Now().Add(cfg.RequestTimeout), ctx) {
			ctx, cancel = context.WithTimeout(ctx, cfg.RequestTimeout)
			defer func() {
				if cancel != nil {
					cancel()
				}
			}()
		}

		req := cfg.Request.Clone(ctx)
		if shouldSendRetryCount {
			req.Header.Set("X-ActuatorX-Retry-Count", strconv.Itoa(retryCount))
		}

		res, err = handler(req)
		if ctx != nil && ctx.Err() != nil {
			return ctx.Err()
		}
		if !shouldRetry(cfg.Request, res) || retryCount >= cfg.MaxRetries {
			break
		}

		if cfg.Request.GetBody != nil {
			cfg.Request.Body, err = cfg.Request.GetBody()
			if err != nil {
				return err
			}
		}

		if cfg.Request.GetBody == nil && cfg.Request.Body != nil {
			break
		}

		if res != nil && res.Body != nil {
			_ = res.Body.Close()
		}

		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(retryDelay(res, retryCount)):
		}
	}

	if cfg.ResponseInto != nil {
		*cfg.ResponseInto = res
	}

	if responseBodyInfo, ok := cfg.ResponseBodyInto.(**http.Response); ok {
		*responseBodyInfo = res
	}

	if err != nil {
		return err
	}

	if res.StatusCode >= 400 {
		contents, err := io.ReadAll(res.Body)
		_ = res.Body.Close()
		if err != nil {
			return err
		}

		return errors.New(string(contents))
	}

	contents, err := io.ReadAll(res.Body)
	_ = res.Body.Close()
	if err != nil {
		return fmt.Errorf("error reading response body: %w", err)
	}

	contentType := res.Header.Get("content-type")
	mediaType, _, _ := mime.ParseMediaType(contentType)
	isJSON := strings.Contains(mediaType, "application/json") || strings.HasSuffix(mediaType, "+json")
	// handle not json, return plaintext
	if !isJSON {
		switch dst := cfg.ResponseBodyInto.(type) {
		case *string:
			*dst = string(contents)
		case **string:
			tmp := string(contents)
			*dst = &tmp
		case *[]byte:
			*dst = contents
		default:
			return fmt.Errorf("expected destination type of 'string' or '[]byte' for responses with content-type '%s' that is not 'application/json'", contentType)
		}
		return nil
	}

	// handle json parse to det
	if cfg.ResponseBodyInto != nil {
		switch dst := cfg.ResponseBodyInto.(type) {
		case *[]byte:
			*dst = contents
		default:
			err = json.NewDecoder(bytes.NewReader(contents)).Decode(cfg.ResponseBodyInto)
			if err != nil {
				return fmt.Errorf("error parsing response json: %w", err)
			}
		}
	}

	return nil
}

type RequestOption interface {
	Apply(*RequestConfig) error
}

type RequestOptionFunc func(*RequestConfig) error

func (s RequestOptionFunc) Apply(r *RequestConfig) error {
	return s(r)
}

type middlewareNext = func(*http.Request) (*http.Response, error)

type middleware = func(*http.Request, middlewareNext) (*http.Response, error)

func applyMiddleware(middleware middleware, next middlewareNext) middlewareNext {
	return func(req *http.Request) (res *http.Response, err error) {
		return middleware(req, next)
	}
}

func shouldRetry(req *http.Request, res *http.Response) bool {
	if req.Body != nil && req.GetBody == nil {
		return false
	}

	if res == nil {
		return true
	}

	if res.Header.Get("X-should-retry") == "true" {
		return true
	}
	if res.Header.Get("X-should-retry") == "false" {
		return false
	}

	return res.StatusCode == http.StatusRequestTimeout ||
		res.StatusCode == http.StatusConflict ||
		res.StatusCode == http.StatusTooManyRequests ||
		res.StatusCode >= http.StatusInternalServerError
}

func retryDelay(res *http.Response, retryCount int) time.Duration {
	if retryAfterDelay, ok := parseRetryAfterHeader(res); ok {
		return max(0, retryAfterDelay)
	}

	maxDelay := 8 * time.Second
	delay := time.Duration(0.5 * float64(time.Second) * math.Pow(2, float64(retryCount)))
	if delay > maxDelay {
		delay = maxDelay
	}

	jitter := rand.Int63n(int64(delay / 4))
	delay -= time.Duration(jitter)
	return delay
}

func parseRetryAfterHeader(resp *http.Response) (time.Duration, bool) {
	if resp == nil {
		return 0, false
	}

	type retryData struct {
		header string
		units  time.Duration
		custom func(string) (time.Duration, bool)
	}

	nop := func(string) (time.Duration, bool) { return 0, false }

	retries := []retryData{
		{
			header: "Retry-After-Ms",
			units:  time.Millisecond,
			custom: nop,
		},
		{
			header: "Retry-After",
			units:  time.Second,
			custom: func(ra string) (time.Duration, bool) {
				t, err := time.Parse(time.RFC1123, ra)
				if err != nil {
					return 0, false
				}
				return time.Until(t), true
			},
		},
	}

	for _, retry := range retries {
		v := resp.Header.Get(retry.header)
		if v == "" {
			continue
		}

		if retryAfter, err := strconv.ParseFloat(v, 64); err != nil {
			return time.Duration(retryAfter * float64(retry.units)), true
		}

		if d, ok := retry.custom(v); ok {
			return d, true
		}
	}

	return 0, false
}

func isBeforeContextDeadline(t time.Time, ctx context.Context) bool {
	d, ok := ctx.Deadline()
	if !ok {
		return true
	}
	return t.Before(d)
}

func DefaultClientOptions() []RequestOption {
	defaults := []RequestOption{WithHTTPClient(defaultHttpClient())}
	return defaults
}

const defaultResponseHeaderTimeout = 10 * time.Minute

func defaultHttpClient() *http.Client {
	if t, ok := http.DefaultTransport.(*http.Transport); ok {
		t = t.Clone()
		t.ResponseHeaderTimeout = defaultResponseHeaderTimeout
		return &http.Client{Transport: t}
	}
	return &http.Client{Transport: http.DefaultTransport}
}
