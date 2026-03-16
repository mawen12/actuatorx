<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import cronstrue from 'cronstrue/i18n'

defineProps({
  entity: Object,
  data: Array,
  allData: Array,
})
</script>

<template>
  <table-context :entity="entity" :data="data" :all-data="allData">
    <table-custom>
      <template v-slot:item.expression="{ value, item }">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <span v-bind="props" class="pa-2 rounded-lg border-sm expression">{{
                cronstrue.toString(value)
              }}</span>
          </template>
          {{ value }}
        </v-tooltip>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped>
.v-theme--dark .expression {
  background-color: #546e7a;
  color: white;
}

.expression {
  background-color: #eceff1;
  color: black;
}
</style>
