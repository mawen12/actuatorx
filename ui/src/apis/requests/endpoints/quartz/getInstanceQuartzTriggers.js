import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getInstanceQuartzTriggers = async (variables) => {
    return (
        await axiosInstance.get(`endpoint/${variables.instanceId}/quartz/triggers/${variables.group}`, {
            params: {
                url: connectUrl.value,
            }
        })
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
