<script setup>
import {computed, inject, ref} from 'vue'

const props = defineProps({
  props: Object,
  selected: Boolean,
})

const {
  parentProps,
  selectedRows,
  closeAllRowsHandler,
  hasDetailsRowAction,
  clearSelectedRows,
  hasMassActions,
  hasSelectedRows,
} = inject('tableContext')

const emit = defineEmits(['update:selected'])

const loadingActionIds = ref([])

const isLoading = (action) => loadingActionIds.value.includes(action.id)

const massActionsHandler = async (event, actionId) => {
  event.stopPropagation()

  loadingActionIds.value = [...loadingActionIds.value, actionId]

  await parentProps.massActionsHandler(actionId, selectedRows.value, clearSelectedRows)

  loadingActionIds.value = loadingActionIds.value.filter((id) => id !== actionId)
}

const isAllSelected = computed({
  get() {
    return props.selected
  },
  set(newValue) {
    emit('update:selected', newValue)
  },
})

const slotProps = computed(() => props.props)
</script>

<template>
  <q-tr
      :props="slotProps"
      :style="{
      position: 'relative',
      background: hasSelectedRows ? 'linear-gradient(to right, #f2f2f2, #e6eef7, #dbe9f6)' : null,
    }"
  >
    <!--  Selected Header  -->
    <template v-if="hasMassActions">
      <!-- <q-th
        :style="{
          width: '72px',
          backgroundColor: hasSelectedRows ? 'var(--q-table-header-bg)' : 'white',
        }"
      >
        <q-checkbox v-model="isAllSelected" />
      </q-th> -->
    </template>

    <!--  Expand Header  -->
    <template v-if="hasDetailsRowAction">
      <!-- <q-th style="width: 64px">
        <icon-button icon="unfold_less_double" :on-click="closeAllRowsHandler" />
      </q-th> -->

      <v-btn icon size="small" variant="text" @click="closeAllRowsHandler">
        <v-icon icon="mdi-chevron-double-right"></v-icon>
      </v-btn>
    </template>

    <!--  Data Headers & Actions Header  -->
    <!-- <q-th v-for="col in slotProps.cols" :key="col.name" :props="slotProps">
      <span :style="col.customStyle">
        {{ col.label }}
      </span>
    </q-th> -->


    <!-- <template v-if="hasSelectedRows">
      <q-th
        style="
          width: calc(100% - 72px);
          background: linear-gradient(to right, #f2f2f2, #e6eef7, #dbe9f6);
        "
        class="my-th row q-gutter-md"
      >
        <div class="row items-center justify-end q-gutter-x-md" style="width: 100%">
          <icon-button
            v-for="action in parentProps.entity.massActions"
            :key="action.id"
            size="md"
            :icon="action.icon"
            :loading="isLoading(action)"
            :tooltip="action.label"
            :on-click="(event) => massActionsHandler(event, action.id)"
          />
        </div>
      </q-th>
    </template> -->
  </q-tr>
</template>

<style scoped>
:deep(.my-th) {
  position: absolute;
  bottom: 0;
  right: 0;
  pointer-events: auto;
}
</style>
