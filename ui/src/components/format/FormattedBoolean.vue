<script setup>
import { FALSE_LABEL_ID, TRUE_LABEL_ID } from '@/constants/ui'

defineProps({
  value: Boolean,
})
</script>

<template>
  {{ value ? TRUE_LABEL_ID : FALSE_LABEL_ID }}
</template>

<style scoped>

</style>