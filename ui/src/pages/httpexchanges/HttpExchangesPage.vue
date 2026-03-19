<script setup>
import LoadingPage from '@/components/page/LoadingPage.vue'
import ThePage from '@/components/page/ThePage.vue'
import {useGetHttpExchangesQuery} from '@/apis/requests/endpoints/httpexchanges/getHttpExchanges'
import HttpExchangesTable from './components/HttpExchangesTable.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {isLoading, data, refetch} = useGetHttpExchangesQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="httpexchanges">
      <template v-if="isLoading">
        <loading-page/>
      </template>
      <template v-else>
        <http-exchanges-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
      </template>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
