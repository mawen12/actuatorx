<script setup>
import LoadingPage from '@/components/page/LoadingPage.vue'
import ThreaddumpTable from './components/ThreaddumpTable.vue'
import {useGetThreaddumpQuery} from "@/apis/requests/endpoints/threaddump/getThreaddump.js";

const {isLoading, data, refetch} = useGetThreaddumpQuery({})
</script>

<template>
  <template v-if="isLoading">
    <loading-page/>
  </template>
  <template v-else>
    <threaddump-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
  </template>
</template>

<style scoped></style>
