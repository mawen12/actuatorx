<script setup>
import {useGetEnvQuery} from '@/apis/requests/endpoints/env/getEnv'
import TabsContext from '@/components/tabs/TabsContext.vue'
import {envTabsEntity} from '@/entities/env/envTabs.entity'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {data, isLoading, refetch} = useGetEnvQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="env">
      <tabs-context
          :entity="envTabsEntity"
          :data="data"
          :loading="isLoading"
          :refetch-handler="refetch"
      >
        <tabs-custom/>
      </tabs-context>
    </ability-check>
  </the-page>
</template>

<style scoped>
.page-root {
  height: 100%;
}
</style>
