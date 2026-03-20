<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import MappingsContent from "@/pages/mappings/MappingsContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="mappings">
      <mappings-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
