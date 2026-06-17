<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import {togglzTableEntity} from "@/entities/togglz/togglzTable.entity.js";
import TogglzDetail from "@/pages/togglz/components/TogglzDetail.vue";
import {computed, ref} from "vue";
import {useTimeoutFn} from "@vueuse/core";
import {useUpdateInstanceTogglzFeature} from "@/apis/requests/endpoints/togglz/updateInstanceTogglzFeature.js";

defineProps({
  data: Array,
  isLoading: Boolean,
  refetch: Function,
})

const updateTogglz = useUpdateInstanceTogglzFeature({})

const cleaned = ref(undefined)
const isCleaned = (item) => cleaned.value === item.name
const actionsHandler = async (event, item) => {
  try {
    cleaned.value = item.name
    await updateTogglz.mutateAsync({instanceId: item.name, enabled: !item.enabled})
  } finally {
    cleaned.value = undefined
  }
}
</script>

<template>
  <table-context
      :entity="togglzTableEntity"
      :data="data"
      :all-data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <table-custom>
      <!--   Expand Detail   -->
      <!-- <template v-slot:expanded-row="{ columns, item }">
        <tr class="expanded-row">
          <td :colspan="columns.length" style="padding: 0">
            <togglz-detail :item="item"/>
          </td>
        </tr>
      </template> -->

      <template v-slot:item.actions="{ item }">
        <v-switch 
          :model-value="item.enabled" 
          color="primary"
          size="small" 
          class="d-flex align-center justify-center" 
          :loading="isCleaned(item)"
          @click.stop="(event) => actionsHandler(event, item)"
        >
        </v-switch>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
