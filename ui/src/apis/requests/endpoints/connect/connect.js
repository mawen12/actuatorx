import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'

export const connect = async (variables) => {
    return (
        await axiosInstance.post(`/connect`, null, {
            params: {
                url: variables.url,
                authType: variables.authType,
                basicAuthUsername: variables.basicAuth.username,
                basicAuthPassword: variables.basicAuth.password,
                bearerToken: variables.bearerToken.token,
            },
        })
    ).data
}

export const useConnect = (options) =>
    useBaseMutation(connect, {
        ...options,
    })