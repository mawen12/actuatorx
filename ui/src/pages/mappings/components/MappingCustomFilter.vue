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
    <v-btn color="blue" class="text-none" value="servlet">Servlet</v-btn>
    <v-btn color="warning" class="text-none" value="servletFilter">Servlet Filter</v-btn>
    <v-btn color="green" class="text-none" value="dispatcherServlet">Dispatcher Servlet</v-btn>
  </v-btn-toggle>
</template>

<style scoped></style>
