<script setup>
import {useGetBeansQuery} from '@/apis/requests/endpoints/beans/getBeans'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import ThePage from '@/components/page/ThePage.vue'
import {beansTabsEntity} from '@/entities/beans/beansTabs.entity'

const {data, isLoading, refetch} = useGetBeansQuery({})
</script>

<template>
  <the-page>
    <tabs-context
        :entity="beansTabsEntity"
        :data="data"
        :loading="isLoading"
        :refetch-handler="refetch"
    >
      <tabs-custom/>
    </tabs-context>
  </the-page>
</template>

<style scoped>
</style>
