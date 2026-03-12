<script setup>
import { ref } from 'vue'
const isLoading = ref(true)
</script>

<template>
  <v-container fluid class="position-relative" style="height: 100%">
    <v-overlay
      v-model:model-value="isLoading"
      contained
      class="d-flex align-center justify-center"
      :persistent="true"
      scrim
    >
      <v-progress-circular color="primary" indeterminate size="48" width="4"> </v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<style scoped></style>
