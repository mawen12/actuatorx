<script setup>
import ThePage from '@/components/page/ThePage.vue'
import AbilityCheck from "@/pages/abilities/AbilityCheck.vue";
import HttpExchangesContent from "@/pages/httpexchanges/HttpExchangesContent.vue";
</script>

<template>
  <the-page>
    <ability-check ability="httpexchanges">
      <http-exchanges-content/>
    </ability-check>
  </the-page>
</template>

<style scoped></style>
