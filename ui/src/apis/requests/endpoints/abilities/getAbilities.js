import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";


const connectUrl = useStorage('connectUrl')

export const getAbilities = async (variables) => {
    return (await axiosInstance.get(`abilities`, {
        params: {
            url: connectUrl.value,
        }
    })).data
}

export const useGetAbilities = (options) => useBaseMutation(getAbilities, options)

export const useGetAbilitiesQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemAbilities(), getAbilities, variables, options)
