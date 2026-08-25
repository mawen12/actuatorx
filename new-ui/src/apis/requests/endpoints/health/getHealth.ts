import { apiKeys, type JsonValue } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery';

interface HealthResponse {
    status: string
    components: Record<string, HealthComponent>
}

interface HealthComponent {
    status: string
    details: Record<string, JsonValue>
}

export const getHealth = async (): Promise<HealthResponse> => {
    return (await axiosInstance.get(`health`)).data
}

export const useGetHealth = (options: BaseMutationOptions<HealthResponse, void>) => useBaseMutation(getHealth, options)

export const useGetHealthQuery = (variables: void, options: BaseMutationOptions<HealthResponse, void>) =>
    useBaseQuery(apiKeys.itemHealth(), getHealth, variables, options)
