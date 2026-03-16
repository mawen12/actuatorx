<script setup>
import TabsLazyContext from './TabsLazyContext.vue'
import TabsCommonContext from './TabsCommonContext.vue'
import LoadingPage from '../page/LoadingPage.vue'

const props = defineProps({
  entity: {
    type: Object,
    required: true,
  },
  data: {
    type: [Object, Array],
  },
  loading: {
    type: Boolean,
  },
  refetchHandler: {
    type: Function,
  },
})
</script>

<template>
  <template v-if="entity.lazy">
    <template v-if="loading">
      <loading-page :loading="loading"/>
    </template>
    <template v-else>
      <tabs-lazy-context v-bind="props">
        <slot/>
      </tabs-lazy-context>
    </template>
  </template>
  <template v-else>
    <tabs-common-context v-bind="props">
      <slot/>
    </tabs-common-context>
  </template>
</template>

<style scoped></style>
