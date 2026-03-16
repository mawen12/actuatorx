<script setup>

defineProps({
  item: Object,
})
</script>

<template>
  <v-card class="page-card rounded-lg" :elevation="0" title="Dispatcher Servlet">
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <div class="text-subtitle-1 mb-1">ClassName</div>

          <span class="border-sm rounded-lg pa-2 text-subtitle-2 text-blue-darken-2">
            {{ item.details.handlerMethod.className }}
          </span>
        </v-col>
        <v-col cols="2">
          <div class="text-subtitle-1 mb-1">Name</div>

          <span class="border-sm rounded-lg pa-2 text-subtitle-2 text-blue-darken-2">
            {{ item.details.handlerMethod.name }}
          </span>
        </v-col>
        <v-col cols="4">
          <div class="text-subtitle-1 mb-1">Descriptor</div>

          <span class="border-sm rounded-lg pa-2 text-subtitle-2 text-blue-darken-2">
            {{ item.details.handlerMethod.descriptor }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col>
          <div class="text-subtitle-1 mb-1">Consumes</div>

          <v-chip
              v-for="m in item.details.requestMappingConditions.consumes"
              :key="m"
              :value="m"
              color="brown"
          >{{ m }}
          </v-chip>
        </v-col>
        <v-col>
          <div class="text-subtitle-1 mb-1">Produces</div>

          <v-chip-group column v-model="item.details.requestMappingConditions.produces">
            <v-chip
                v-for="m in item.details.requestMappingConditions.produces"
                :key="m"
                :value="m"
                color="deep-purple"
            >{{ m }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col>
          <div class="text-subtitle-1 mb-1">Methods</div>

          <v-chip
              v-for="m in item.details.requestMappingConditions.methods"
              :key="m"
              :value="m"
              color="orange"
          >{{ m }}
          </v-chip>
        </v-col>
        <v-col>
          <div class="text-subtitle-1 mb-1">Patterns</div>

          <v-chip-group column v-model="item.details.requestMappingConditions.patterns">
            <v-chip
                v-for="m in item.details.requestMappingConditions.patterns"
                :key="m"
                :value="m"
                color="teal"
            >{{ m }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col>
          <div class="text-subtitle-1 mb-1">Headers</div>

          <v-chip-group column v-model="item.details.requestMappingConditions.headers">
            <v-chip
                v-for="m in item.details.requestMappingConditions.headers"
                :key="m"
                :value="m"
                color="green"
            >{{ m }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col>
          <div class="text-subtitle-1 mb-1">Params</div>

          <v-chip-group column v-model="item.details.requestMappingConditions.params">
            <v-chip
                v-for="m in item.details.requestMappingConditions.params"
                :key="m"
                :value="m"
                color="lime"
            >{{ m }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
