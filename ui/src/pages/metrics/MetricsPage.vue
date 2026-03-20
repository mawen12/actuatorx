<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import MetricsContent from "@/pages/metrics/MetricsContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="metrics">
      <metrics-content/>
    </ability-check>
  </the-page>
</template>

<style scoped>
</style>
