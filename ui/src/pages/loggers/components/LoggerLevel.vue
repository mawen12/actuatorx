<script setup>
import {computed, ref, watch} from 'vue'
import {useSetLoggerLevel} from '@/apis/requests/endpoints/loggers/setLoggerLevels'

const props = defineProps({
  item: Object,
})

const level = ref(undefined)

watch(
    () => props.item,
    (item) => {
      level.value = item.configuredLevel ? item.configuredLevel : item.effectiveLevel
    },
    {immediate: true, deep: true},
)

const isShadow = computed(() => !props.item.configuredLevel)

const setLoggerLevelState = useSetLoggerLevel({})

const setLoggerLevelHandler = async (newLevel) => {
  await setLoggerLevelState.mutateAsync({loggerName: props.item.name, level: newLevel})
}
</script>

<template>
  <v-btn-toggle
      v-model="level"
      @update:model-value="setLoggerLevelHandler"
      density="compact"
      border="opacity-50 sm"
      rounded="lg"
      divided
      variant="text"
      mandatory
  >
    <v-btn
        value="TRACE"
        color="purple"
        :class="[
        isShadow && level === 'TRACE' ? 'text-purple-lighten-3' : '',
        !isShadow && level === 'TRACE' ? 'font-weight-bold' : '',
      ]"
    >TRACE
    </v-btn
    >
    <v-btn
        value="DEBUG"
        color="blue"
        :class="[
        isShadow && level === 'DEBUG' ? 'text-blue-lighten-3' : '',
        !isShadow && level === 'DEBUG' ? 'font-weight-bold' : '',
      ]"
    >DEBUG
    </v-btn
    >
    <v-btn
        value="INFO"
        color="green"
        :class="[
        isShadow && level === 'INFO' ? 'text-green-lighten-3' : '',
        !isShadow && level === 'INFO' ? 'font-weight-bold' : '',
      ]"
    >INFO
    </v-btn
    >
    <v-btn
        value="WARN"
        color="amber"
        :class="[
        isShadow && level === 'WARN' ? 'text-amber-lighten-3' : '',
        !isShadow && level === 'WARN' ? 'font-weight-bold' : '',
      ]"
    >WARN
    </v-btn
    >
    <v-btn
        value="ERROR"
        color="red"
        :class="[
        isShadow && level === 'ERROR' ? 'text-red-lighten-3' : '',
        !isShadow && level === 'ERROR' ? 'font-weight-bold' : '',
      ]"
    >ERROR
    </v-btn
    >
    <v-btn
        value="OFF"
        color="grey"
        :class="[
        isShadow && level === 'OFF' ? 'text-grey-lighten-3' : '',
        !isShadow && level === 'OFF' ? 'font-weight-bold' : '',
      ]"
    >OFF
    </v-btn
    >
  </v-btn-toggle>
</template>

<style scoped></style>
