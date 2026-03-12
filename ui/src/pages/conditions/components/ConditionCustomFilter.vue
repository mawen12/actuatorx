<script setup>
import { inject, toRef, watch } from 'vue'

const props = defineProps({
  onChange: Function,
})

const { customFilters } = inject('tabsContext')

const typeRef = toRef(customFilters, 'type')

watch(customFilters, (newVal) => {
  const result = newVal.type
  props.onChange?.(result)
})
</script>

<template>
  <v-btn-toggle
    v-model="typeRef"
    density="compact"
    border="opacity-50 sm"
    rounded="lg"
    divided
    variant="text"
  >
    <v-btn color="info" value="positiveMatches">Positive</v-btn>
    <v-btn color="warning" value="negativeMatches">Negative</v-btn>
    <v-btn color="grey" value="unconditional">Unconditional</v-btn>
  </v-btn-toggle>
</template>

<style scoped></style>
