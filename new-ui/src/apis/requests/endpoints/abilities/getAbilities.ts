
import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery'

type AbilityResponse = string[] 

export const getAbilities = async (): Promise<AbilityResponse> => {
    return (await axiosInstance.get(`abilities`)).data
}

export const useGetAbilities = (options: BaseMutationOptions<AbilityResponse, void>) => useBaseMutation(getAbilities, options)

export const useGetAbilitiesQuery = (variables: void, options: BaseQueryOptions<AbilityResponse, void>) =>
    useBaseQuery(apiKeys.itemAbilities(), getAbilities, variables, options)
