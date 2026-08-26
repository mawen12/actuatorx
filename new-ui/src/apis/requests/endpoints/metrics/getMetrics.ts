import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface MetricResponse {
    names: string[]
}

interface MetricView {
    name: string
    search: string
}

export const getMetrics = async (): Promise<MetricView[]> => {
    const result = (await axiosInstance.get<MetricResponse>(`metrics`)).data.names

    return result.map((name) => ({
        name,
        search: name.toLowerCase(),
    }))
}

export const useGetMetrics = (options: BaseMutationOptions<MetricView[], void>) => useBaseMutation(getMetrics, options)

export const useGetMetricsQuery = (variables: void, options: BaseQueryOptions<MetricView[], void>) =>
    useBaseQuery(apiKeys.itemMetrics(), getMetrics, variables, options)
