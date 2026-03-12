<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { formatWidgetValue } from '@/utils/formatUtils'
import { useGetMetricDetailsQuery } from '@/apis/requests/endpoints/metrics/getMetricDetails'
import MetricTags from './MetricTags.vue'

const props = defineProps({
  item: Object,
})

const metricDetails = ref(undefined)
const metricDetailsValue = ref(undefined)
const selectedTags = reactive({})

const { data, isLoading, refetch } = useGetMetricDetailsQuery({
  name: props.item.name,
  tags: selectedTags,
})

watch(
  data,
  (newVal) => {
    if (newVal) {
      if (!metricDetails.value) {
        metricDetails.value = newVal
      }
      metricDetailsValue.value = newVal
    }
  },
  { immediate: true },
)

const measurementHeaders = [
  { title: 'Statistic', key: 'statistic', align: 'start', width: '40%' },
  { title: 'Value', key: 'value', align: 'start', width: '60%' },
]
</script>

<template>
  <v-container fluid class="pa-4 d-flex flex-column ga-2">
    <v-card class="page-card rounded-lg" :elevation="0">
      <v-card-title>Details</v-card-title>
      <v-card-text>
        <div class="d-flex row items-center">
          <span class="text-body-2 text-capitalize">Description:</span>
          <v-spacer />
          <span class="text-subtitle-2">{{ metricDetails?.description }}</span>
        </div>
        <div class="d-flex row items-center">
          <span class="text-body-2 text-capitalize">Base Unit:</span>
          <v-spacer />
          <span class="text-subtitle-2">{{ metricDetails?.baseUnit }}</span>
        </div>
      </v-card-text>
    </v-card>

    <!-- tags -->
    <template v-if="!!metricDetails?.availableTags.length">
      <metric-tags
        :all-tags="metricDetails?.availableTags"
        :available-tags="metricDetailsValue?.availableTags"
        :selected-tags="selectedTags"
      />
    </template>

    <v-card outlined class="page-card rounded-lg" :elevation="0">
      <v-card-title class="d-flex align-center">
        <span>Measurements</span>
        <v-spacer />
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              @click="refetch"
              icon="mdi-refresh"
              :loading="isLoading"
            />
          </template>
          Refresh
        </v-tooltip>
      </v-card-title>
      <v-data-table
        :headers="measurementHeaders"
        :items="metricDetailsValue?.measurements"
        :items-per-page="-1"
        density="comfortable"
        hide-default-footer
        :loading="isLoading"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style scoped>
.page-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.v-theme--dark .page-card {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
