<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import ConfigPropertyCode from './ConfigPropertyCode.vue'
import { useCopyFeedback } from '@/composables/useCopyFeedback'

const props = defineProps({
  entity: Object,
  data: Array,
  allData: Array,
  refetchHandler: Function,
})

const { copyItem, isCopied } = useCopyFeedback({
  timeout: 1500,
  getKey: (item) => item[props.entity.itemValue],
})
</script>

<template>
  <table-context :entity="entity" :data="data" :all-data="allData">
    <table-custom>
      <template v-slot:item.file="{ value, item }">
        <span>{{ value }}</span>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              size="small"
              v-bind="props"
              :active="isCopied(item)"
              variant="text"
              :icon="isCopied(item) ? 'mdi-check' : 'mdi-content-copy'"
              @click.stop="(event) => copyItem(value, item)"
            />
          </template>
          {{ isCopied(item) ? 'Copied' : 'Copy' }}
        </v-tooltip>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr class="expanded-row">
          <td :colspan="columns.length" style="padding: 0px">
            <config-property-code :data="item" />
          </td>
        </tr>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
