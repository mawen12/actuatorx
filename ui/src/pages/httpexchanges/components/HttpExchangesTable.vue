<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import {httpExchangesTableEntity} from '@/entities/httpexchanges/httpExchangesTable.entity'
import HttpExchangeDetail from './HttpExchangeDetail.vue'
import {formatInterval} from '@/utils/formatUtils'

defineProps({
  data: Array,
  isLoading: Boolean,
  refetch: Function,
})
</script>

<template>
  <table-context
      :entity="httpExchangesTableEntity"
      :data="data"
      :all-data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <table-custom>
      <template v-slot:item.cost="{ value, item }">
        {{ formatInterval(value) }}
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr class="expanded-row">
          <td :colspan="columns.length" style="padding: 0px">
            <http-exchange-detail :item="item"/>
          </td>
        </tr>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
