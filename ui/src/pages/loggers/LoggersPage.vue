<script setup>
import {useGetLoggersQuery} from '@/apis/requests/endpoints/loggers/getLoggers'
import LoadingPage from '@/components/page/LoadingPage.vue'
import LoggersTable from './components/LoggersTable.vue'
import ThePage from '@/components/page/ThePage.vue'

const {isLoading, data, refetch} = useGetLoggersQuery({})
</script>

<template>
  <the-page>
    <template v-if="isLoading">
      <loading-page/>
    </template>
    <template v-else>
      <loggers-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
    </template>
  </the-page>
</template>

<style scoped></style>
