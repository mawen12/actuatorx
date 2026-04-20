# Loggers

- Show loggers in a table.
- Search by logger name.
- Set or reset the logger level.

![Loggers](images/loggers.png)

## Frontend page

- `LoggersPage.vue`

## Frontend API

- `getLoggers.js`
- `setLoggerLevel.js`

## Backend API

- `api.go#GetLoggers`
- `api.go#SetLoggerLevel`

## Backend client

- `client.go#GetLoggers`
- `client.go#SetLoggerLevel`

## Spring Boot Endpoint 

- `/actuator/loggers`
- `/actuator/loggers/{name}`

## Spring Boot docs 

https://docs.spring.io/spring-boot/api/rest/actuator/loggers.html

