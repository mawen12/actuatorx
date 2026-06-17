<script setup>
import LoadingPage from '@/components/page/LoadingPage.vue'
import TogglzTable from './components/TogglzTable.vue'
import {useGetTogglzQuery} from "@/apis/requests/endpoints/togglz/getTogglz.js";

const {isLoading, data, refetch} = useGetTogglzQuery({})
</script>

<template>
  <template v-if="isLoading">
    <loading-page/>
  </template>
  <template v-else>
    <togglz-table :data="data" :is-loading="isLoading" :refetch="refetch"/>
  </template>
</template>

<style scoped></style>
