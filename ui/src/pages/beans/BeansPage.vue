<script setup>
import {useGetBeansQuery} from '@/apis/requests/endpoints/beans/getBeans'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import ThePage from '@/components/page/ThePage.vue'
import {beansTabsEntity} from '@/entities/beans/beansTabs.entity'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {data, isLoading, refetch} = useGetBeansQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="beans">
      <tabs-context
          :entity="beansTabsEntity"
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
</style>
