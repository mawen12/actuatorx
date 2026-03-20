<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import ConditionsContent from "@/pages/conditions/ConditionsContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="conditions">
      <conditions-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
