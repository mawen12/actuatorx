import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getTogglz = async (variables) => {
  return (await axiosInstance.get(`togglz`)).data
}

export const useGetTogglz = (options) => useBaseMutation(getTogglz, options)

export const useGetTogglzQuery = (variables, options) =>
  useBaseQuery(apiKeys.itemMetrics(variables.instanceId), getTogglz, variables, options)
