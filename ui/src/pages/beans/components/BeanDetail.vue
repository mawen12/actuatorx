<script setup>
import { inject, onMounted } from 'vue'

defineProps({
  item: Object,
})

const { highlightHandler } = inject('tableContext')

onMounted(() => {
  console.log('bean detail mouted')
})
</script>

<template>
  <v-container fluid class="pa-4 d-flex flex-column ga-2">
    <v-card class="page-card rounded-lg" :elevation="0">
      <v-card-text>
        <v-row>
          <v-col>
            <div class="text-body-1 text-uppercase mb-1">Type</div>

            <span class="pa-1 text-subtitle-2">{{ item.type }}</span>
          </v-col>
          <v-col>
            <div class="text-body-1 text-uppercase mb-1">Aliases:</div>

            <template v-for="alias in item.aliases" :key="alias">
              <span class="pa-1 text-subtitle-2">
                {{ alias }}
              </span>
            </template>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col>
            <div class="text-body-2 text-uppercase mb-1">Dependencies:</div>
            <div class="ga-2" style="display: flex; flex-direction: column">
              <template v-for="depen in item.dependencies" :key="depen">
                <div
                  class="pa-1 text-subtitle-2 text-success hover-row"
                  style="width: fit-content"
                  @click="highlightHandler(depen)"
                >
                  {{ depen }}
                </div>
              </template>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.page-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.v-theme--dark .page-card {
  border-color: rgba(255, 255, 255, 0.2);
}

.hover-row:hover {
  text-decoration: underline;
  text-decoration-color: black;

  cursor: pointer;
}

.v-theme--dark .hover-row:hover {
  text-decoration-color: white;
}
</style>
