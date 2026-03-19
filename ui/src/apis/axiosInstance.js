import axios from 'axios'
import {useStorage} from "@vueuse/core";
import router from "@/router/index.js";

const connected = useStorage('connected')
const connectUrl = useStorage('connectUrl')
const drawer = useStorage('drawer', true)

const currentUrl = window.location.href
const url = new URL(currentUrl)
const ip = url.hostname
const port = url.port || (url.protocol === 'https:' ? 443 : 80)
const backendUrl = `http://${ip}:${port}/api`

const axiosInstance = axios.create({
    // baseURL: backendUrl,
    baseURL: "http://localhost:4000/api",
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            router.push("/")
            connected.value = false
            connectUrl.value = null
            drawer.value = false
        }
        return error
    }
)

export {axiosInstance}