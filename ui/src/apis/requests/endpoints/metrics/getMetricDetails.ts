import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getMetricDetails = async (variables) => {
    return (await axiosInstance.post(`metrics/${variables.name}`, variables.tags, {
        params: {
            url: connectUrl.value
        }
    })).data
}

export const useGetDetails = (options) => useBaseMutation(getMetricDetails, options)

export const useGetMetricDetailsQuery = (variables, options) =>
    useBaseQuery(
        apiKeys.itemMetricDetails(variables.name, variables.tags),
        getMetricDetails,
        variables,
        options,
    )
