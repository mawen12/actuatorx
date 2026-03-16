import {axiosInstance} from "@/apis/axiosInstance"
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getInstanceHttpRequestStatistics = async (variables) => {
    return (
        await axiosInstance.get(`metrics/${variables.instanceId}/httpRequestStatistics`, {
            params: {
                url: connectUrl.value,
            }
        })
    ).data
}

export const useGetInstanceHttpRequestStatistics = (options) =>
    useBaseMutation(getInstanceHttpRequestStatistics, options)

export const useGetInstanceHttpRequestStatisticsQuery = (variables, options) =>
    useBaseQuery(
        apiKeys.itemHttpRequestStatistics(variables.instanceId),
        getInstanceHttpRequestStatistics,
        variables,
        options,
    )
