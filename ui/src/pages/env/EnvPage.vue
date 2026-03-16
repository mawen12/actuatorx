<script setup>
import {useGetEnvQuery} from '@/apis/requests/endpoints/env/getEnv'
import TabsContext from '@/components/tabs/TabsContext.vue'
import {envTabsEntity} from '@/entities/env/envTabs.entity'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import ThePage from '@/components/page/ThePage.vue'

const {data, isLoading, refetch} = useGetEnvQuery({})
</script>

<template>
  <the-page>
    <tabs-context
        :entity="envTabsEntity"
        :data="data"
        :loading="isLoading"
        :refetch-handler="refetch"
    >
      <tabs-custom/>
    </tabs-context>
  </the-page>
</template>

<style scoped>
.page-root {
  height: 100%;
}
</style>
