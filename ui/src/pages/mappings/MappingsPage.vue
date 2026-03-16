<script setup>
import ThePage from '@/components/page/ThePage.vue'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import {mappingsTabsEntity} from '@/entities/mappings/mappingsTabs.entity'
import {useGetMappingsQuery} from '@/apis/requests/endpoints/mappings/getMappings'

const {data, isLoading, refetch} = useGetMappingsQuery({})
</script>

<template>
  <the-page>
    <tabs-context
        :entity="mappingsTabsEntity"
        :data="data"
        :loading="isLoading"
        :refetch-handler="refetch"
    >
      <tabs-custom/>
    </tabs-context>
  </the-page>
</template>

<style scoped></style>
