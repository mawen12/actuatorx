<script setup>
import { computed, ref } from 'vue'
import { search } from '@codemirror/search'
import { logLanguage } from '@/components/code/extensions/logLanguageExtension'
import CodeEditor from '@/components/code/CodeEditor.vue'
import { EditorView } from '@codemirror/view'

defineProps({
  log: String,
})

const searchExtension = computed(() => search({ top: true }))
const logLanguageExtension = computed(() => logLanguage())
</script>

<template>
  <v-card class="page-card d-flex flex-column rounded-lg" :elevation="0" title="Logfile">
    <v-card-text class="page-content">
      <CodeEditor
        :value="log"
        readonly
        :extensions="[
          EditorView.editable.of(false),
          EditorView.lineWrapping,
          searchExtension,
          logLanguageExtension,
        ]"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.page-card {
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.v-theme--dark .page-card {
  border-color: rgba(255, 255, 255, 0.2);
}

.page-content {
  flex: 1;
  overflow-y: auto !important;
}
</style>
