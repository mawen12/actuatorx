<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import { metricsTableEntity } from '@/entities/metrics/metricsTable.entity'
import MetricDetails from './MetricDetails.vue'

defineProps({
  data: Array,
  isLoading: Boolean,
  refetch: Function,
})
</script>

<template>
  <table-context
    :entity="metricsTableEntity"
    :data="data"
    :all-data="data"
    :loading="isLoading"
    :refetch-handler="refetch"
  >
    <table-custom>
      <template v-slot:expanded-row="{ columns, item }">
        <tr class="expanded-row">
          <td :colspan="columns.length" style="padding: 0px">
            <metric-details :item="item" />
          </td>
        </tr>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
