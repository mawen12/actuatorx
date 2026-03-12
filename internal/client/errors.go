package client

import (
	"errors"
	"fmt"
	"regexp"
)

var (
	emptyTmplParams map[string]interface{}
)

var (
	regexErrConnectionRefused = regexp.MustCompile(`connection refused`)
	regexErrNotFound          = regexp.MustCompile("404")
)

var (
	ErrConnectionRefused = errors.New("connection refused")
	ErrNotFound          = errors.New("404 not found")
)

type EndpointInvalidErr struct {
	Endpoint string
}

func (e EndpointInvalidErr) Error() string {
	return fmt.Sprintf("invalid endpoint url(%s), because non actuator-link found", e.Endpoint)
}

type LinkInvalidErr struct {
	Link string
	err  error
}

func (e LinkInvalidErr) Error() string {
	return fmt.Sprintf("invalid link(%s): %w", e.err)
}

type RequestErr struct {
	Method, URL string
	ErrMsg      string
}

func (e RequestErr) Error() string {
	return fmt.Sprintf("%s %s, Request Throw Exception: %s", e.Method, e.URL, e.ErrMsg)
}

type StatusCodeBadErr struct {
	StatusCode  int
	Method, URL string
}

func (e StatusCodeBadErr) Error() string {
	return fmt.Sprintf("%s %s, StatusCode Bad: %d", e.Method, e.URL, e.StatusCode)
}
