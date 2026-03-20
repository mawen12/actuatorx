<script setup>

import {computed} from "vue";

const props = defineProps({
  item: Object
})

const isDaemon = computed(() => {
  return props.item.isDaemon ? 'daemon' : ''
})

const info = computed(() => {
  return `"${props.item.threadName}" #${props.item.threadId} ${isDaemon.value} prio=${props.item.priority} in ${props.item.threadState}`
})

const state = computed(() => {
  return `java.lang.Thread.State: ${props.item.threadState}`
})

const stackFrame = (frame) => {
  return `at ${frame.className}.${frame.methodName}(${frame.fileName}:${frame.lineNumber})`
}
</script>

<template>
  <v-container fluid class="pa-4 d-flex flex-column ga-2">
    <v-card class="page-card rounded-lg" :elevation="0">
      <v-card-text>
        <div class="text-subtitle-1 text-uppercase mb-1">Stack Trace</div>

        <div class="pa-1 text-body-1">{{ info }}</div>
        <div class="pa-1 pl-10">{{ state }}</div>

        <div class="pa-1 pl-11" v-for="(frame, idx) in (props.item.stackTrace)" key="idx">
          {{ stackFrame(frame) }}
        </div>
      </v-card-text>

<!--      <v-card-text>-->

<!--      </v-card-text>-->
    </v-card>
  </v-container>
</template>

<style scoped>

</style>