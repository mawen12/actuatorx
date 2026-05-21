<script setup lang="ts">
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import ScheduledTasksContent from "@/pages/scheduled-tasks/ScheduledTasksContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="scheduledtasks">
      <scheduled-tasks-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
