<script setup>
import {useGetConfigpropsQuery} from '@/apis/requests/endpoints/configprops/getConfigprops'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import {configpropsTabsEntity} from '@/entities/configprops/configpropsTabs.entity'

const {data, isLoading, refetch} = useGetConfigpropsQuery({})
</script>

<template>
  <tabs-context
      :entity="configpropsTabsEntity"
      :data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <tabs-custom/>
  </tabs-context>
</template>

<style scoped></style>
