# actuatorx

For Spring Boot Actuator, build by `golang` and `vue`。

Inspired by [ostara](https://github.com/krud-dev/ostara) and [pgweb](https://github.com/sosedoff/pgweb)。

It currently provides base functionality of Spring Boot Actuator, and will support more features in the future.

## Supported Endpoints

- [Health](https://docs.spring.io/spring-boot/api/rest/actuator/health.html)
- [Metrics](https://docs.spring.io/spring-boot/api/rest/actuator/metrics.html)
- [Environment](https://docs.spring.io/spring-boot/api/rest/actuator/env.html)
- [Beans](https://docs.spring.io/spring-boot/api/rest/actuator/beans.html)
- [Conditions](https://docs.spring.io/spring-boot/api/rest/actuator/conditions.html)
- [Configprops](https://docs.spring.io/spring-boot/api/rest/actuator/configprops.html)
- [Caches](https://docs.spring.io/spring-boot/api/rest/actuator/caches.html)
- [Loggers](https://docs.spring.io/spring-boot/api/rest/actuator/loggers.html)
- [Mappings](https://docs.spring.io/spring-boot/api/rest/actuator/mappings.html)
- [Http Exchanges](https://docs.spring.io/spring-boot/api/rest/actuator/httpexchanges.html)
- [Scheduled Tasks](https://docs.spring.io/spring-boot/api/rest/actuator/scheduledtasks.html)
- [Thread Dump](https://docs.spring.io/spring-boot/api/rest/actuator/threaddump.html)

## Feature Examples

**Login**

<img src="doc/images/login.png" alt="Login" width="1200" height="800" />

**Health**

<img src="doc/images/health.png" alt="Health" width="1200" height="800" />

**Beans**

<img src="doc/images/beans.png" alt="Beans" width="1200" height="800" />

<img src="doc/images/beans-dependency-graph.png" alt="Beans dependency graph" width="1200" height="800" />

## Usage

**1. start the actuatorx with default port(4000)**

```bash
./actuatorx
```

or start with custom port

```bash
./actuator --port 9080
```


**2. access the page**

```bash
http://localhost:4000
```

**3. input the actuator url and auth**

## Language and core framework information

| `Tech` | `Version` |
| --- | --- |
| `Golang` | `1.25.7` |
| `Gin` | `1.12.0` |
| `Vue` | `7.3.1` |
| `vuetify` | `3.11.6` |  


## Design

[design](doc/design.md)