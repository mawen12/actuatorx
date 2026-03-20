import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'

export const connect = async (variables) => {
    return (
        await axiosInstance.post(`/connect`, null, {
            params: {
                url: variables.url,
                authType: variables.authType,
                basicAuth: variables.basicAuth,
                bearerToken: variables.bearerToken,
            },
        })
    ).data
}

export const useConnect = (options) =>
    useBaseMutation(connect, {
        ...options,
    })