<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import BeansContent from "@/pages/beans/BeansContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="beans">
      <beans-content />
    </ability-check>
  </the-page>
</template>

<style scoped></style>
