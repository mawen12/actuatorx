<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import LoggersContent from "@/pages/loggers/LoggersContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="loggers">
      <loggers-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
