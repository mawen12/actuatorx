<script setup>
import {useGetHealthQuery} from '@/apis/requests/endpoints/health/getHealth'
import {computed, ref, watch} from 'vue'
import HealthComponent from './components/HealthComponent.vue'
import LoadingPage from '@/components/page/LoadingPage.vue'
import FormattedDateAndRelativeTime from '@/components/format/FormattedDateAndRelativeTime.vue'
import ErrorBoundary from '../error/ErrorBoundary.vue'

const {data, isLoading, refetch, isRefetching, isError, error} = useGetHealthQuery(
    {},
    {refetchInterval: 1000 * 60},
)

const lastUpdateTime = ref(undefined)

watch(
    isRefetching,
    () => {
      if (!isRefetching.value && !isError.value) {
        lastUpdateTime.value = Date.now()
      }
    },
    {immediate: true},
)

const flattenComponents = (components, currentPath) => {
  const flattenedArray = []

  for (const key in components) {
    const component = components[key]
    const name = key
    const path = currentPath ? `${currentPath} / ${key}` : key
    flattenedArray.push({name, ...component})

    if (component.components) {
      const childrenComponnets = flattenComponents(component.childrenComponnets, path)
      flattenedArray.push(...childrenComponnets)
    }
  }

  return flattenedArray
}
const components = computed(() =>
    data.value
        ? [
          {
            name: 'Instance',
            path: 'Instance',
            status: data.value.status,
            details: data.value.details,
          },
          ...flattenComponents(data.value.components),
        ]
        : undefined,
)
</script>

<template>
  <v-container fluid class="page-root w-md-100 w-lg-75 w-xl-50 pa-4">
    <template v-if="isLoading">
      <loading-page/>
    </template>
    <template v-else-if="isError">
      <error-boundary :error="error" :handler="refetch"/>
    </template>
    <template v-else>

      <v-card class="page-card d-flex flex-column rounded-lg" :elevation="0">
        <v-card-title>
          <div class="d-flex align-center">
            <span> Health </span>
            <v-spacer/>
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                    v-bind="props"
                    variant="text"
                    :disabled="isRefetching"
                    @click="refetch"
                    icon="mdi-refresh"
                />
              </template>
              Refresh
            </v-tooltip>
          </div>
          <v-tooltip location="bottom" class="text-subtitle-2">
            <template v-slot:activator="{ props }">
                <span v-bind="props" class="text-subtitle-2">
                  <template v-if="lastUpdateTime">
                    <formatted-date-and-relative-time :value="lastUpdateTime"/>
                  </template>
                </span>
            </template>
            Last Update time
          </v-tooltip>
        </v-card-title>

        <!-- refetch loading -->
        <v-progress-linear
            :active="isRefetching"
            :indeterminate="isRefetching"
            color="green"
            location="top"
            absolute
        ></v-progress-linear>

        <v-divider/>

        <v-card-text class="page-content">
          <div class="d-flex flex-column ga-3">
            <health-component
                v-for="(component, idx) in components"
                :key="idx"
                :component="component"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<style scoped>
.page-root {
  height: 100%;
}

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
