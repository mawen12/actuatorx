<script setup>
import LoadingPage from '@/components/page/LoadingPage.vue'
import CachesTable from './components/CachesTable.vue'
import {useGetCachesQuery} from '@/apis/requests/endpoints/caches/getCaches'

const {isLoading, data, refetch} = useGetCachesQuery({})
</script>

<template>
  <template v-if="isLoading">
    <loading-page/>
  </template>
  <template v-else>
    <caches-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
  </template>
</template>

<style scoped></style>
