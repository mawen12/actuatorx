import { apiKeys } from '@/apis/apiKeys'
import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'

export const getAbilities = async (variables) => {
    return (await axiosInstance.get(`abilities`)).data
}

export const useGetAbilities = (options) => useBaseMutation(getAbilities, options)

export const useGetAbilitiesQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemAbilities(), getAbilities, variables, options)
