import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getLatestMetric = async (variables) => {
  return (
    await axiosInstance.get(`endpoint/${variables.instanceId}/metrics/${variables.name}/latest`)
  ).data
}

export const useGetLatestMetric = (options) => useBaseMutation(getLatestMetric, options)

export const useGetLatestMetricQuery = (variables, options) =>
  useBaseQuery(
    apiKeys.metricLatest(variables.instanceId, variables.name),
    getLatestMetric,
    variables,
    options,
  )
