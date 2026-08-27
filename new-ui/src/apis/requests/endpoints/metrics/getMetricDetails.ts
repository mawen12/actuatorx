import { apiKeys, type JsonValue } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

export interface MetricDetailRequest {
    name: string
    tags: Record<string, string>
}

export interface MetricDetailResponse {
    name: string
    description: string
    baseUnit: string
    measurements: MetricMeasurement[]
    availableTags: MetricAvailableTag[]
}

export interface MetricMeasurement {
    statistic: string
    value: JsonValue
}

export interface MetricAvailableTag {
    tag: string
    values: string[]
}

export const getMetricDetails = async (variables: MetricDetailRequest): Promise<MetricDetailResponse> => {
    return (await axiosInstance.post<MetricDetailResponse>(`metrics/${variables.name}`, variables.tags)).data
}

export const useGetDetails = (options: BaseMutationOptions<MetricDetailResponse, MetricDetailRequest>) => useBaseMutation(getMetricDetails, options)

export const useGetMetricDetailsQuery = (variables: MetricDetailRequest, options?: BaseQueryOptions<MetricDetailResponse, MetricDetailRequest>) =>
    useBaseQuery(
        apiKeys.itemMetricDetails(variables.name, variables.tags),
        getMetricDetails,
        variables,
        options,
    )
