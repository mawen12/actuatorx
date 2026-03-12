<script setup>
import { useGetMetricsQuery } from '@/apis/requests/endpoints/metrics/getMetrics'
import LoadingPage from '@/components/page/LoadingPage.vue'
import ThePage from '@/components/page/ThePage.vue'
import MetricsTable from './components/MetricsTable.vue'

const { isLoading, data, refetch } = useGetMetricsQuery({})
</script>

<template>
  <the-page>
    <template v-if="isLoading">
      <loading-page />
    </template>
    <template v-else>
      <metrics-table :data="data" :is-loading="isLoading" :refetch="refetch" />
    </template>
  </the-page>
</template>

<style scoped>
</style>
