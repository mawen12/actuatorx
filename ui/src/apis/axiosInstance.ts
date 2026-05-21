import axios from 'axios'
import router from "@/router/index.js";
import {useConnectionState} from '@/composables/useConnectionState.js'

const {resetConnectionState} = useConnectionState()

const currentUrl = window.location.href
const url = new URL(currentUrl)
const ip = url.hostname
const port = url.port || (url.protocol === 'https:' ? 443 : 80)
const backendUrl = `http://${ip}:${port}/api`

const axiosInstance = axios.create({
    baseURL: backendUrl,
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            router.push("/")
            resetConnectionState()
            return
        }
        return Promise.reject(error)
    }
)

export {axiosInstance}