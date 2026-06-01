import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'

export const disconnect = async (variables) => {
    return (
        await axiosInstance.post(`/disconnect`)
    ).data
}

export const useDisconnect = (options) =>
    useBaseMutation(disconnect, {
        ...options,
    })