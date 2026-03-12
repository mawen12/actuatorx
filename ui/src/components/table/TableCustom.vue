<script setup>
import { inject, useSlots } from 'vue'
import TableToolbar from './TableToolbar.vue'

const {
  parentProps,
  tableRef,
  page,
  itemsPerPage,
  itemPerPageOptions,
  selected,
  expanded,
  visibleColumns,
  filteredTableData,
  closeAllRowsHandler,

  hasActions,
  hasDetailsRowAction,
  hasMassActions,
  hasGlobalActions,
} = inject('tableContext')

const slots = useSlots()

const rowProps = ({ item }) => {
  const isExpanded = expanded.value.includes(item[parentProps.entity.itemValue])

  return {
    class: {
      'row-expanded': isExpanded,
    },
  }
}
</script>

<template>
  <v-card class="page-card rounded-lg">
    <template v-if="parentProps.entity.showToolbar">
      <table-toolbar>
        <template #global-actions="slotProps">
          <slot name="global-actions" v-bind="slotProps" />
        </template>
      </table-toolbar>
    </template>

    <v-data-table
      ref="tableRef"
      fixed-header
      :row-props="rowProps"
      :headers="parentProps.entity.headers"
      :items="filteredTableData"
      item-key="name"
      :item-value="parentProps.entity.itemValue"
      v-model="selected"
      :show-select="hasMassActions"
      v-model:expanded="expanded"
      :show-expand="hasDetailsRowAction"
      :expand-on-click="hasDetailsRowAction"
      density="comfortable"
      hover
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      :items-per-page-options="itemPerPageOptions"
      class="data-table"
    >
      <template v-slot:header.data-table-expand="{}">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon size="small" variant="text" @click="closeAllRowsHandler">
              <!-- <v-icon icon="mdi-chevron-double-right"> </v-icon> -->
              <v-icon icon="mdi-arrow-collapse-vertical"></v-icon>
            </v-btn>
          </template>
          Collapse All
        </v-tooltip>
      </template>

      <template v-slot:item.data-table-expand="{ internalItem, toggleExpand, isExpanded }">
        <v-btn icon size="small" variant="text" @click.stop="toggleExpand(internalItem)">
          <v-icon>
            {{ isExpanded(internalItem) ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
          </v-icon>
        </v-btn>
      </template>

      <template v-if="hasDetailsRowAction" v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <v-sheet round="lg" border>
              <!-- <component :is="parentProps.entity.rowAction.component" :item="item" /> -->
              <h1>{{ item }}</h1>
            </v-sheet>
          </td>
        </tr>
      </template>

      <template v-for="(_, slotName) in slots" #[slotName]="slotProps">
        <template v-if="slotName !== 'global-actions'">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </template>
    </v-data-table>
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

.data-table {
  flex: 1;
  overflow: auto !important;
}

:deep(.v-card-text) {
  flex: 0;
}

:deep(.row-expanded) {
  background-color: #dcedc8;
}

:deep(.v-theme--dark .row-expanded) {
  background-color: #689f38;
}

:deep(
  .v-table.v-table--hover > .v-table__wrapper > table > tbody > tr.expanded-row:hover td::after
) {
  background: transparent !important;
}
</style>
