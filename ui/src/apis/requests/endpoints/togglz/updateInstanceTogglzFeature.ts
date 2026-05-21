import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const updateInstanceTogglzFeature = async (variables) => {
    const result = (
        await axiosInstance.post(`togglz/${variables.instanceId}`, null, {
            params: {
                url: connectUrl.value,
                featureName: variables.featureName,
                enabled: variables.enabled,
            },
        })
    ).data
    return {...result, instanceId: variables.instanceId}
}

export const useUpdateInstanceTogglzFeature = (options) =>
    useBaseMutation(updateInstanceTogglzFeature, {
        ...options,
        invalidateQueriesKeyFn: (data, variables) => apiKeys.itemTogglz(variables.instanceId),
    })
