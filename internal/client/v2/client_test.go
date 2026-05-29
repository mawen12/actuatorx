package v2_test

import (
	"context"
	"errors"
	"testing"

	"github.com/jtacoma/uritemplates"
	v2 "github.com/mawen12/actuatorx/internal/client/v2"
)

func TestLinks(t *testing.T) {
	baseURL := "http://localhost:48081/actuator"

	client := v2.NewClient(v2.WithBaseURL(baseURL))
	res, err := client.Links(context.TODO())
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	t.Log("res", res)
}

func TestHealth(t *testing.T) {
	baseURL := "http://localhost:48081/actuator"

	client := v2.NewClient(v2.WithBaseURL(baseURL))
	err := client.Init(context.TODO())
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	res, err := client.Health(context.TODO())
	if err != nil {
		var abilityErr *v2.AbilityError
		if errors.As(err, &abilityErr) {
			t.Fatal("ability health not found")
		}
		t.Fatalf("err should be nil: %s", err.Error())
	}

	t.Log("res", res)
}

func TestMetrics(t *testing.T) {
	baseURL := "http://localhost:48081/actuator"

	client := v2.NewClient(v2.WithBaseURL(baseURL))
	err := client.Init(context.TODO())
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	res, err := client.Metrics(context.TODO())
	if err != nil {
		var abilityErr *v2.AbilityError
		if errors.As(err, &abilityErr) {
			t.Fatal("ability health not found")
		}
		t.Fatalf("err should be nil: %s", err.Error())
	}

	t.Log("res", res)
}

func TestMetric(t *testing.T) {
	baseURL := "http://localhost:48081/actuator"

	client := v2.NewClient(v2.WithBaseURL(baseURL))
	err := client.Init(context.TODO())
	if err != nil {
		t.Fatalf("err should be nil: %s", err.Error())
	}

	res, err := client.Metric(context.TODO(), "disk.free")
	if err != nil {
		var abilityErr *v2.AbilityError
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
