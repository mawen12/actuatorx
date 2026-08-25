import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';

interface SetLoggerLevelRequest {
    loggerName: string
    level?: string
}

export const setLoggerLevel = async (variables: SetLoggerLevelRequest) => {
    return (
        await axiosInstance.post(`loggers`, null, {
            params: {
                name: variables.loggerName,
                level: variables.level,
            },
        })
    ).data
}

export const useSetLoggerLevel = (options: BaseMutationOptions<void, SetLoggerLevelRequest>) =>
    useBaseMutation(setLoggerLevel, {
        ...options,
        invalidateQueriesKeyFn: apiKeys.itemLoggers,
    })
