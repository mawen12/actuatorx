<script setup>
import ThePage from '@/components/page/ThePage.vue'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import {mappingsTabsEntity} from '@/entities/mappings/mappingsTabs.entity'
import {useGetMappingsQuery} from '@/apis/requests/endpoints/mappings/getMappings'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {data, isLoading, refetch} = useGetMappingsQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="mappings">
      <tabs-context
          :entity="mappingsTabsEntity"
          :data="data"
          :loading="isLoading"
          :refetch-handler="refetch"
      >
        <tabs-custom/>
      </tabs-context>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
