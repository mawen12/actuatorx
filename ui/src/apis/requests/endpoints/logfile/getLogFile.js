import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getLogfile = async (variables) => {
    return (
        await axiosInstance.get(`logfile`, {
            params: {
                url: connectUrl.value,
                start: variables.start,
                end: variables.end,
            },
        })
    ).data
}

export const useGetLogfile = (options) => useBaseMutation(getLogfile, options)

export const useGetLogfileQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemLogfile(), getLogfile, variables, options)
