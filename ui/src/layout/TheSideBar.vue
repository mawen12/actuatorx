<script setup>
import {computed, ref} from 'vue'
import {useStorage} from '@vueuse/core'

const connected = useStorage('connected')
const drawer = useStorage('drawer', true)

const search = ref('')
const items = ref([
  {
    title: 'Health',
    value: 'health',
    props: {
      prependIcon: 'mdi-heart-pulse',
      to: '/health',
    },
  },
  {
    title: 'Metrics',
    value: 'metrics',
    props: {
      prependIcon: 'mdi-chart-line',
      to: '/metrics',
    },
  },
  // TODO developing
  // {
  //   title: 'Info',
  //   value: 'info',
  //   props: {
  //     prependIcon: 'mdi-information',
  //     to: '/info',
  //   },
  // },
  {
    title: 'Env',
    value: 'env',
    props: {
      prependIcon: 'mdi-earth',
      to: '/env',
    },
  },
  {
    title: 'Beans',
    value: 'beans',
    props: {
      prependIcon: 'mdi-cube-outline',
      to: '/beans',
    },
  },
  {
    title: 'Conditions',
    value: 'conditions',
    props: {
      prependIcon: 'mdi-tune',
      to: '/conditions',
    },
  },
  {
    title: 'Configprops',
    value: 'configprops',
    props: {
      prependIcon: 'mdi-file-settings',
      to: '/configprops',
    },
  },
  {
    title: 'Caches',
    value: 'caches',
    props: {
      prependIcon: 'mdi-database',
      to: '/caches',
    },
  },
  {
    title: 'Loggers',
    value: 'loggers',
    props: {
      prependIcon: 'mdi-script-text',
      to: '/loggers',
    },
  },
  // TODO developing
  // {
  //   title: 'Logfile',
  //   value: 'logfile',
  //   props: {
  //     prependIcon: 'mdi-post',
  //     to: '/logfile',
  //   },
  // },
  {
    title: 'Mappings',
    value: 'mappings',
    props: {
      prependIcon: 'mdi-map',
      to: '/mappings',
    },
  },
  {
    title: 'Http Exchanges',
    value: 'httpexchanges',
    props: {
      prependIcon: 'mdi-web',
      to: '/httpexchanges',
    },
  },
  {
    title: 'Scheduled Tasks',
    value: 'scheduled-tasks',
    props: {
      prependIcon: 'mdi-clock-outline',
      to: '/scheduled-tasks',
    },
  },
  // TODO developing
  // {
  //   title: 'Sessions',
  //   value: 'sessions',
  //   props: {
  //     prependIcon: 'mdi-account-group',
  //   },
  // },
  {
    title: 'Thread dump',
    value: 'threaddump',
    props: {
      prependIcon: 'mdi-chart-box',
      to: '/threaddump',
    },
  },
  //  TODO developing
  // {
  //   title: 'Shutdown',
  //   value: 'shutdown',
  //   props: {
  //     prependIcon: 'mdi-power',
  //   },
  // },
  // TODO developing
  // {
  //   title: 'Startup',
  //   value: 'startup',
  //   props: {
  //     prependIcon: 'mdi-rocket',
  //   },
  // },
  {
    title: 'Heap dump',
    value: 'head dump',
    props: {
      prependIcon: 'mdi-memory',
    },
  },
  // TODO Developing
  // {
  //   title: 'Prometheus',
  //   value: 'prometheus',
  //   props: {
  //     prependIcon: 'mdi-finance',
  //   },
  // },
])
const filteredItems = computed(() => {
  if (search.value && search.value !== '') {
    return items.value.filter((item) => item.title.includes(search.value))
  }
  return items.value
})
</script>

<template>
  <template v-if="connected">
    <v-navigation-drawer v-model="drawer" permanent width="240">
      <v-sheet class="drawer-root">
        <v-sheet class="pa-2">
          <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              label="Filter"
              variant="outlined"
              active-strategy="single-leaf"
              hide-details
              single-line
              clearable
          ></v-text-field>
        </v-sheet>

        <v-list :items="filteredItems" color="primary" dense="compact" nav class="drawer-list">
        </v-list>

        <v-divider/>

        <v-card height="120" class="mt-2" variant="tonal">
          <v-card-title> Summary</v-card-title>
          <v-card-text> Fixed height content</v-card-text>
        </v-card>
      </v-sheet>
    </v-navigation-drawer>
  </template>
</template>

<style scoped>
.drawer-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* padding: 8px; */
}

.drawer-list {
  flex: 1;
  overflow-y: auto !important;
}
</style>
