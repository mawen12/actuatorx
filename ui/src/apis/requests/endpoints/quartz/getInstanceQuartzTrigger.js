import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getInstanceQuartzTrigger = async (variables) => {
  return (
    await axiosInstance.get(
      `endpoint/${variables.instanceId}/quartz/triggers/${variables.group}/${variables.name}`,
    )
  ).data
}

export const useGetInstanceQuartzTrigger = (options) =>
  useBaseMutation(getInstanceQuartzTrigger, options)

export const useGetInstanceQuartzTriggerQuery = (variables, options) =>
  useBaseQuery(
    apiKeys.itemQuartzTrigger(variables.instanceId, variables.group, variables.name),
    getInstanceQuartzTrigger,
    variables,
    options,
  )
