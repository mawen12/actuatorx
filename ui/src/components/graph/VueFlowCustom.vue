<script setup>
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import {MiniMap, MiniMapNode} from '@vue-flow/minimap'
import {Controls} from '@vue-flow/controls'
import {inject, markRaw, ref, watch} from 'vue'
import CustomNode from './CustomNode.vue'

const {fitView} = useVueFlow()
const {graphData, search, isHighlight, selectedNode, incomingNodeIds, outgoingNodeIds} =
    inject('GraphContext')

const visible = ref(false)

watch([() => search.value, () => graphData.value], () => {
  if (search.value) {
    const highlightedNodes = graphData.value?.nodes.filter((node) =>
        isHighlight(search.value, node.data),
    )
    fitView({nodes: highlightedNodes.map((n) => n.id)})
  } else {
    fitView({})
  }
})

const onInit = () => {
  fitView({nodes: [...incomingNodeIds.value, ...outgoingNodeIds.value, selectedNode.value.id]})
  // fitView({})
  visible.value = false
}

const nodeClickHandler = ({node}) => {
  selectedNode.value = node
}

const paneClickHandler = () => {
  selectedNode.value = undefined
}

const nodeTypes = {
  custom: markRaw(CustomNode),
}
</script>

<template>
  <VueFlow
      :nodes="graphData.nodes"
      :edges="graphData.edges"
      :node-types="nodeTypes"
      elements-selectable
      :select-nodes-on-drag="false"
      :nodes-draggable="false"
      :nodes-connectable="false"
      @init="onInit"
      @node-click="nodeClickHandler"
      @pane-click="paneClickHandler"
      :min-zoom="0.25"
      :max-zoom="2"
      fit-view-on-init
  >
    <Background/>
    <MiniMap>
      <template #node-input="props">
        <MiniMapNode v-bind="props"/>
      </template>
    </MiniMap>
    <Controls :show-interactive="false" :data-allow-mismatch="true"/>
  </VueFlow>
</template>

<style lang="scss" scoped>
:deep(.vue-flow) {
  background-color: #fff;
  // background-color: $bg-paper;
}

:deep(.vue-flow__minimap) {
  background-color: #fff;
  // background-color: $bg-paper;
}

:deep(.vue-flow__minimap-mask) {
  fill: rgba($color:#fff, $alpha: 0.5);
  // fill: $bg-default-50;
}

:deep(.vue-flow__minimap-node) {
  fill: rgba($color:#919eab, $alpha: 0.16);
  // fill: $bg-neutral;
  stroke: none;
}

:deep(.vue-flow__controls-button) {
  background-color: #fff;
  border: 1px solid rgba($color:#00ab55, $alpha: 0.5);
  color: #00ab55;
  // background-color: $bg-paper;
  // border: 1px solid $primary-50;
  // color: $primary;
  border-radius: 8px;
  position: relative;
  fill: currentColor;
}

:deep(.vue-flow__controls-button:hover) {
  background-color: #fff;
  border: 1px solid #00ab55;
  // background-color: $bg-paper;
  // border: 1px solid $primary;
}

:deep(.vue-flow__controls-button:hover::after) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color:#00ab55, $alpha: 0.1);
  // background: $primary-10;
  border-radius: 8px;
}
</style>
