<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import TogglzContent from "@/pages/togglz/TogglzContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="togglz">
      <togglz-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
