<script setup>
import LoadingPage from '@/components/page/LoadingPage.vue'
import ThePage from '@/components/page/ThePage.vue'
import { useGetLogfile } from '@/apis/requests/endpoints/logfile/getLogFile'
import { computed, ref, watch } from 'vue'
import { isNil } from 'lodash-es'
import { useIntervalFn } from '@vueuse/core'
import LogCode from './components/LogCode.vue'

const log = ref(undefined)
const requestFlag = ref(false)
const active = ref(true)

const LOG_MAX_LENGTH = 131_072
const LOG_INTERVAL = 3000
const start = ref(0)
const end = ref(LOG_MAX_LENGTH)

const logfileState = useGetLogfile({ disableGlobalError: true, cacheTime: 0 })

const { pause, resume, isActive } = useIntervalFn(
  () => {
    if (active.value) requestFlag.value = !requestFlag.value
  },
  LOG_INTERVAL,
  { immediate: false },
)

watch(
  requestFlag,
  async (newVal) => {
    if (!active.value) return
    if (logfileState?.isLoading?.value) return

    try {
      // const result = await logfileState.mutateAsync({ start: start.value, end: end.value })
      // let newLog = result.slice(-LOG_MAX_LENGTH)
      // if (newLog.length === LOG_MAX_LENGTH) {
      //   const lineBreakIndex = newLog.indexOf('\n')
      //   if (lineBreakIndex !== -1) {
      //     newLog = newLog.slice(lineBreakIndex + 1)
      //   }
      // }
      // start.value = end.value
      // end.value = end.value + LOG_MAX_LENGTH
      // log.value = newLog
      log.value = `2025-11-25 21:38:43,575 INFO [main] [] com.github.mawen12.MonitorApp: Starting MonitorApp using Java 17.0.15 on mawendeMac-mini.local with PID 9015 (/Users/mawen/Documents/github/mawen12/learn-spring-boot/spring-boot2/spring-boot2-monitor-demo/target/classes started by mawen in /Users/mawen/Documents/github/mawen12/learn-spring-boot)
2025-11-25 21:38:43,578 INFO [main] [] com.github.mawen12.MonitorApp: No active profile set, falling back to 1 default profile: "default"
2025-11-25 21:38:44,008 INFO [main] [] org.springframework.boot.web.embedded.tomcat.TomcatWebServer: Tomcat initialized with port(s): 28081 (http)
2025-11-25 21:38:44,059 INFO [main] [] org.apache.coyote.http11.Http11NioProtocol: Initializing ProtocolHandler ["http-nio-28081"]
2025-11-25 21:38:44,064 INFO [main] [] org.apache.catalina.core.StandardService: Starting service [Tomcat]
2025-11-25 21:38:44,064 INFO [main] [] org.apache.catalina.core.StandardEngine: Starting Servlet engine: [Apache Tomcat/9.0.83]
2025-11-25 21:38:44,101 INFO [main] [] org.apache.catalina.core.ContainerBase.[Tomcat].[localhost].[/]: Initializing Spring embedded WebApplicationContext
2025-11-25 21:38:44,101 INFO [main] [] org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext: Root WebApplicationContext: initialization completed in 508 ms
2025-11-25 21:38:44,121 INFO [main] [] com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceAutoConfigure: Init DruidDataSource
2025-11-25 21:38:44,151 ERROR [main] [] org.springframework.boot.web.embedded.tomcat.TomcatStarter: Error starting Tomcat context. Exception: org.springframework.beans.factory.UnsatisfiedDependencyException. Message: Error creating bean with name 'webMvcMetricsFilter' defined in class path resource [org/springframework/boot/actuate/autoconfigure/metrics/web/servlet/WebMvcMetricsAutoConfiguration.class]: Unsatisfied dependency expressed through method 'webMvcMetricsFilter' parameter 0; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'simpleMeterRegistry' defined in class path resource [org/springframework/boot/actuate/autoconfigure/metrics/export/simple/SimpleMetricsExportAutoConfiguration.class]: Initialization of bean failed; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'dataSourcePoolMetadataMeterBinder' defined in class path resource [org/springframework/boot/actuate/autoconfigure/metrics/jdbc/DataSourcePoolMetricsAutoConfiguration$DataSourcePoolMetadataMetricsConfiguration.class]: Unsatisfied dependency expressed through method 'dataSourcePoolMetadataMeterBinder' parameter 0; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'dataSource' defined in class path resource [com/alibaba/druid/spring/boot/autoconfigure/DruidDataSourceAutoConfigure.class]: Invocation of init method failed; nested exception is org.springframework.boot.autoconfigure.jdbc.DataSourceProperties$DataSourceBeanCreationException: Failed to determine a suitable driver class
2025-11-25 21:38:44,160 INFO [main] [] org.apache.catalina.core.StandardService: Stopping service [Tomcat]
2025-11-25 21:38:44,167 WARN [main] [] org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext: Exception encountered during context initialization - cancelling refresh attempt: org.springframework.context.ApplicationContextException: Unable to start web server; nested exception is org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat
2025-11-25 21:38:44,174 INFO [main] [] org.springframework.boot.autoconfigure.logging.ConditionEvaluationReportLoggingListener:

Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2025-11-25 21:38:44,181 ERROR [main] [] org.springframework.boot.diagnostics.LoggingFailureAnalysisReporter:

***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.

Reason: Failed to determine a suitable driver class


Action:

Consider the following:
	If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.
	If you have database settings to be loaded from a particular profile you may need to activate it (no profiles are currently active).
`
      // if (!isActive.value) {
      //   resume()
      // }
    } catch (e) {
      console.error(e)
      active.value = false
    }
  },
  { immediate: true },
)

const uiStatus = computed(() => {
  if (isNil(log)) {
    if (logfileState.error) {
      return 'error'
    }
    return 'loading'
  }
  return 'content'
})
</script>

<template>
  <the-page>
    <template v-if="uiStatus === 'loading'">
      <loading-page />
    </template>
    <template v-else-if="uiStatus === 'error'"> error </template>
    <template v-else>
      <log-code :log="log" />
    </template>
  </the-page>
</template>

<style scoped></style>
