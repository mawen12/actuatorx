# Configprops

- Show configuration properties in a table grouped by application context.
- Search by property prefix and name.
- View property details.

![Configprops](images/configprops.png)

## Frontend page

- `ConfigpropsPage.vue`

## Frontend API

- `getConfigprops.js`

## Backend API

- `api.go#GetConfigprops`


## Backend client

- `client.go#Configprops`

## Spring Boot Endpoint 

- `/actuator/configprops`
- `/actuator/configprops/{prefix}`

## Spring Boot docs 

https://docs.spring.io/spring-boot/api/rest/actuator/configprops.html


