<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'

defineProps({
  entity: Object,
  data: Array,
  allData: Array,
})
</script>

<template>
  <table-context :entity="entity" :data="data" :all-data="allData">
    <table-custom> </table-custom>
  </table-context>
</template>

<style scoped></style>
