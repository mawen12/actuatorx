<script setup>
import {reactive, ref} from 'vue'
import {useConnect} from '@/apis/requests/endpoints/connect/connect'
import {useRouter} from 'vue-router'
import {useStorage} from '@vueuse/core'
import useAbilities from "@/composables/useAbilities.js";
import {useGetAbilities} from "@/apis/requests/endpoints/abilities/getAbilities.js";

const router = useRouter()
const connected = useStorage('connected')
const connectUrl = useStorage('connectUrl')
const drawer = useStorage('drawer', true)

const {addAll} = useAbilities()

const form = ref(false)
const loading = ref(false)

const authTypeList = ref([
  'No Auth',
  'Basic Auth',
  'Bearer Token',
])

const model = reactive({
  URL: '',
  AuthType: 'No Auth',
  BasicAuth: {
    username: '',
    password: '',
  },
  BearerToken: {
    token: ''
  },
})

const connectState = useConnect()

const getAbilitiesState = useGetAbilities()

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
      authType: model.AuthType,
      basicAuth: {...model.BasicAuth},
      bearerToken: {...model.BearerToken},
    })

    connected.value = true
    connectUrl.value = model.URL
    drawer.value = true

    const result = await getAbilitiesState.mutateAsync({
      url: model.URL
    })

    addAll(result)

    router.push('/health')
  } catch (e) {
    console.log('err is', e.response.error)
    error.value = e.response.error
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

        <!--   AUTH     -->
        <v-select :items="authTypeList" label="Select Auth Type" v-model="model.AuthType">
        </v-select>

        <div v-if="model.AuthType === 'Basic Auth'">
          <v-text-field
              label="Username"
              v-model="model.BasicAuth.username"
              color="primary"
              :readonly="loading"
              class="mb-2"
              clearable
          >
          </v-text-field>

          <v-text-field
              label="Password"
              v-model="model.BasicAuth.password"
              color="primary"
              :readonly="loading"
              class="mb-2"
              clearable
          >
          </v-text-field>
        </div>
        <div v-else-if="model.AuthType === 'Bearer Token'">
          <v-textarea
              label="Token"
              v-model="model.BearerToken.token"
              color="primary"
              class="mb-2"
              rows="1"
              auto-grow
              clearable
          ></v-textarea>
        </div>

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
