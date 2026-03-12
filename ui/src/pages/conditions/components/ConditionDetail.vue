<script setup>
import ConditionNegativeMatchDetail from './ConditionNegativeMatchDetail.vue'
import ConditionPositiveMatchDetail from './ConditionPositiveMatchDetail.vue'

defineProps({
  item: Object,
})
</script>

<template>
  <v-container fluid class="pa-4 d-flex flex-column ga-2">
    <template v-if="item.type === 'positiveMatches'">
      <ConditionPositiveMatchDetail :item="item" />
    </template>
    <template v-else-if="item.type === 'negativeMatches'">
      <ConditionNegativeMatchDetail :item="item" />
    </template>
    <template v-else>
      <v-card class="page-card rounded-lg" :elevation="0" title="Unconditional"> </v-card>
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
