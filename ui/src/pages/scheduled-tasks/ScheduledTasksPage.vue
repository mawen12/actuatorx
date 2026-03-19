<script setup>
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import ThePage from '@/components/page/ThePage.vue'
import {useGetScheduldTasksQuery} from '@/apis/requests/endpoints/scheduled-tasks/getScheduledTasks'
import {scheduledTasksTabsEntity} from '@/entities/scheduled-tasks/scheduledTasksTabs.entity'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";

const {data, isLoading, refetch} = useGetScheduldTasksQuery({})
</script>

<template>
  <the-page>
    <ability-check ability="scheduled-tasks">
      <tabs-context
          :entity="scheduledTasksTabsEntity"
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
