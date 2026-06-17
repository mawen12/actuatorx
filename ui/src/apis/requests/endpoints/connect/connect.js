import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'

export const connect = async (variables) => {
    const formData = new URLSearchParams({
        url: variables.url,
        authType: variables.authType,
        basicAuthUsername: variables.basicAuth.username,
        basicAuthPassword: variables.basicAuth.password,
        bearerToken: variables.bearerToken.token,
    })

    return (
        await axiosInstance.post(`/connect`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
    ).data
}

export const useConnect = (options) =>
    useBaseMutation(connect, {
        ...options,
    })