<script setup>
import ThePage from '@/components/page/ThePage.vue'

defineProps({
  error: Object,
  handler: Function,
})

// const error = ref(undefined)

// const resetError = () => {
//   error.value = undefined
// }

// onErrorCaptured((err, instance, info) => {
//   error.value = {
//     message: err.message,
//     component: instance.$type.name,
//     info,
//   }
//   // Stop error propagation
//   return false
// })
</script>

<template>
  <v-container fluid class="d-flex align-center justify-center fill-height">
    <v-card class="mx-auto px-6 py-8" :title="error.message" :elevation="0">
      <v-btn color="warning" size="large" variant="elevated" block @click="handler">Refetch</v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.page-card {
  height: 100%;
}
</style>
