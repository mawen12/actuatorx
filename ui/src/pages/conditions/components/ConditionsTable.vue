<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import ConditionDetail from './ConditionDetail.vue'

defineProps({
  entity: Object,
  data: Array,
  allData: Array,
  refetchHandler: Function,
})

const typeColor = {
  positiveMatches: 'blue-darken-2',
  negativeMatches: 'orange-darken-2',
  unconditional: 'grey-darken-1',
}
</script>

<template>
  <table-context :entity="entity" :data="data" :all-data="allData">
    <table-custom>
      <template v-slot:item.type="{ value }">
        <v-chip rounded="lg" :color="typeColor[value] ?? 'grey'">{{ value }}</v-chip>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr class="expanded-row">
          <td :colspan="columns.length" style="padding: 0px">
            <condition-detail :item="item"/>
          </td>
        </tr>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
