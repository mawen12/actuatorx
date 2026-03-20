<script setup>
import {useGetLoggersQuery} from '@/apis/requests/endpoints/loggers/getLoggers'
import LoadingPage from '@/components/page/LoadingPage.vue'
import LoggersTable from './components/LoggersTable.vue'

const {isLoading, data, refetch} = useGetLoggersQuery({})
</script>

<template>
  <template v-if="isLoading">
    <loading-page/>
  </template>
  <template v-else>
    <loggers-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
  </template>
</template>

<style scoped></style>
