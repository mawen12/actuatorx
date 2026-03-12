<script setup>
defineProps({
  item: Object,
})
</script>

<template>
  <v-card class="page-card rounded-lg" :elevation="0" title="Servlet Filter">
    <v-card-text>
      <v-row>
        <v-col>
          <div class="text-subtitle-1 mb-1">ClassName</div>

          <span class="border-sm rounded-lg pa-2 text-subtitle-2 text-blue-darken-2">
            {{ item.className }}
          </span>
        </v-col>
        <v-col>
          <div class="text-subtitle-1 mb-1">Name</div>

          <span class="border-sm rounded-lg pa-2 text-subtitle-2 text-blue-darken-2">
            {{ item.name }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col>
          <div class="text-subtitle-1 mb-1">Servlet Name Mappings</div>

          <v-chip v-for="m in item.servletNameMappings" :key="m" :value="m" color="deep-purple"
            >{{ m }}
          </v-chip>
        </v-col>
        <v-col>
          <div class="text-subtitle-1 mb-1">URL Pattern Mappings</div>

          <v-chip v-for="m in item.urlPatternMappings" :key="m" :value="m" color="deep-purple"
            >{{ m }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
