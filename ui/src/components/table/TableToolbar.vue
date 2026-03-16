<script setup>
import {inject, ref} from 'vue'

const {parentProps, refetchHandler, search, changeCustomFiltersHandler, hasGlobalActions} =
    inject('tableContext')

const loadingActionIds = ref([])

const isLoading = (action) => loadingActionIds.value.includes(action.id)

const globalActionsHandler = async (event, actionId) => {
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

    <slot name="global-actions"/>
    <!-- <template v-if="hasGlobalActions">
      <template v-for="action in parentProps.entity.globalActions" :key="action.id">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              @click="(event) => globalActionsHandler(event, action.id)"
              variant="text"
              :icon="action.icon"
              v-bind="props"
              :loading="isLoading(action)"
            />
          </template>
          {{ action.label }}
        </v-tooltip>
      </template>
    </template> -->

    <template v-if="parentProps.entity.customFilterComponent">
      <component
          :is="parentProps.entity.customFilterComponent"
          :on-change="changeCustomFiltersHandler"
      />
    </template>

    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn @click="refetchHandler" variant="text" icon="mdi-refresh" v-bind="props"/>
      </template>
      Refresh
    </v-tooltip>
  </v-card-title>
</template>

<style scoped></style>
