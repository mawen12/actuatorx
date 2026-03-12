<script setup>
defineProps({
  code: String,
})
</script>

<template>
  <div class="inline-code text-truncate">
    {{ code }}
  </div>
</template>

<style scoped>
.inline-code {
  border: 1px solid rgba(145, 158, 171, 0.24);
  border-radius: 4px;
  padding: 0 4px;
  color: orange;
  font-family: monospace;
  background-color: #fff;
}
</style>
