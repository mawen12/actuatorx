<script setup>
import { useGetConfigpropsQuery } from '@/apis/requests/endpoints/configprops/getConfigprops'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import { configpropsTabsEntity } from '@/entities/configprops/configpropsTabs.entity'
import ThePage from '@/components/page/ThePage.vue'

const { data, isLoading, refetch } = useGetConfigpropsQuery({})
</script>

<template>
  <the-page>
    <tabs-context
      :entity="configpropsTabsEntity"
      :data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
    >
      <tabs-custom />
    </tabs-context>
  </the-page>
</template>

<style scoped></style>
