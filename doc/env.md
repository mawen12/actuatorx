# Env

- Show env as table group by env file
- Support search by property name
- Support copy the property name and value

![Env](images/env.png)

## Spring Boot doc 

https://docs.spring.io/spring-boot/api/rest/actuator/env.html

## Spring Boot Endpoint 

- `/actutor/env`
- `/actutor/env/{toMatch}`

## Backend client

- `client.go#Env`

## Backend api

`api.go#GetEnv`

## Frontend api

`getEnv.js`

## Frontend page

`EnvPage.vue`

