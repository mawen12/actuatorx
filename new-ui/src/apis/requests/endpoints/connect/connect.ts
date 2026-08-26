import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';

interface ConnectRequest {
    url: string
    authType: string
    username: string
    password: string
    token: string
}

export const connect = async (variables: ConnectRequest) => {
    const formData = new URLSearchParams({
        url: variables.url,
        authType: variables.authType,
        basicAuthUsername: variables.username,
        basicAuthPassword: variables.password,
        bearerToken: variables.token,
    })

    return (
        await axiosInstance.post(`/connect`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
    ).data
}

export const useConnect = (options?: BaseMutationOptions<void, ConnectRequest>) =>
    useBaseMutation(connect, {
        ...options,
    })