<script setup>
import {computed, provide, reactive, ref} from 'vue'
import LoadingPage from '../page/LoadingPage.vue'

const props = defineProps({
  entity: {
    type: Object,
    required: true,
  },
  data: {
    type: [Object, Array],
  },
  loading: {
    type: Boolean,
  },
  refetchHandler: {
    type: Function,
  },
})

const search = ref('')
const customFilters = reactive({})

const tabs = computed(() => props.entity.tabs)

const enableSearch = computed(() => props.entity.showSearchToolbar)

const firstTab = computed(() => tabs.value[0])

const currentTab = ref(firstTab.value.id)

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
  <template v-if="loading">
    <loading-page/>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<style scoped></style>
