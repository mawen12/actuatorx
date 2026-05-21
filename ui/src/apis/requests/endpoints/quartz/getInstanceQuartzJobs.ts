import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getInstanceQuartzJobs = async (variables) => {
    return (
        await axiosInstance.get(`endpoint/${variables.instanceId}/quartz/jobs/${variables.group}`, {
            params: {
                value: connectUrl.value,
            }
        })
    ).data
}

export const useGetInstanceQuartzJobs = (options) => useBaseMutation(getInstanceQuartzJobs, options)

export const useGetInstanceQuartzJobsQuery = (variables, options) =>
    useBaseQuery(
        apiKeys.itemQuartzJobs(variables.instanceId, variables.group),
        getInstanceQuartzJobs,
        variables,
        options,
    )
