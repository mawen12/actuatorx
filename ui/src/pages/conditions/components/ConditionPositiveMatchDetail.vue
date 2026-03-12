<script setup>
defineProps({
  item: Object,
})
</script>

<template>
  <v-card class="page-card rounded-lg" :elevation="0" title="Positive Matches">
    <template v-for="(v, idx) in item.value" :key="idx">
      <v-card-text>
        <div class="text-subtitle-1 mb-1">{{ v.condition }}</div>

        <span class="border-sm rounded-lg pa-2 text-subtitle-2 text-blue-lighten-1">{{
          v.message
        }}</span>
      </v-card-text>
    </template>
  </v-card>
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
