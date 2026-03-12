<script setup>
const props = defineProps({
  onClick: Function,
})
</script>

<template>
  <v-btn icon size="small" variant="text" @click="onClick">
    <v-icon icon="mdi-chevron-double-right"> </v-icon>
  </v-btn>
</template>

<style scoped>

</style>