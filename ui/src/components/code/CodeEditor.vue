<script setup>
import {computed, ref} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {EditorView} from '@codemirror/view'
import {langs} from '@uiw/codemirror-extensions-langs'

const props = defineProps({
  language: String,
  readonly: Boolean,
  extensions: Array,
  value: {
    type: [Object, String],
  },
})

const editorTheme = ref('dark')

const languageExtensions = computed(() => {
  if (!props.language) {
    return []
  }

  switch (props.language) {
    case 'yaml':
      return [langs.yaml()]
    case 'java':
      return [langs.java()]
    case 'json':
      return [langs.json()]
    default:
      return []
  }
})

const code = computed(() => props.value)
</script>

<template>
  <codemirror
      v-model="code"
      :readonly="readonly"
      :extensions="[EditorView.lineWrapping, ...languageExtensions, ...(extensions || [])]"
  />
</template>

<style scoped></style>
