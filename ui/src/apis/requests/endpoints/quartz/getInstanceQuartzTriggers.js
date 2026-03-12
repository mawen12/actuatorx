import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getInstanceQuartzTriggers = async (variables) => {
  return (
    await axiosInstance.get(`endpoint/${variables.instanceId}/quartz/triggers/${variables.group}`)
  ).data
}

export const useGetInstanceQuartzTriggers = (options) =>
  useBaseMutation(getInstanceQuartzTriggers, options)

export const useGetInstanceQuartzTriggersQuery = (variables, options) =>
  useBaseQuery(
    apiKeys.itemQuartzTriggers(variables.instanceId, variables.group),
    getInstanceQuartzTriggers,
    variables,
    options,
  )
