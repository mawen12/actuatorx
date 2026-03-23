import axios from 'axios'
import router from "@/router/index.js";
import {useConnectionState} from '@/composables/useConnectionState.js'

const {resetConnectionState} = useConnectionState()

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api",
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