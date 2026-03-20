<script setup>
import {useGetEnvQuery} from '@/apis/requests/endpoints/env/getEnv'
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import EnvContent from "@/pages/env/EnvContent.vue";

const {data, isLoading, refetch} = useGetEnvQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="env">
      <env-content/>
    </ability-check>
  </the-page>
</template>

<style scoped>
</style>
