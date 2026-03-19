<script setup>
import {useStorage} from '@vueuse/core'
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useTheme} from 'vuetify'

const theme = useTheme()

const icon = computed(() =>
    theme.name.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night',
)

const connected = useStorage('connected')
const connectUrl = useStorage('connectUrl')
const drawer = useStorage('drawer', true)

const router = useRouter()

const toConnect = () => {
  router.push('/')
  connected.value = false
  connectUrl.value = null
  drawer.value = false
}
</script>

<template>
  <v-app-bar flat :elevation="1">
    <template v-if="connected" v-slot:prepend>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Actuator</v-app-bar-title>

    <template v-if="connected">
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-connection" v-bind="props" color="success" @click="toConnect"/>
        </template>
        Dis Connected
      </v-tooltip>
    </template>
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn @click="theme.toggle()" :icon="icon" v-bind="props"/>
      </template>
      Theme
    </v-tooltip>
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-information-outline" v-bind="props"/>
      </template>
      About
    </v-tooltip>
  </v-app-bar>
</template>

<style scoped></style>
