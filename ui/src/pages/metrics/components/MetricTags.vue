<script setup>
import { computed } from 'vue'

const props = defineProps({
  allTags: Array,
  availableTags: Array,
  selectedTags: Object,
})

const map = computed(() => {
  const m = new Map()

  for (const { tag, values } of props.availableTags) {
    m.set(tag, new Set(values))
  }

  return m
})

const disableAll = computed(() => {
  return props.availableTags.length === 1 && props.availableTags[0].values.length === 1
})

const disabled = (v, tag) => {
  const selected = props.selectedTags[tag] === v
  return !selected && !map.value.get(tag)?.has(v)
}
</script>

<template>
  <v-card outlined class="page-card rounded-lg" :elevation="0">
    <v-card-title>Available Tags</v-card-title>

    <v-card-text>
      <v-row>
        <v-col :cols="6" :sm="12" :xl="6" v-for="tag in allTags" :key="tag.tag">
          <span class="text-body-2">{{ tag.tag }}</span>

          <v-chip-group
            v-model:model-value="selectedTags[tag.tag]"
            column
            :filter="false"
            :label="true"
            :pill="true"
          >
            <v-chip
              v-for="v in tag.values"
              :key="v"
              :value="v"
              color="deep-purple"
              :disabled="disableAll || disabled(v, tag.tag)"
              >{{ v }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.page-card {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.v-theme--dark .page-card {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
