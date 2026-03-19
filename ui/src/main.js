import {createApp} from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import 'unfonts.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import {createVuetify} from 'vuetify'

// vue-flow
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

import './style.css'
import {i18n} from './i18n'

// codemirror
import {basicSetup} from 'codemirror'
import VueCodemirror from 'vue-codemirror'
import router from "@/router/index.js";
import {VueQueryPlugin} from "@tanstack/vue-query";
import {useCreateQueryClient} from "@/apis/useCreateQueryClient.js";

const app = createApp(App)

const vuetify = createVuetify({})

const queryClient = useCreateQueryClient()

app.use(i18n)
    .use(router)
    .use(VueQueryPlugin, {queryClient})
    .use(VueCodemirror, {extensions: [basicSetup]})
    .use(vuetify)
    .mount('#app')
