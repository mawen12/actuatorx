<script setup>
import TabsContext from '@/components/tabs/TabsContext.vue'
import TabsCustom from '@/components/tabs/TabsCustom.vue'
import {useGetScheduldTasksQuery} from '@/apis/requests/endpoints/scheduled-tasks/getScheduledTasks'
import {scheduledTasksTabsEntity} from '@/entities/scheduled-tasks/scheduledTasksTabs.entity'

const {data, isLoading, refetch} = useGetScheduldTasksQuery({})
</script>

<template>
  <tabs-context
      :entity="scheduledTasksTabsEntity"
      :data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <tabs-custom/>
  </tabs-context>
</template>

<style scoped></style>
