<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { d } = useI18n()

const props = defineProps({
  value: Number,
})

const formatted = computed(() => d(props.value, 'shortMedium'))
</script>

<template>
  {{ formatted }}
</template>

<style scoped>

</style>