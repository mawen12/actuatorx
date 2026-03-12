<script setup>
import { defineAsyncComponent } from 'vue'
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import BeanDetail from './BeanDetail.vue'
import { useBeanGraphDialog } from './useBeanGraphDialog'

const BeanGraphDialog = defineAsyncComponent(() =>
  import('./BeanGraphDialog.vue')
)

const props = defineProps({
  entity: Object,
  data: Array,
  allData: Array,
  refetchHandler: Function,
})

const { openBeanGraphDialog } = useBeanGraphDialog()

const scopeColor = {
  singleton: 'blue-darken-2',
  application: 'teal-darken-2',
  session: 'cyan-darken-1',
  websocket: 'light-blue-darken-1',
  request: 'amber-darken-2',
  prototype: 'grey-darken-1',
}

const actionsHandler = (actionId, row) => {
  switch (actionId) {
    case 'showGraph':
      openBeanGraphDialog({ bean: row, allBeans: props.allData })
      break
    default:
      break
  }
}
</script>

<template>
  <table-context :entity="entity" :data="data" :all-data="allData">
    <table-custom>
      <template v-slot:item.scope="{ value, item }">
        <v-chip
          :data-row-id="item.name"
          border="opacity-40 sm"
          rounded="xl"
          :color="scopeColor[value] ?? 'grey'"
          >{{ value }}</v-chip
        >
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              size="small"
              v-bind="props"
              variant="text"
              @click.stop="(event) => actionsHandler('showGraph', item)"
            >
              <v-icon>mdi-sitemap</v-icon>
            </v-btn>
          </template>
          Show Graph
        </v-tooltip>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr class="expanded-row">
          <td :colspan="columns.length" style="padding: 0px">
            <bean-detail :item="item" />
          </td>
        </tr>
      </template>
    </table-custom>
  </table-context>

  <bean-graph-dialog />
</template>

<style scoped></style>
