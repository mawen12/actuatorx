import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';

interface ConnectRequest {
    url: string
    authType: string
    basicAuth: BasicAuth
    bearerToken: BearerToken 
}

interface BasicAuth {
    username: string
    password: string
}

interface BearerToken {
    token: string
}

export const connect = async (variables: ConnectRequest) => {
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

export const useConnect = (options: BaseMutationOptions<void, ConnectRequest>) =>
    useBaseMutation(connect, {
        ...options,
    })