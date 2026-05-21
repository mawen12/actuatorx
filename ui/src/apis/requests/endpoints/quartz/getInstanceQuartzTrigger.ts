import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getInstanceQuartzTrigger = async (variables) => {
    return (
        await axiosInstance.get(
            `endpoint/${variables.instanceId}/quartz/triggers/${variables.group}/${variables.name}`, {
                params: {
                    url: connectUrl.value,
                }
            }
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
