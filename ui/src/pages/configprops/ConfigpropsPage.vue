<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import ConfigpropsContent from "@/pages/configprops/ConfigpropsContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="configprops">
      <configprops-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
