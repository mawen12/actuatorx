<script setup>
import {useGetBeansQuery} from '@/apis/requests/endpoints/beans/getBeans'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import {beansTabsEntity} from '@/entities/beans/beansTabs.entity'

const {data, isLoading, refetch} = useGetBeansQuery({})
</script>

<template>
  <tabs-context
      :entity="beansTabsEntity"
      :data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <tabs-custom/>
  </tabs-context>
</template>

<style scoped>
</style>
