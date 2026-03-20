<script setup>
import useAbilities from "@/composables/useAbilities.js";
import {computed} from "vue";

const props = defineProps({
  ability: String,
})

const {has} = useAbilities()

const hasAbility = computed(() => {
  return has(props.ability)
})
</script>

<template>
  <template v-if="hasAbility">
    <slot/>
  </template>
  <template v-else>

    <v-card class="d-flex" style="align-items: center; justify-content: center; height: 100%" :elevation="0">
      <v-card-text style="text-align: center">
          <span class="border border-1  pa-2 text-body-1">
            Don't allow to access <span class="text-orange">{{ props.ability }}</span>
          </span>
      </v-card-text>
      <!--      <v-card-text>Don't has {{ props.ability }}. </v-card-text>-->
    </v-card>
  </template>
</template>

<style scoped>

</style>