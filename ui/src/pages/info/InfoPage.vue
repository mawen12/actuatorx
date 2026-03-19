<script setup>
import {useGetMetricsQuery} from '@/apis/requests/endpoints/metrics/getMetrics'
import TableCustom from '@/components/table/TableCustom.vue'
import TableContext from '@/components/table/TableContext.vue'
import {metricsTableEntity} from '@/entities/metrics/metricsTable.entity'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {isLoading, data, refetch} = useGetMetricsQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="info"></ability-check>
  </the-page>
</template>

<style scoped>
.data-table {
  overflow: auto;
  flex: 1;
}
</style>
