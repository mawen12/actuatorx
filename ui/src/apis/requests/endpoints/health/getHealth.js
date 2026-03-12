import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getHealth = async () => {
  return (await axiosInstance.get(`health`)).data
}

export const useGetHealth = (options) => useBaseMutation(getHealth, options)

export const useGetHealthQuery = (variables, options) =>
  useBaseQuery(apiKeys.itemHealth(), getHealth, variables, options)
