<script setup>
import {useGetMetricsQuery} from '@/apis/requests/endpoints/metrics/getMetrics'
import TableCustom from '@/components/table/TableCustom.vue'
import TableContext from '@/components/table/TableContext.vue'
import {metricsTableEntity} from '@/entities/metrics/metricsTable.entity'

const {isLoading, data, refetch} = useGetMetricsQuery({})
</script>

<template>
  <!-- <v-card style="height: 100%; display: flex; flex-direction: column; overflow: hidden !important"> -->

  <!-- <v-data-table :headers="metricsTableEntity.headers" :items="data" class="data-table">
    </v-data-table> -->
  <table-context
      :entity="metricsTableEntity"
      :data="data"
      :all-data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <table-custom></table-custom>
  </table-context>
  <!-- </v-card> -->
</template>

<style scoped>
.data-table {
  overflow: auto;
  flex: 1;
}
</style>
