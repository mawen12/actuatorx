<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import CachesContent from "@/pages/caches/CachesContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="caches">
      <caches-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
