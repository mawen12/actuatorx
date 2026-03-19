<script setup>
import useAbilities from "@/composables/useAbilities.js";
import {computed} from "vue";
import LoadingPage from "@/components/page/LoadingPage.vue";

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

      <v-card class="d-flex flex-column align-center rounded-lg text-10"  :elevation="0">
        <v-card-text>Don't access <span class="text-orange">{{ props.ability}}</span></v-card-text>

<!--      <v-card-text>Don't has {{ props.ability }}. </v-card-text>-->
    </v-card>
  </template>
</template>

<style scoped>

</style>