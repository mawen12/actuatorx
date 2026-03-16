import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const setLoggerLevel = async (variables) => {
    return (
        await axiosInstance.post(`loggers`, null, {
            params: {
                url: connectUrl.value,
                name: variables.loggerName,
                level: variables.level,
            },
        })
    ).data
}

export const useSetLoggerLevel = (options) =>
    useBaseMutation(setLoggerLevel, {
        ...options,
        invalidateQueriesKeyFn: (data, variables) => apiKeys.itemLoggers(),
    })
