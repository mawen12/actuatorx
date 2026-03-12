import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getMetrics = async (variables) => {
  const result = (await axiosInstance.get(`metrics`)).data.names

  return result.map((name) => ({
    name,
    search: name.toLowerCase(),
  }))
}

export const useGetMetrics = (options) => useBaseMutation(getMetrics, options)

export const useGetMetricsQuery = (variables, options) =>
  useBaseQuery(apiKeys.itemMetrics(), getMetrics, variables, options)
