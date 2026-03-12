<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: Number,
})

const calculatedSeconds = computed(() => {
  const now = new Date().getTime()
  return Math.round((props.value - now) / 1000)
})

const calculatedValue = computed(() => {
  const absCalculatedSeconds = Math.abs(calculatedSeconds.value)
  if (absCalculatedSeconds < 60) {
    return calculatedSeconds.value
  }
  if (absCalculatedSeconds < 60 * 60) {
    return Math.round(calculatedSeconds.value / 60)
  }
  if (absCalculatedSeconds < 60 * 60 * 24) {
    return Math.round(calculatedSeconds.value / 60 / 60)
  }
  if (absCalculatedSeconds < 60 * 60 * 24 * 30) {
    return Math.round(calculatedSeconds.value / 60 / 60 / 24)
  }
  if (absCalculatedSeconds < 60 * 60 * 24 * 365) {
    return Math.round(calculatedSeconds.value / 60 / 60 / 24 / 30)
  }
  return Math.round(calculatedSeconds.value / 60 / 60 / 24 / 365)
})

const unit = computed(() => {
  const absCalculatedSeconds = Math.abs(calculatedSeconds.value)
  if (absCalculatedSeconds < 60) {
    return 'second'
  }
  if (absCalculatedSeconds < 60 * 60) {
    return 'minute'
  }
  if (absCalculatedSeconds < 60 * 60 * 24) {
    return 'hour'
  }
  if (absCalculatedSeconds < 60 * 60 * 24 * 30) {
    return 'day'
  }
  if (absCalculatedSeconds < 60 * 60 * 24 * 365) {
    return 'month'
  }
  return 'year'
})

const updateIntervalInSeconds = computed(() => {
  switch (unit.value) {
    case 'second':
      return 1
    case 'minute':
      return 10
    case 'hour':
      return 60
    default:
      return 0
  }
})
</script>

<template>
  <slot />
</template>

<style scoped>

</style>