<script setup>
import { property } from 'lodash-es'
import { computed, ref } from 'vue'

const props = defineProps({
  row: Object,
  column: Object,
  actionsHandler: Function,
})

const loadingActionIds = ref([])

const copyIcon = (action) => {
  action
}

const actionClickHandler = async (event, actionId) => {
  event.stopPropagation()

  loadingActionIds.value = [...loadingActionIds.value, actionId]

  // await parentProps.actionsHandler(actionId, props.row)
  await props.actionsHandler(actionId, props.row)

  loadingActionIds.value = loadingActionIds.value.filter((id) => id !== actionId)
}

const isDisabled = (action) => action.isDisabled && action.isDisabled(props.row)

const isLoading = (action) => loadingActionIds.value.includes(action.id)
</script>

<template>
  <div class="d-flex items-center justify-center ga-2">
    <template v-for="action in column.actions" :key="action.id">
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            :icon="action.icon"
            :loading="isLoading(action)"
            :disabled="isDisabled(action)"
            @click="(event) => actionClickHandler(event, action.id)"
          />
        </template>
        {{ action.label }}
      </v-tooltip>
    </template>
  </div>
</template>

<style scoped></style>
