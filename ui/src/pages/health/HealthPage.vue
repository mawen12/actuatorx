<script setup>
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import HealthContent from "@/pages/health/HealthContent.vue";
</script>

<template>
  <v-container fluid class="page-root w-md-100 w-lg-75 w-xl-50 pa-4">
    <ability-check ability="health">
      <health-content/>
    </ability-check>
  </v-container>
</template>

<style scoped>
.page-root {
  height: 100%;
}
</style>
