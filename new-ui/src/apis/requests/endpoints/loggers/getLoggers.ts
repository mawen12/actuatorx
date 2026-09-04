import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface LoggerResponse {
    levels: string[]
    loggers: Record<string, Logger>
    groups: Record<string, LoggerGroup>
}

interface Logger {
    configuredLevel: string
    effectiveLevel: string
}

interface LoggerGroup {
    configuredLevel: string
    members: string[]
}

export interface LoggerView extends Logger {
    name: string
    timestamp: number
    search: string
}

export const getLoggers = async (): Promise<LoggerView[]> => {
    const result = (await axiosInstance.get<LoggerResponse>(`loggers`)).data
    const now = new Date().getTime()
    return Object.entries(result.loggers).map(([name, logger]) => ({
        ...logger,
        name,
        timestamp: now,
        search: name.toLowerCase(),
    }))
}

export const useGetLoggers = (options?: BaseMutationOptions<LoggerView[], void>) => useBaseMutation(getLoggers, options)

export const useGetLoggersQuery = (variables?: void, options?: BaseQueryOptions<LoggerView[], void>) =>
    useBaseQuery(apiKeys.itemLoggers(), getLoggers, variables, options)
