import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'

type Variables = {
    url: string,
}

export const getAbilities = async (variables: Variables) => {
    return (await axiosInstance.get(`abilities`, {
        params: {
            url: variables.url,
        }
    })).data
}

export const useGetAbilities = (options?: BaseMutationOptions) => useBaseMutation(getAbilities, options)

export const useGetAbilitiesQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemAbilities(), getAbilities, variables, options)
