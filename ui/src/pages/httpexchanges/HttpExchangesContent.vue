<script setup>
import LoadingPage from '@/components/page/LoadingPage.vue'
import {useGetHttpExchangesQuery} from '@/apis/requests/endpoints/httpexchanges/getHttpExchanges'
import HttpExchangesTable from './components/HttpExchangesTable.vue'

const {isLoading, data, refetch} = useGetHttpExchangesQuery({})
</script>

<template>
  <template v-if="isLoading">
    <loading-page/>
  </template>
  <template v-else>
    <http-exchanges-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
  </template>
</template>

<style scoped></style>
