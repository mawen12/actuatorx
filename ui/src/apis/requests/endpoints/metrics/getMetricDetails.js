import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getMetricDetails = async (variables) => {
  return (await axiosInstance.post(`metrics/${variables.name}`, variables.tags)).data
}

export const useGetDetails = (options) => useBaseMutation(getMetricDetails, options)

export const useGetMetricDetailsQuery = (variables, options) =>
  useBaseQuery(
    apiKeys.itemMetricDetails(variables.name, variables.tags),
    getMetricDetails,
    variables,
    options,
  )
