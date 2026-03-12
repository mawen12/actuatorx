<script setup>
import { inject, toRef, watch } from 'vue'

const props = defineProps({
  onChange: Function,
})

const { customFilters } = inject('tableContext')

const configuredRef = toRef(customFilters, 'configured')

watch(customFilters, (newVal) => {
  const result = newVal.configured
  props.onChange?.(result)
})
</script>

<template>
  <v-btn-toggle
    v-model="configuredRef"
    density="compact"
    border="opacity-50 sm"
    rounded="lg"
    divided
    variant="text"
    color="warning"
  >
    <v-btn :value="true">Configured</v-btn>
  </v-btn-toggle>
</template>

<style scoped></style>
