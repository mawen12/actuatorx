<script setup>
import {useSetLoggerLevel} from '@/apis/requests/endpoints/loggers/setLoggerLevels'
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import {loggersTableEntity} from '@/entities/loggers/loggersTable.entity'
import {useTimeoutFn} from '@vueuse/core'
import {ref} from 'vue'
import LoggerLevel from './LoggerLevel.vue'

defineProps({
  data: Array,
  isLoading: Boolean,
  refetch: Function,
})

const reseted = ref(undefined)
const isReseted = (item) => reseted.value === item.name
const {start, stop} = useTimeoutFn(() => (reseted.value = undefined), 500, {
  immediate: false,
})

const setLoggerLevelState = useSetLoggerLevel({})

const actionsHandler = async (actionId, item) => {
  switch (actionId) {
    case 'reset':
      await setLoggerLevelState.mutateAsync({loggerName: item.name})
      reseted.value = item.name
      stop()
      start()
      break
    default:
      break
  }
}
</script>

<template>
  <table-context
      :entity="loggersTableEntity"
      :data="data"
      :all-data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <table-custom>
      <template v-slot:item.level="{ item }">
        <logger-level :item="item"/>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
                size="small"
                v-bind="props"
                :active="isReseted(item)"
                :disabled="item.name === 'ROOT' || !item.configuredLevel"
                variant="text"
                :icon="isReseted(item) ? 'mdi-check' : 'mdi-restore'"
                @click.stop="(event) => actionsHandler('reset', item)"
            />
          </template>
          {{ isReseted(item) ? 'Reseted' : 'Reset' }}
        </v-tooltip>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
