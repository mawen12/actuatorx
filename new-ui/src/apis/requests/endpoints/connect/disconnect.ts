import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation'

export const disconnect = async () => {
    return (
        await axiosInstance.post(`/disconnect`)
    ).data
}

export const useDisconnect = (options: BaseMutationOptions<void, void>) =>
    useBaseMutation(disconnect, {
        ...options,
    })