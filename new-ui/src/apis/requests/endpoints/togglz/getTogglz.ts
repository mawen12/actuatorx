import { apiKeys, type JsonValue } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface TogglzResponse {
    togglz: Togglz[]
}

interface Togglz {
    name: string
    enabled: boolean
    strategy?: string
    params: Record<string, JsonValue>
    metadata: TogglzMetadata
}

interface TogglzMetadata {
    label: string
    groups: JsonValue[]
    enabledByDefault: boolean
    attributes: JsonValue[]
}

export const getTogglz = async (): Promise<TogglzResponse> => {
    return (await axiosInstance.get<TogglzResponse>(`togglz`)).data
}

export const useGetTogglz = (options: BaseMutationOptions<TogglzResponse, void>) => useBaseMutation(getTogglz, options)

export const useGetTogglzQuery = (variables: void, options: BaseQueryOptions<TogglzResponse, void>) =>
    useBaseQuery(apiKeys.itemMetrics(), getTogglz, variables, options)
