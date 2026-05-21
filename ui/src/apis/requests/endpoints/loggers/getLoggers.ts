import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getLoggers = async (variables) => {
    const result = (await axiosInstance.get(`loggers`, {
        params: {
            url: connectUrl.value,
        }
    })).data
    const now = new Date().getTime()
    return Object.entries(result.loggers).map(([name, logger]) => ({
        ...logger,
        name,
        timestamp: now,
        search: name.toLowerCase(),
    }))
}

export const useGetLoggers = (options) => useBaseMutation(getLoggers, options)

export const useGetLoggersQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemLoggers(), getLoggers, variables, options)
