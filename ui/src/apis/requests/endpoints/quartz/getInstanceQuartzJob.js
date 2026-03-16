import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getInstanceQuartzJob = async (variables) => {
    return (
        await axiosInstance.get(
            `endpoint/${variables.instanceId}/quartz/jobs/${variables.group}/${variables.name}`, {
                params: {
                    url: connectUrl.value,
                }
            }
        )
    ).data
}

export const useGetInstanceQuartzJob = (options) => useBaseMutation(getInstanceQuartzJob, options)

export const useGetInstanceQuartzJobQuery = (variables, options) =>
    useBaseQuery(
        apiKeys.itemQuartzJob(variables.instanceId, variables.group, variables.name),
        getInstanceQuartzJob,
        variables,
        options,
    )
