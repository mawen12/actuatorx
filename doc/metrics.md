# Metrics

- Show metrics in a table.
- Search by metric name.
- View metric details, including tags and measurements.
- Filter metrics by tag.

![Metrics](images/metric.png)

## Frontend page

- `Metrics.vue`

## Frontend API

- `getMetrics.js`
- `getMetricDetails.js`
- `getLatestMetric.js`

## Backend API

- `api.go#GetMetrics`
- `api.go#GetMetric`

## Backend client

- `client.go#Metrics`
- `client.go#Metric`

## Spring Boot Endpoint 

- `/actuator/metrics`
- `/actuator/metrics/{requiredMetricName}`

## Spring Boot docs

https://docs.spring.io/spring-boot/api/rest/actuator/metrics.html

