<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import {useCopyFeedback} from '@/composables/useCopyFeedback'

const props = defineProps({
  entity: Object,
  data: Array,
  allData: Array,
})

const {copyItem, isCopied} = useCopyFeedback({
  timeout: 1500,
  getKey: (item) => item[props.entity.itemValue],
})

const getPropertyString = (property) => `${property.name}=${property.value}`

const actionsHandler = async (actionId, row) => {
  switch (actionId) {
    case 'copy':
      await copyItem(getPropertyString(row), row)
      break
    default:
      break
  }
}
</script>

<template>
  <table-context
      :entity="entity"
      :data="data"
      :all-data="allData"
      :actions-handler="actionsHandler"
  >
    <table-custom>
      <template v-slot:item.actions="{ item }">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
                size="small"
                v-bind="props"
                :active="isCopied(item)"
                variant="text"
                :icon="isCopied(item) ? 'mdi-check' : 'mdi-content-copy'"
                @click.stop="(event) => actionsHandler('copy', item)"
            />
          </template>
          {{ isCopied(item) ? 'Copied' : 'Copy Property' }}
        </v-tooltip>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
