import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface QuartzRequest {
    instanceId: string
}

interface QuartzResponse {
    jobs: Groups
    triggers: Groups
}

interface Groups {
    groups: string[]
}

export const getInstanceQuartz = async (variables: QuartzRequest): Promise<QuartzResponse> => {
    return (await axiosInstance.get<QuartzResponse>(`endpoint/${variables.instanceId}/quartz`)).data
}

export const useGetInstanceQuartz = (options: BaseMutationOptions<QuartzResponse, QuartzRequest>) => useBaseMutation(getInstanceQuartz, options)

export const useGetInstanceQuartzQuery = (variables: QuartzRequest, options: BaseQueryOptions<QuartzResponse, QuartzRequest>) =>
    useBaseQuery(apiKeys.itemQuartz(variables.instanceId), getInstanceQuartz, variables, options)
