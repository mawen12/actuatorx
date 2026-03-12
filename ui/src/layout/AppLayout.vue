<script setup>
import TheAppBar from './TheAppBar.vue'
import TheSideBar from './TheSideBar.vue'
</script>

<template>
  <v-app style="height: 100%">
    <the-app-bar />

    <the-side-bar />

    <v-main class="main-container">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* :deep(.v-main) {
  overflow: hidden !important;
} */
</style>
