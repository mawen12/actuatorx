# Caches

- Show caches in a table.
- Search by cache name and manager.
- Evict a single cache or all caches.

![Caches](images/caches.png)

## Frontend page

- `CachesPage.vue`

## Frontend API

- `getCaches.js`
- `evictAllCache.js`
- `evictCache.js`

## Backend API

- `api.go#GetCaches`
- `api.go#EvictAllCaches`
- `api.go#EvictCache`

## Backend client

- `client.go#Caches`
- `client.go#EvictAllCaches`
- `client.go#EvictCache`

## Spring Boot Endpoint 

- `/actuator/caches`
- `/actuator/caches/{cache}`

## Spring Boot docs 

https://docs.spring.io/spring-boot/api/rest/actuator/caches.html

