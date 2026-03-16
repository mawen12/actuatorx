<script setup>
defineProps({
  item: Object,
})
</script>

<template>
  <v-container fluid class="pa-4 d-flex flex-column ga-2">
    <v-card class="page-card rounded-lg" :elevation="0" title="Request">
      <v-card-text>
        <v-row>
          <v-col>
            <div class="text-body-1 text-uppercase mb-1">Method</div>

            <span class="border-sm rounded-lg pa-1 text-subtitle-2 text-warning">{{
                item.request.method
              }}</span>
          </v-col>
          <v-col>
            <div class="text-body-1 text-uppercase mb-1">URI</div>

            <span class="border-sm rounded-lg pa-1 text-subtitle-2 text-warning">{{
                item.request.uri
              }}</span>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="6" v-for="(value, key) in item.request.headers" :key="key">
            <div class="text-body-1 text-uppercase mb-1">{{ key }}</div>

            <template v-for="(v, idx) in value" :key="idx">
              <span class="border-sm rounded-lg pa-1 text-subtitle-2 text-warning">{{ v }}</span>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="page-card rounded-lg" :elevation="0" title="Response">
      <v-card-text>
        <v-row>
          <v-col>
            <div class="text-body-1 text-uppercase mb-1">Status</div>

            <span class="border-sm rounded-lg pa-1 text-subtitle-2 text-warning">{{
                item.response.status
              }}</span>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="6" v-for="(value, key) in item.response.headers" :key="key">
            <div class="text-body-1 text-uppercase mb-1">{{ key }}</div>

            <template v-for="(v, idx) in value" :key="idx">
              <span class="border-sm rounded-lg pa-1 text-subtitle-2 text-warning">{{ v }}</span>
            </template>
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
  cursor: pointer;
}
</style>
