import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getInstanceQuartz = async (variables) => {
    return (await axiosInstance.get(`endpoint/${variables.instanceId}/quartz`, {
        params: {
            value: connectUrl.value,
        }
    })).data
}

export const useGetInstanceQuartz = (options) => useBaseMutation(getInstanceQuartz, options)

export const useGetInstanceQuartzQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemQuartz(variables.instanceId), getInstanceQuartz, variables, options)
