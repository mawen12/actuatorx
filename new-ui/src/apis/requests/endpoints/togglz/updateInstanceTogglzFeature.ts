import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';

interface UpdateTogglzRequest {
    instanceId: string
    featureName: string
    enabled: boolean
}

export const updateInstanceTogglzFeature = async (variables: UpdateTogglzRequest) => {
    const result = (
        await axiosInstance.post(`togglz/${variables.instanceId}`, null, {
            params: {
                featureName: variables.featureName,
                enabled: variables.enabled,
            },
        })
    ).data
    return {...result, instanceId: variables.instanceId}
}

export const useUpdateInstanceTogglzFeature = (options: BaseMutationOptions<void, UpdateTogglzRequest>) =>
    useBaseMutation(updateInstanceTogglzFeature, {
        ...options,
        invalidateQueriesKeyFn: (data, variables: UpdateTogglzRequest) => apiKeys.itemTogglz(variables.instanceId),
    })
