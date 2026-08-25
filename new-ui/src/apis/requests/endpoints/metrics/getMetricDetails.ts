import { apiKeys, type JsonValue } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery';

interface MetricDetailRequest {
    name: string
    tags: string[]
}

interface MetricDetailResponse {
    name: string
    description: string
    baseUnit: string
    measurements: MetricMeasurement[]
    availableTags:   MetricAvailableTag[]
}

interface MetricMeasurement {
    statistic: string
    value: JsonValue
}

interface MetricAvailableTag {
    tag: string
    values: string[]
}

export const getMetricDetails = async (variables: MetricDetailRequest) => {
    return (await axiosInstance.post<MetricDetailResponse>(`metrics/${variables.name}`, variables.tags)).data
}

export const useGetDetails = (options: BaseMutationOptions<MetricDetailResponse, MetricDetailRequest>) => useBaseMutation(getMetricDetails, options)

export const useGetMetricDetailsQuery = (variables: MetricDetailRequest, options: BaseMutationOptions<MetricDetailResponse, MetricDetailRequest>) =>
    useBaseQuery(
        apiKeys.itemMetricDetails(variables.name, variables.tags),
        getMetricDetails,
        variables,
        options,
    )
