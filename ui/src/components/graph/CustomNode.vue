<script setup>
import { Handle, Position } from '@vue-flow/core'
import InlineCodeLabel from '@/components/code/InlineCodeLabel.vue'
import { computed, inject } from 'vue'

const props = defineProps({
  id: String,
  data: Object,
})

const { search, selectedNode, incomingNodeIds, outgoingNodeIds, isHighlight } =
  inject('GraphContext')

const isSelected = computed(() => selectedNode.value?.id === props.id)
const incoming = computed(() => !isSelected.value && !!incomingNodeIds.value?.includes(props.id))
const outgoing = computed(() => !isSelected.value && !!outgoingNodeIds.value?.includes(props.id))
const highlight = computed(
  () =>
    !isSelected.value &&
    !incoming.value &&
    !outgoing.value &&
    isHighlight(search.value, props.data),
)
const translucent = computed(
  () =>
    !!selectedNode.value?.id &&
    !isSelected.value &&
    !incoming.value &&
    !outgoing.value &&
    !highlight.value,
)
</script>

<template>
  <div
    class="custom-node"
    :class="{
      'custom-node--isSelected': isSelected,
      'custom-node--incoming': incoming,
      'custom-node--outgoing': outgoing,
      'custom-node--highlight': highlight,
      'custom-node--translucent': translucent,
    }"
    style="transition: all 0.4s ease"
  >
    <Handle type="target" :position="Position.Left" />
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <div
          v-bind="props"
          style="
            direction: rtl;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
          "
        >
          {{ data.label }}
        </div>
      </template>
      {{ data.fullName }}
    </v-tooltip>
    <Handle type="source" :position="Position.Right" />
    <InlineCodeLabel :code="data.package" />
  </div>
</template>

<style lang="scss" scoped>
.custom-node {
  width: 350px;
  height: 40px;
  position: relative;
  padding: 8px 10px;
  border-radius: 5px;
  background-color: rgba(#919eab, 0.1);
  color: #00ab55;
  border: 1px solid black;

  // background-color: $bg-neutral;
  // color: $text-primary;
  // border: 1px solid $divider;

  &--isSelected {
    background-color: rgba($color: #00ab55, $alpha: 0.16);
    border-color: #00ab55;
    // background-color: $primary-16;
    // border-color: $primary;
  }

  &--incoming {
    background-color: rgba($color: #ffc107, $alpha: 0.16);
    border-color: #ffc107;
    // background-color: $warning-16;
    // border-color: $warning;
  }

  &--outgoing {
    background-color: rgba($color: #ab47bc, $alpha: 0.16);
    border-color: #ab47bc;
    // background-color: $accent-16;
    // border-color: $accent;
  }

  &--highlight {
    background-color: rgba($color: #1890ff, $alpha: 0.16);
    border-color: #1890ff;
    // background-color: $info-16;
    // border-color: $info;
  }

  &--translucent {
    opacity: 0.3;
  }
}

.code {
  background: #fff;
  // background: $bg-paper;
}

:deep(.vue-flow__handle) {
  background: #00ab55;
  // background: $primary;
  width: 10px;
  height: 10px;
  border-radius: 3px;
}
</style>
