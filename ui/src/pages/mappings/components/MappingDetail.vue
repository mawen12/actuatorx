<script setup>
import MappingDispatcherServletDetail from './MappingDispatcherServletDetail.vue'
import MappingServletDetail from './MappingServletDetail.vue'
import MappingServletFilterDetail from './MappingServletFilterDetail.vue'

defineProps({
  item: Object,
})
</script>

<template>
  <v-container fluid class="pa-4 d-flex flex-column ga-2">
    <template v-if="item.type === 'servlet'">
      <MappingServletDetail :item="item"/>
    </template>
    <template v-else-if="item.type === 'servletFilter'">
      <MappingServletFilterDetail :item="item"/>
    </template>
    <template v-else-if="item.type === 'dispatcherServlet'">
      <MappingDispatcherServletDetail :item="item"/>
    </template>
  </v-container>
</template>

<style scoped>
.page-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.v-theme--dark .page-card {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
