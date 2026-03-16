<script setup>
import {computed} from 'vue'
import {getHealthStatusColor} from '@/utils/itemUtils'
import {
  getHealthDetailsKeyFormatter,
  getHealthDetailsValueFormatter,
} from '@/pages/health/utils/healthDetailsFormatters'

const props = defineProps({
  component: Object,
  name: String,
  status: String,
  details: Object,
})

const name = computed(() => {
  const keyFormatter = getHealthDetailsKeyFormatter(props.component.name)
  return keyFormatter(props.component.name)
})
const status = computed(() => props.component.status)
const details = computed(() => props.component.details)
const statusColor = computed(() => getHealthStatusColor(status.value))

const formattedKey = (key) => {
  const fullKey = `${props.component.name}.${key}`
  const keyFormatter = getHealthDetailsKeyFormatter(fullKey)
  return keyFormatter(key)
}

const formattedValue = (key, value) => {
  const fullKey = `${props.component.name}.${key}`
  const valueFormatter = getHealthDetailsValueFormatter(fullKey)
  return valueFormatter(value)
}
</script>

<template>
  <v-card class="page-card rounded-lg" :elevation="0">
    <v-card-title class="d-flex align-center">
      <span class="text-capitalize">{{ name }}</span>
      <v-spacer/>
      <span :class="statusColor">{{ status }}</span>
    </v-card-title>

    <template v-if="details">
      <v-card-text>
        <div v-for="(value, key, idx) in details" :key="idx" class="d-flex row items-center">
          <span class="text-body-2 text-capitalize">{{ formattedKey(key) }}</span>

          <v-spacer/>

          <span class="text-subtitle-2">{{ formattedValue(key, value) }}</span>
        </div>
      </v-card-text>
    </template>
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
</style>
