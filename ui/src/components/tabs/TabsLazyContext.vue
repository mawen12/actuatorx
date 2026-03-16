<script setup>
import {computed, provide, reactive, ref} from 'vue'

const props = defineProps({
  entity: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
  },
  data: {
    type: [Object, Array],
  },
  refetchHandler: {
    type: Function,
  },
})

const search = ref('')
const customFilters = reactive({})

const tabs = computed(() => props.entity.getTabs(props.data))

const enableSearch = computed(() => props.entity.showSearchToolbar)

const hasTabs = computed(() => tabs.value?.length > 0)

const firstTab = computed(() => (hasTabs.value ? tabs.value[0] : undefined))

const currentTab = ref(hasTabs.value ? firstTab.value.id : undefined)

const tabsData = computed(() => props.data ?? {})

const filteredTabsData = computed(() =>
    enableSearch.value && (search.value || customFilters.value)
        ? props.entity.filterData(tabsData.value, search.value, customFilters)
        : tabsData.value,
)

const changeCustomFiltersHandler = (newCustomFilters) => {
  customFilters.value = newCustomFilters
}

provide('tabsContext', {
  parentProps: props,
  currentTab,
  tabs,
  search,
  tabsData,
  filteredTabsData,
  customFilters,
  changeCustomFiltersHandler,
})
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
