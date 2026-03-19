<script setup>
import LoadingPage from '@/components/page/LoadingPage.vue'
import CachesTable from './components/CachesTable.vue'
import {useGetCachesQuery} from '@/apis/requests/endpoints/caches/getCaches'
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {isLoading, data, refetch} = useGetCachesQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="caches">
      <template v-if="isLoading">
        <loading-page/>
      </template>
      <template v-else>
        <caches-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
      </template>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
