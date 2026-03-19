<script setup>
import {useGetLoggersQuery} from '@/apis/requests/endpoints/loggers/getLoggers'
import LoadingPage from '@/components/page/LoadingPage.vue'
import LoggersTable from './components/LoggersTable.vue'
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {isLoading, data, refetch} = useGetLoggersQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="loggers">
    <template v-if="isLoading">
      <loading-page/>
    </template>
    <template v-else>
      <loggers-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
    </template>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
