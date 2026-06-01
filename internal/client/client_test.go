package client_test

import (
	"context"
	"errors"
	"testing"

	"github.com/jtacoma/uritemplates"
	"github.com/mawen12/actuatorx/internal/client"
)

func TestLinks(t *testing.T) {
	baseURL := "http://localhost:48081/actuator"

	client := client.NewClient(client.WithBaseURL(baseURL))
	res, err := client.Links(context.TODO())
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	t.Log("res", res)
}

func TestHealth(t *testing.T) {
	baseURL := "http://localhost:48081/actuator"

	cli := client.NewClient(client.WithBaseURL(baseURL))
	err := cli.Init(context.TODO())
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	res, err := cli.Health(context.TODO())
	if err != nil {
		var abilityErr *client.AbilityError
		if errors.As(err, &abilityErr) {
			t.Fatal("ability health not found")
		}
		t.Fatalf("err should be nil: %s", err.Error())
	}

	t.Log("res", res)
}

func TestMetrics(t *testing.T) {
	baseURL := "http://localhost:48081/actuator"

	cli := client.NewClient(client.WithBaseURL(baseURL))
	err := cli.Init(context.TODO())
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	res, err := cli.Metrics(context.TODO())
	if err != nil {
		var abilityErr *client.AbilityError
		if errors.As(err, &abilityErr) {
			t.Fatal("ability health not found")
		}
		t.Fatalf("err should be nil: %s", err.Error())
	}

	t.Log("res", res)
}

func TestMetric(t *testing.T) {
	baseURL := "http://localhost:48081/actuator"

	cli := client.NewClient(client.WithBaseURL(baseURL))
	err := cli.Init(context.TODO())
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	res, err := cli.Metric(context.TODO(), "disk.free")
	if err != nil {
		var abilityErr *client.AbilityError
		if errors.As(err, &abilityErr) {
			t.Fatal("ability health not found")
		}
		t.Fatalf("err should be nil: %s", err.Error())
	}

	t.Log("res", res)
}

func TestUrlTemplate(t *testing.T) {
	baseURL := "http://localhost:48081/actuator/metrics/{requiredMetricName}"

	template, err := uritemplates.Parse(baseURL)
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	urlStr, err := template.Expand(map[string]interface{}{
		"requiredMetricName": "disk.free",
	})
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}
	t.Log(urlStr)
}
