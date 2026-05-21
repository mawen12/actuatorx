<script setup>
import WebsocketProvider from '@/contexts/WebsocketProvider.vue'
</script>

<template>
  <websocket-provider>
    <v-theme-provider with-background style="height: 100%">
      <router-view />
    </v-theme-provider>
  </websocket-provider>
</template>

<style scoped></style>
