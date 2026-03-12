<script setup>
import { useBeanGraphDialog, beanGraphDialogState as state } from './useBeanGraphDialog'
import GraphContext from '@/components/graph/GraphContext.vue'
import GraphComponent from '@/components/graph/GraphComponent.vue'
import { computed } from 'vue'
import { chain, uniqBy } from 'lodash-es'
import { getIncomingNodes, getOutgoingNodes } from '@/utils/vueflowUtils'

const { closeBeanGraphDialog } = useBeanGraphDialog()

const bean = computed(() => state.data.bean)
const allBeans = computed(() => state.data.allBeans)

const edges = computed(() =>
  chain(allBeans.value)
    .uniqBy((b) => b.name)
    .map((b) =>
      b.dependencies
        .filter((d) => !!allBeans.value?.find((innerBean) => innerBean.name === d))
        .map((d) => ({
          id: `${d}_${b.name}`,
          source: d,
          target: b.name,
        })),
    )
    .flatten()
    .value(),
)

const nodes = computed(() =>
  chain(allBeans.value)
    .uniqBy((b) => b.name)
    .map((b) => ({
      id: b.name.toString(),
      data: {
        label: b.shortName,
        package: b.package,
        fullName: `${b.package}.${b.shortName}`,
      },
      position: {
        x: 0,
        y: 0,
      },
      type: 'custom',
    }))
    .value(),
)

const initialSelectedNode = computed(() => nodes.value.find((n) => n.id === bean.value.name))

const connectedNodes = computed(() =>
  uniqBy(
    [
      ...getIncomingNodes(bean.value.name, nodes.value, edges.value),
      ...getOutgoingNodes(bean.value.name, nodes.value, edges.value),
    ],
    (n) => n.id,
  ),
)

const connectedEdges = computed(() =>
  edges.value.filter(
    (edge) =>
      !!connectedNodes.value.find((n) => n.id === edge.source) &&
      !!connectedNodes.value.find((n) => n.id === edge.target),
  ),
)
</script>

<template>
  <!-- disable transition 用于稳定展示 edge 与 node -->
  <v-dialog v-model="state.visible" fullscreen transition="none" style="margin: 64px">
    <!-- <v-container style="height: 100%; max-height: 100%; width: 100%; max-width: 100%"> -->
    <v-card
      class="dialog-card rounded-lg"
      style="height: 100%; max-height: 100%; width: 100%; max-width: 100%"
    >
      <v-card-title class="d-flex align-center" :elevation="0">
        <span>
          {{ state.title }}
        </span>
        <v-spacer />

        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              icon="mdi-close"
              @click.stop="closeBeanGraphDialog()"
            />
          </template>
          Close
        </v-tooltip>
      </v-card-title>

      <v-card-text class="page-content pa-0">
        <GraphContext
          :nodes="connectedNodes"
          :edges="connectedEdges"
          :initial-selected-node="initialSelectedNode"
        >
          <GraphComponent />
        </GraphContext>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.dialog-card {
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;

  overflow-y: auto;
}

.flow-container {
  width: 100%;
  height: 100%;
  min-height: 0; /* ⚠️ flex 子元素必加 */
}

.v-card {
  height: 100%;
}
</style>
