import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from "@/apis/axiosInstance";
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface HttpRequestStatisticsRequest {
    instanceId: string
}

// TODO need to finish
export const getInstanceHttpRequestStatistics = async (variables: HttpRequestStatisticsRequest) => {
    return (
        await axiosInstance.get(`metrics/${variables.instanceId}/httpRequestStatistics`)
    ).data
}

export const useGetInstanceHttpRequestStatistics = (options: BaseMutationOptions<void, HttpRequestStatisticsRequest>) =>
    useBaseMutation(getInstanceHttpRequestStatistics, options)

export const useGetInstanceHttpRequestStatisticsQuery = (variables: HttpRequestStatisticsRequest, options: BaseQueryOptions<void, HttpRequestStatisticsRequest>) =>
    useBaseQuery(
        apiKeys.itemHttpRequestStatistics(variables.instanceId),
        getInstanceHttpRequestStatistics,
        variables,
        options,
    )
