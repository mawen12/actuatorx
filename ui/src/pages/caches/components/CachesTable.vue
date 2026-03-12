<script setup>
import { useEvictAllCaches } from '@/apis/requests/endpoints/caches/evictAllCaches'
import { useEvictCache } from '@/apis/requests/endpoints/caches/evictCache'
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import { cachesTableEntity } from '@/entities/caches/cachesTable.entity'
import { useTimeoutFn } from '@vueuse/core'
import { ref } from 'vue'

defineProps({
  data: Array,
  isLoading: Boolean,
  refetch: Function,
})

const cleaned = ref(undefined)
const isCleaned = (item) => cleaned.value === item.name
const { start, stop } = useTimeoutFn(() => (cleaned.value = undefined), 1500, {
  immediate: false,
})

const evictState = useEvictCache({})
const evictAllState = useEvictAllCaches({})

const actionsHandler = async (actionId, item) => {
  switch (actionId) {
    case 'evict':
      await evictState.mutateAsync({ cacheName: item.name, cacheManager: item.cacheManager })
      cleaned.value = item.name
      stop()
      start()
      break
    default:
      break
  }
}

const globalItem = { name: '__all' }

const globalActionsHandler = async (actionId) => {
  switch (actionId) {
    case 'evictAll':
      await evictAllState.mutateAsync({})
      cleaned.value = globalItem.name
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
    :entity="cachesTableEntity"
    :data="data"
    :all-data="data"
    :loading="isLoading"
    :refetch-handler="refetch"
    :global-actions-handler="globalActionsHandler"
  >
    <table-custom>
      <template v-slot:item.actions="{ item }">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              size="small"
              v-bind="props"
              :active="isCleaned(item)"
              variant="text"
              :icon="isCleaned(item) ? 'mdi-check' : 'mdi-broom'"
              @click.stop="(event) => actionsHandler('evict', item)"
            />
          </template>
          {{ isCleaned(item) ? 'Evicted' : 'Evict' }}
        </v-tooltip>
      </template>

      <template v-slot:global-actions="{}">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              @click.stop="(event) => globalActionsHandler('evictAll')"
              variant="text"
              :active="isCleaned(globalItem)"
              :icon="isCleaned(globalItem) ? 'mdi-check' : 'mdi-broom'"
              v-bind="props"
            />
          </template>
          {{ isCleaned(globalItem) ? 'Evicted All' : 'Evict All' }}
        </v-tooltip>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
