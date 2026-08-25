import axios from 'axios'

function getBackendUrl() {
    if (import.meta.env.DEV) {
        console.log('Enable dev mode...')
        return import.meta.env.VITE_DEV_API_BASE_URL || '/api'
    }

    const currentUrl = window.location.href
    const url = new URL(currentUrl)
    const protocol = url.protocol
    const ip = url.hostname
    const port = url.port || (protocol === 'https:' ? 443 : 80)

    return `${protocol}//${ip}:${port}/api`
}

const backendUrl = getBackendUrl()

const axiosInstance = axios.create({
    baseURL: backendUrl,
})

// TODO use react router replace 
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             router.push("/")
//             resetConnectionState()
//             return
//         }
//         return Promise.reject(error)
//     }
// )

export {axiosInstance}