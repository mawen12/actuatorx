<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import ThreaddumpContent from "@/pages/threaddump/ThreaddumpContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="threaddump">
      <threaddump-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
