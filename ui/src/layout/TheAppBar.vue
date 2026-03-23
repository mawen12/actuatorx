<script setup>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useTheme} from 'vuetify'
import {useConnectionState} from '@/composables/useConnectionState.js'

const theme = useTheme()

const icon = computed(() =>
    theme.name.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night',
)

const {connected, drawer, resetConnectionState} = useConnectionState()

const router = useRouter()

const toConnect = () => {
  router.push('/')
  resetConnectionState()
}
</script>

<template>
  <v-app-bar flat :elevation="1">
    <template v-if="connected" v-slot:prepend>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>ActuatorX</v-app-bar-title>

    <!--  DisConnected  -->
    <template v-if="connected">
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-connection" v-bind="props" color="success" @click="toConnect"/>
        </template>
        Dis Connected
      </v-tooltip>
    </template>

    <!--  Theme  -->
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn @click="theme.toggle()" :icon="icon" v-bind="props"/>
      </template>
      Theme
    </v-tooltip>
    <!--  TODO developing  -->
    <!--    <v-tooltip location="bottom">-->
    <!--      <template v-slot:activator="{ props }">-->
    <!--        <v-btn icon="mdi-information-outline" v-bind="props"/>-->
    <!--      </template>-->
    <!--      About-->
    <!--    </v-tooltip>-->
  </v-app-bar>
</template>

<style scoped></style>
