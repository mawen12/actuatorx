<script setup>
import LoadingPage from '@/components/page/LoadingPage.vue'
import ThePage from '@/components/page/ThePage.vue'
import {useGetLogfile} from '@/apis/requests/endpoints/logfile/getLogFile'
import {computed, ref, watch} from 'vue'
import {isNil} from 'lodash-es'
import {useIntervalFn} from '@vueuse/core'
import LogCode from './components/LogCode.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const log = ref(undefined)
const requestFlag = ref(false)
const active = ref(true)

const LOG_MAX_LENGTH = 131_072
const LOG_INTERVAL = 3000
const start = ref(0)
const end = ref(LOG_MAX_LENGTH)

const logfileState = useGetLogfile({disableGlobalError: true, cacheTime: 0})

const {pause, resume, isActive} = useIntervalFn(
    () => {
      if (active.value) requestFlag.value = !requestFlag.value
    },
    LOG_INTERVAL,
    {immediate: false},
)

watch(
    requestFlag,
    async (newVal) => {
      if (!active.value) return
      if (logfileState?.isLoading?.value) return

      try {
        const result = await logfileState.mutateAsync({ start: start.value, end: end.value })
        let newLog = result.slice(-LOG_MAX_LENGTH)
        if (newLog.length === LOG_MAX_LENGTH) {
          const lineBreakIndex = newLog.indexOf('\n')
          if (lineBreakIndex !== -1) {
            newLog = newLog.slice(lineBreakIndex + 1)
          }
        }
        start.value = end.value
        end.value = end.value + LOG_MAX_LENGTH
        log.value = newLog
        if (!isActive.value) {
          resume()
        }
      } catch (e) {
        console.error(e)
        active.value = false
      }
    },
    {immediate: true},
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
    <ability-check ability="logfile">
    <template v-if="uiStatus === 'loading'">
      <loading-page/>
    </template>
    <template v-else-if="uiStatus === 'error'"> error</template>
    <template v-else>
      <log-code :log="log"/>
    </template>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
