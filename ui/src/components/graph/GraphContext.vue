<script setup>
import { ref, watch, computed, provide } from 'vue'
import { getIncomers, getOutgoers, MarkerType } from '@vue-flow/core'
import { getLayoutElements } from '@/utils/vueflowUtils'
import { isEmpty } from 'lodash-es'
import colors from 'vuetify/util/colors'

const props = defineProps({
  nodes: Array,
  edges: Array,
  initialSelectedNode: Object,
})

const search = ref('')
const selectedNode = ref(props.initialSelectedNode)
const incomingNodeIds = ref(undefined)
const outgoingNodeIds = ref(undefined)
const layoutData = ref(undefined)

watch(
  [() => props.nodes, () => props.edges],
  async ([nodes, edges]) => {
    if (nodes && edges) {
      layoutData.value = await getLayoutElements(nodes, edges)
    }
  },
  {
    immediate: true,
  },
)

const graphData = computed(() => {
  if (!layoutData.value) return

  return {
    nodes: layoutData.value.nodes,
    edges: layoutData.value.edges.map((edge) => {
      // 是否为目标端点
      const isTarget = selectedNode.value?.id === edge.target
      // 是否为开始端点
      const isSource = selectedNode.value?.id === edge.source
      const isRelated = !selectedNode.value || isTarget || isSource

      return {
        ...edge,
        animated: isRelated,
        intersectionWith: 0,
        markerEnd: {
          type: MarkerType.Arrow,
          color: isTarget ? colors.yellow.base : isSource ? colors.purple.base : '',
          width: 15,
          height: 20,
        },
        style: {
          transition: 'all 0.4s ease',
          PointerEvents: 'none',
          ...(edge.style ?? {}),
          ...(!!selectedNode.value && !isRelated ? { opacity: 0.3 } : {}),
          // ...(isTarget
          //   ? { stroke: changeAlpha(getPaletteColor('warning'), 0.5), strokeWidth: 2 }
          //   : {}),
          // ...(isSource
          //   ? { stroke: changeAlpha(getPaletteColor('accent'), 0.5), strokeWidth: 2 }
          //   : {}),
          ...(isTarget ? { stroke: colors.yellow.base, strokeWidth: 2 } : {}),
          ...(isSource ? { stroke: colors.purple.base, strokeWidth: 2 } : {}),
        },
      }
    }),
  }
})

const loading = computed(() => !graphData.value)
const empty = computed(() => !!graphData.value && isEmpty(graphData.value.nodes))

const isHighlight = (searchString, data) =>
  !!searchString && data.label.toLowerCase().indexOf(searchString.toLowerCase()) !== -1

watch(
  [() => selectedNode.value, () => graphData.value],
  () => {
    if (!selectedNode.value || !graphData.value) {
      incomingNodeIds.value = undefined
      outgoingNodeIds.value = undefined
      return
    }

    incomingNodeIds.value = getIncomers(
      selectedNode.value,
      graphData.value.nodes,
      graphData.value.edges,
    ).map((n) => n.id)

    outgoingNodeIds.value = getOutgoers(
      selectedNode.value,
      graphData.value.nodes,
      graphData.value.edges,
    ).map((n) => n.id)
  },
  {
    immediate: true,
  },
)

provide('GraphContext', {
  graphData,
  loading,
  empty,
  search,
  selectedNode,
  incomingNodeIds,
  outgoingNodeIds,
  isHighlight,
})
</script>

<template>
  <slot />
</template>

<style scoped></style>
