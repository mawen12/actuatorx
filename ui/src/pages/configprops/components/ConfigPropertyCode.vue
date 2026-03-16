<script setup>
import yaml from 'js-yaml'
import {computed} from 'vue'
import {toString} from 'lodash-es'
import {search} from '@codemirror/search'
import CodeEditor from '@/components/code/CodeEditor.vue'
import {indentFoldingExtension} from '@/components/code/extensions/indentFoldingExtension'

const props = defineProps({
  data: Object,
})

const toYaml = computed(() => {
  const root = {}
  let cursor = root

  for (const part of props.data.prefix.split('.')) {
    cursor[part] = {}
    cursor = cursor[part]
  }

  Object.assign(cursor, props.data.properties)

  return root
})

const code = computed(() =>
    yaml.dump(toYaml.value, {
      lineWidth: 1024,
      sortKeys: (a, b) => toString(a).localeCompare(toString(b)),
    }),
)

const searchExtension = computed(() => search({top: false}))
</script>

<template>
  <v-card>
    <v-card-text>
      <code-editor
          language="yaml"
          :value="code"
          readonly
          :extensions="[indentFoldingExtension, searchExtension]"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
