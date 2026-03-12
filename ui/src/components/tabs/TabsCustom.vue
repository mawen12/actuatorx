<script setup>
import { computed, inject, watch } from 'vue'
import TabsToolbar from './TabsToolbar.vue'
import { useMemoize } from '@vueuse/core'

const { parentProps, currentTab, tabs, filteredTabsData, tabsData, search } = inject('tabsContext')

const getTabData = (tab) => tab.getTabData(filteredTabsData.value)

const getTabAllData = (tab) => tab.getTabData(tabsData.value)

const showOnlyOneTab = computed(() => parentProps.entity.showOnlyOneTab)

const showToolbar = computed(() => parentProps.entity.showSearchToolbar)

const dataLengthCache = useMemoize((tab) => {
  return getTabData(tab)?.length ?? 0
})

const dataCountCache = (tab) => {
  const length = dataLengthCache(tab)
  return length <= 99 ? length : '99+'
}

watch(
  filteredTabsData,
  () => {
    dataLengthCache.clear()
  },
  { immediate: true },
)
</script>

<template>
  <v-card class="page-card rounded-lg">
    <template v-if="showToolbar">
      <tabs-toolbar />
    </template>

    <div style="flex: 1; overflow: hidden; display: flex; flex-direction: column">
      <template v-if="tabs.length > 1 || showOnlyOneTab">
        <v-tabs color="primary" v-model="currentTab">
          <template v-for="(tab, idx) in tabs" :key="idx">
            <template v-if="tab.componentType === 'Table'">
              <v-badge
                bordered
                location="top right"
                :color="dataLengthCache(tab) > 0 ? 'success' : 'warning'"
                :content="dataCountCache(tab)"
                :offset-y="8"
              >
                <v-tab :value="tab.name" class="text-none" :disabled="dataLengthCache(tab) === 0">
                  {{ tab.name }}
                </v-tab>
              </v-badge>
            </template>
            <template v-else>
              <v-tab :value="tab.name" class="text-none">
                {{ tab.name }}
              </v-tab>
            </template>
          </template>
        </v-tabs>

        <v-tabs-window v-model="currentTab" style="flex: 1; overflow: hidden">
          <v-tabs-window-item
            v-for="(tab, idx) in tabs"
            :key="idx"
            :value="tab.name"
            class="data-tab"
          >
            <component
              :is="tab.component"
              :entity="tab.entity"
              :data="getTabData(tab)"
              :all-data="getTabAllData(tab)"
              :refetchHandler="parentProps.refetchHandler"
            />
          </v-tabs-window-item>
        </v-tabs-window>
      </template>
      <template v-else>
        <component
          :is="tabs[0].component"
          :entity="tabs[0].entity"
          :data="getTabData(tabs[0])"
          :all-data="getTabAllData(tabs[0])"
          :refetchHandler="parentProps.refetchHandler"
        />
      </template>
    </div>
  </v-card>
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

.data-tab {
  height: 100%;

  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.v-window__container) {
  height: 100%;
}
</style>
