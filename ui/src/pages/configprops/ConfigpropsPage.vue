<script setup>
import {useGetConfigpropsQuery} from '@/apis/requests/endpoints/configprops/getConfigprops'
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import {configpropsTabsEntity} from '@/entities/configprops/configpropsTabs.entity'
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {data, isLoading, refetch} = useGetConfigpropsQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="configprops">
      <tabs-context
          :entity="configpropsTabsEntity"
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
