import { disableGlobalErrorMeta } from '@/apis/useCreateQueryClient';
import { useQuery, type QueryKey, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

export type BaseQueryOptions<Data, Variables> = Omit<UseQueryOptions<Data, unknown, Data>, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData?: Data | (() => Data)
    disableGlobalError?: boolean
}

export type BaseUseQueryResult<Data> = UseQueryResult<NoInfer<Data>, unknown>

export const useBaseQuery = <Data, Variables>(queryKey: QueryKey, queryFn: (variables: Variables) => Promise<Data>, variables: Variables, options?: BaseQueryOptions<Data, Variables>): BaseUseQueryResult<Data> => {
    const queryFnInterval = useMemo(() => () => queryFn(variables), [queryFn, variables])

    return useQuery({
        ...options,
        meta: {
            ...options?.meta,
            ...(options?.disableGlobalError ? disableGlobalErrorMeta : undefined),
        },
        queryKey,
        queryFn: queryFnInterval,
    })
}
