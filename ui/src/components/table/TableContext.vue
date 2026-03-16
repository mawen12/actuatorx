<script setup>
import {computed, inject, nextTick, provide, reactive, ref, watch} from 'vue'
import {debounce, isEmpty} from 'lodash-es'
import {highlightElement} from '@/utils/highlightElement'
import {useTheme} from 'vuetify'

const props = defineProps({
  entity: {
    type: Object,
    require: true,
  },
  data: {
    type: Array,
  },
  allData: {
    type: Array,
  },
  loading: {
    type: Boolean,
  },
  refetchHandler: {
    type: Function,
  },
  actionsHandler: {
    type: Function,
  },
  massActionsHandler: {
    type: Function,
  },
  globalActionsHandler: {
    type: Function,
  },
})

const tableRef = ref(undefined)
const search = ref('')
const customFilters = reactive({})
const selected = ref([])
const expanded = ref([])

const itemPerPageOptions = [
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
]

const page = ref(1)

const itemsPerPage = ref(25)

const tableAllData = computed(() => props.allData ?? [])

const tableData = computed(() => props.data ?? [])

const filteredTableData = computed(() =>
    search.value || customFilters
        ? props.entity.filterData(tableData.value, search.value, customFilters)
        : tableData.value,
)

const displayTableData = computed(() =>
    props.entity.paging
        ? filteredTableData.value.slice(
            page.value,
            itemsPerPage.value,
            page.value * itemsPerPage.value + itemsPerPage.value,
        )
        : filteredTableData.value,
)
const empty = computed(() => !props.loading && !filteredTableData.value.length)
const selectedRows = computed(() => selected.value)
const hasSelectedRows = computed(() => !isEmpty(selectedRows.value))
const clearSelectedRows = () => {
  selected.value = []
}

const expandedRows = computed(() => expanded.value)
const hasActions = computed(() => !isEmpty(props.entity.actions))
const hasDetailsRowAction = computed(() => props.entity.rowAction?.type === 'Details')
const hasMassActions = computed(() => !isEmpty(props.entity.massActions))
const hasGlobalActions = computed(() => !isEmpty(props.entity.globalActions))

const closeAllRowsHandler = () => (expanded.value = [])
const changeCustomFiltersHandler = (newCustomFilters) => {
  customFilters.value = newCustomFilters
  page.value = 1
}
const clearFiltersHandler = () => {
  search.value = ''
  customFilters.value = {}
  page.value = 1
}

const snackbar = ref(false)
const snackbarContent = ref('')
const theme = useTheme()
const highlightAnchor = ref('')
const delayedAnchor = ref('')
const {search: tabsSearch} = inject('tabsContext', {})

const highlightHandler = async (anchor) => {
  if (!props.entity.getAnchor) return

  const anchorIndex = filteredTableData.value.findIndex(
      (row) => props.entity.getAnchor(row) === anchor,
  )
  if (anchorIndex < 0) {
    const allDataAnchorIndex = tableAllData.value.findIndex(
        (row) => props.entity.getAnchor(row) === anchor,
    )
    if (allDataAnchorIndex >= 0) {
      console.log('Selected item is filtered')
      snackbar.value = true
      snackbarContent.value = 'Selected item is filtered'
      highlightAnchor.value = anchor
    } else {
      console.log('Selected item is not available')
      snackbar.value = true
      snackbarContent.value = 'Selected item is not available'
      highlightAnchor.value = anchor
    }
    return
  }

  const anchorPage = Math.floor(anchorIndex / itemsPerPage.value) + 1
  if (anchorPage !== page.value) {
    page.value = anchorPage
  }

  await nextTick()

  const el = tableRef.value.$el.querySelector(`span[data-row-id='${anchor}']`)
  const target = el?.closest('tr')
  if (target) {
    target.scrollIntoView({behavior: 'smooth', block: 'center'})
    highlightElement(target, theme.name.value === 'dark' ? '#689f38' : '#dcedc8')
  }
}

watch(
    () => delayedAnchor.value,
    debounce((val) => {
      if (val) {
        highlightHandler(val)
        delayedAnchor.value = undefined
      }
    }, 500),
)

const resetFilterAndHighlight = () => {
  snackbar.value = false
  search.value = ''
  tabsSearch.value = ''
  delayedAnchor.value = highlightAnchor.value
}

provide('tableContext', {
  parentProps: props,
  tableRef,
  search,
  customFilters,
  changeCustomFiltersHandler,
  clearFiltersHandler,
  page,
  itemsPerPage,
  itemPerPageOptions,
  selected,
  selectedRows,
  hasSelectedRows,
  clearSelectedRows,
  expanded,
  expandedRows,
  closeAllRowsHandler,
  highlightHandler,
  tableData,
  filteredTableData,
  displayTableData,
  empty,
  hasActions,
  hasDetailsRowAction,
  hasMassActions,
  hasGlobalActions,
})
</script>

<template>
  <slot></slot>
  <v-snackbar v-model="snackbar" location="top right" timeout="-1" :elevation="0" rounded="lg">
    <div class="d-flex align-center ga-2">
      <v-icon size="x-large" color="primary" icon="mdi-information-outline"></v-icon>
      <span class="text-warning text-center"> {{ snackbarContent }}</span>
    </div>

    <template v-slot:actions>
      <v-btn variant="outlined" color="info" rounded="lg" @click="resetFilterAndHighlight()">
        Clear Filters
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
:deep(.v-snackbar--variant-elevated) {
  background: white !important;
}
</style>
