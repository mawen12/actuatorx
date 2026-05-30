package client

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/tidwall/sjson"
)

func WithBaseURL(base string) RequestOption {
	u, err := url.Parse(base)
	if err == nil && u.Path != "" && !strings.HasSuffix(u.Path, "/") {
		u.Path += "/"
	}

	return RequestOptionFunc(func(r *RequestConfig) error {
		if err != nil {
			return fmt.Errorf("request option: WithBaseURL failed to parse url %s", err)
		}

		r.BaseURL = u
		return nil
	})
}

func WithMiddleware(middlewares ...middleware) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.Middlewares = append(r.Middlewares, middlewares...)
		return nil
	})
}

type HTTPClient interface {
	Do(*http.Request) (*http.Response, error)
}

func WithHTTPClient(client HTTPClient) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		if client == nil {
			return errors.New("option: custom http client cannot be nil")
		}

		if c, ok := client.(*http.Client); ok {
			r.HTTPClient = c
		}
		return nil
	})
}

func WithMaxRetries(retries int) RequestOption {
	if retries < 0 {
		panic("option: cannot have fewer than 0 retries")
	}

	return RequestOptionFunc(func(r *RequestConfig) error {
		r.MaxRetries = retries
		return nil
	})
}

func WithHeader(key, value string) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.SetHeader(key, value)
		return nil
	})
}

func WithBasicAuthHeader(username, password string) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.SetBasicAuthHeader(username, password)
		return nil
	})
}

func WithHeaderAdd(key, value string) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.AddHeader(key, value)
		return nil
	})
}

func WithHeaderDel(key string) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.DelHeader(key)
		return nil
	})
}

func WithQuery(key, value string) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.SetQuery(key, value)
		return nil
	})
}

func WithQueryAdd(key, value string) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.AddQuery(key, value)
		return nil
	})
}

func WithQueryDel(key string) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.DelQuery(key)
		return nil
	})
}

func WithJSONSet(key string, value any) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) (err error) {
		var b []byte

		if r.Body == nil {
			b, err = sjson.SetBytes(nil, key, value)
			if err != nil {
				return err
			}
		} else if buffer, ok := r.Body.(*bytes.Buffer); ok {
			b = buffer.Bytes()
			b, err = sjson.SetBytes(b, key, value)
			if err != nil {
				return err
			}
		} else {
			return errors.New("cannot use WithJSONSet on a body that is not serialized as *bytesBuffer")
		}

		r.SetBody(bytes.NewBuffer(b))

		return nil
	})
}

func WithJSONDel(key string) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) (err error) {
		if buffer, ok := r.Body.(*bytes.Buffer); ok {
			b := buffer.Bytes()
			b, err = sjson.DeleteBytes(b, key)
			if err != nil {
				return err
			}
			r.SetBody(bytes.NewBuffer(b))
			return nil
		}

		return errors.New("cannot use WithJSONDel on a body that is not serialized as *bytesBuffer")
	})
}

func WithResponseBodyInto(dst any) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.SetResponseBodyInto(dst)
		return nil
	})
}

func WithResponseBody(dst **http.Response) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.SetResponseInto(dst)
		return nil
	})
}

func WithRequestBody(contentType string, body any) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		if reader, ok := body.(io.Reader); ok {
			r.SetBody(reader)
			return r.Apply(WithHeader("Content-Type", contentType))
		}

		if b, ok := body.([]byte); ok {
			r.SetBody(bytes.NewBuffer(b))
			return r.Apply(WithHeader("Content-Type", contentType))
		}

		return errors.New("body must be a byte slice or implement io.Reader")
	})
}

func WithRequestTimeout(dur time.Duration) RequestOption {
	return RequestOptionFunc(func(r *RequestConfig) error {
		r.RequestTimeout = dur
		return nil
	})
}
