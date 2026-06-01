<script setup>

import {computed} from "vue";

const props = defineProps({
  item: Object
})

</script>

<template>
  <v-container fluid class="pa-4 d-flex flex-column ga-2">
    <v-card class="page-card rounded-lg" :elevation="0">
      <v-card-text>
        {{ props.item }}
      </v-card-text>

<!--      <v-card-text>-->

<!--      </v-card-text>-->
    </v-card>
  </v-container>
</template>

<style scoped>

</style>