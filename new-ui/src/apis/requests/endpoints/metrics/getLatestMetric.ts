import { apiKeys, type JsonValue } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery';

interface LastestMetricRequest {
    instanceId: string
    name: string
}

interface LastestMetricResponse {
    name: string
    value: MetricLatestValue
}

interface MetricLatestValue {
    value: JsonValue
    timestamp: string
}

export const getLatestMetric = async (variables: LastestMetricRequest): Promise<LastestMetricResponse> => {
    return (
        await axiosInstance.get<LastestMetricResponse>(`endpoint/${variables.instanceId}/metrics/${variables.name}/latest`)
    ).data
}

export const useGetLatestMetric = (options: BaseMutationOptions<LastestMetricResponse, LastestMetricRequest>) => useBaseMutation(getLatestMetric, options)

export const useGetLatestMetricQuery = (variables: LastestMetricRequest, options: BaseMutationOptions<LastestMetricResponse, LastestMetricRequest>) =>
    useBaseQuery(
        apiKeys.metricLatest(variables.instanceId, variables.name),
        getLatestMetric,
        variables,
        options,
    )
