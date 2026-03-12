<script setup>
import { inject } from 'vue'
import VueFlowCustom from './VueFlowCustom.vue'
import LoadingPage from '../page/LoadingPage.vue'

const { graphData, search, loading, empty } = inject('GraphContext')
</script>

<template>
  <v-card class="page-card rounded-lg d-flex flex-column" :elevation="0">
    <v-card-title>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        autocomplete="suppress"
        rounded="lg"
        hide-details
        single-line
        clearable
      >
      </v-text-field>
    </v-card-title>

    <v-divider />

    <v-card-text style="flex-grow: 1">
      <template v-if="loading"> <LoadingPage /> </template>
      <template v-else-if="empty">Empty...</template>
      <template v-else-if="graphData">
        <VueFlowCustom />
      </template>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.page-card {
  height: 100%;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.v-theme--dark .page-card {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
