<script setup>
import TableContext from '@/components/table/TableContext.vue'
import TableCustom from '@/components/table/TableCustom.vue'
import {threaddumpTableEntity} from "@/entities/threaddump/threaddumpTable.entity.js";
import ThreadDetail from "@/pages/threaddump/components/ThreadDetail.vue";
import {useDownloadThreaddump} from "@/apis/requests/endpoints/threaddump/downloadThreaddump.js";
import {computed, ref} from "vue";
import {useTimeoutFn} from "@vueuse/core";

defineProps({
  data: Array,
  isLoading: Boolean,
  refetch: Function,
})

const stateColor = {
  RUNNABLE: 'green',
  TIMED_WAITING: 'purple',
  WAITING: 'yellow-darken-3',
  BLOCKED: 'orange-darken-1',
}

const process = ref(0)
const {start, stop} = useTimeoutFn(() => (process.value = 0), 1500, {
  immediate: false,
})
const processIcon = computed(() => {
  switch (process.value) {
    case 0:
      return 'mdi-download'
    case 1:
      return 'mdi-loading'
    case 2:
      return 'mdi-check'
    default:
      return 'mdi-download'
  }
})

const processDesc = computed(() => {
  switch (process.value) {
    case 0:
      return 'Download'
    case 1:
      return 'Downloading...'
    case 2:
      return 'Downloaded'
    default:
      return 'Download'
  }
})

const downloadState = useDownloadThreaddump({})

const globalActionsHandler = async (actionId) => {
  switch (actionId) {
    case 'download':
      process.value = 1
      const data = await downloadState.mutateAsync({})
      const fileURL = URL.createObjectURL(data)
      const link = document.createElement('a')
      link.href = fileURL
      link.download = 'threaddump.txt'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(fileURL)
      document.body.removeChild(link)
      process.value = 2
      stop()
      start()
      break
    default:
      break
  }
}
</script>

<template>
  <table-context
      :entity="threaddumpTableEntity"
      :data="data"
      :all-data="data"
      :loading="isLoading"
      :refetch-handler="refetch"
  >
    <table-custom>
      <!--   State column   -->
      <template v-slot:item.threadState="{ value, item }">
        <v-chip
            :data-row-id="item.threadId"
            border="opacity-40 sm"
            rounded="xl"
            :color="stateColor[value] ?? 'grey'"
        >
          {{ value }}
        </v-chip>
      </template>

      <!--   Expand Detail   -->
      <template v-slot:expanded-row="{ columns, item }">
        <tr class="expanded-row">
          <td :colspan="columns.length" style="padding: 0">
            <thread-detail :item="item"/>
          </td>
        </tr>
      </template>

      <!--   Global Actions   -->
      <template v-slot:global-actions="{}">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
                @click.stop="(event) => globalActionsHandler('download')"
                variant="text"
                :loading="process === 1"
                :active="process === 2"
                :icon="processIcon"
                v-bind="props"
            />
          </template>
          {{ processDesc }}
        </v-tooltip>
      </template>
    </table-custom>
  </table-context>
</template>

<style scoped></style>
