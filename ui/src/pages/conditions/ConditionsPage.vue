<script setup>
import { useGetConditionsQuery } from '@/apis/requests/endpoints/conditions/getConditions'
import { conditionsTabsEntity } from '@/entities/conditions/conditionsTabs.entity'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import ThePage from '@/components/page/ThePage.vue'

const { data, isLoading, refetch } = useGetConditionsQuery({})
</script>

<template>
  <the-page>
    <tabs-context
      :entity="conditionsTabsEntity"
      :data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
    >
      <tabs-custom />
    </tabs-context>
  </the-page>
</template>

<style scoped></style>
