<script setup>
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import {mappingsTabsEntity} from '@/entities/mappings/mappingsTabs.entity'
import {useGetMappingsQuery} from '@/apis/requests/endpoints/mappings/getMappings'

const {data, isLoading, refetch} = useGetMappingsQuery({})
</script>

<template>
  <tabs-context
      :entity="mappingsTabsEntity"
      :data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <tabs-custom/>
  </tabs-context>
</template>

<style scoped></style>
