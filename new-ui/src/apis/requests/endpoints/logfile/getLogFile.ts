import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface LogfileRequest {
    start: number
    end: number
}

// TODO replace by logs-viewer
export const getLogfile = async (variables: LogfileRequest) => {
    return (
        await axiosInstance.get(`logfile`, {
            params: {
                start: variables.start,
                end: variables.end,
            },
        })
    ).data
}

export const useGetLogfile = (options: BaseMutationOptions<void, LogfileRequest>) => useBaseMutation(getLogfile, options)

export const useGetLogfileQuery = (variables: LogfileRequest, options: BaseQueryOptions<void, LogfileRequest>) =>
    useBaseQuery(apiKeys.itemLogfile(), getLogfile, variables, options)
