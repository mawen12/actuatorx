<script setup>
import { ref, inject } from 'vue'

const { parentProps, refetchHandler, search, changeCustomFiltersHandler, hasGlobalActions } =
  inject('tabsContext')

const loadingActionIds = ref([])

const isLoading = (action) => loadingActionIds.value.includes(action.id)

const globalActionClickHandler = async (event, actionId) => {
  event.stopPropagation()

  loadingActionIds.value = [...loadingActionIds.value, actionId]

  await parentProps.globalActionsHandler(actionId)

  loadingActionIds.value = loadingActionIds.value.filter((id) => id !== actionId)
}
</script>

<template>
  <v-card-title class="d-flex ga-2 align-center">
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      autocomplete="suppress"
      rounded="lg"
      hide-details
      single-line
      clearable
    >
    </v-text-field>

    <template v-if="parentProps.entity.customFilterComponent">
      <component
        :is="parentProps.entity.customFilterComponent"
        :on-change="changeCustomFiltersHandler"
      />
    </template>

    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn @click="refetchHandler" variant="text" icon="mdi-refresh" v-bind="props" />
      </template>
      Refresh
    </v-tooltip>
  </v-card-title>
</template>

<style scoped></style>
