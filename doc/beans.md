# Beans

- Show bean data in a table grouped by application context.
- Search by bean name.
- Click a dependency to jump to the corresponding bean.
- View the bean dependency graph.

![Beans](images/beans.png)

![Bean dependency graph](images/beans-dependency-graph.png)

## Frontend page

- `BeansPage.vue`

## Frontend API

- `getbeans.js`

## Backend API

- `api.go#Getbeans`

## Backend client

- `client.go#beans`

## Spring Boot Endpoint 

- `/actuator/beans`

## Spring Boot docs

https://docs.spring.io/spring-boot/api/rest/actuator/beans.html


