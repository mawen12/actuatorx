<script setup>
import {reactive, ref} from 'vue'
import {useConnect} from '@/apis/requests/endpoints/connect/connect'
import {useRouter} from 'vue-router'
import {useStorage} from '@vueuse/core'

const router = useRouter()
const connected = useStorage('connected')
const connectUrl = useStorage('connectUrl')
const drawer = useStorage('drawer', true)

const form = ref(false)
const loading = ref(false)

const model = reactive({
  URL: '',
})

const connectState = useConnect()

const rules = {
  required: (value) => !!value || 'Field is required',
}

const error = ref('')

async function onSubmit() {
  if (!form.value) return
  error.value = ''
  loading.value = true

  try {
    await connectState.mutateAsync({
      url: model.URL,
    })

    router.push('/health')
    connected.value = true
    connectUrl.value = model.URL
    drawer.value = true
  } catch (e) {
    console.log('err is', e.response.data.error)
    error.value = e.response.data.error
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-sheet class="pa-12" rounded>
    <h1 class="text-center mb-2">Actuator Go</h1>

    <v-card class="mx-auto px-6 py-8" width="500">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
            v-model="model.URL"
            color="primary"
            :readonly="loading"
            class="mb-2"
            placeholder="etc. http://localhost:8080/actuator"
            :rules="[rules.required]"
            single-line
            clearable
        >
        </v-text-field>

        <div v-if="error" class="text-red">
          {{ error }}
        </div>
        <br/>

        <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
        >Connect
        </v-btn
        >
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped></style>
