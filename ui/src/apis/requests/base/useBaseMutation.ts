import {useMutation, useQueryClient, type MutationFunction, type UseMutationResult} from '@tanstack/vue-query'
import {disableGlobalErrorMeta} from '@/apis/useCreateQueryClient'

export type BaseUseMutationResult<Data, Variables> = UseMutationResult<Data, unknown, Variables>;

export type BaseMutationOptions<Data, Variables> = Omit<UseMutationOptions<Data, unknown, Variables>, 'mutationFn'> & {
  refetchNone?: boolean;
  disableGlobalError?: boolean;
  invalidateQueriesKeyFn?: (data: Data, variables: Variables) => unknown[];
  invalidateQueriesKeysFn?: (data: Data, variables: Variables) => unknown[][];
};

export const useBaseMutation = (mutationFn: MutationFunction<Data, Variables>, options: BaseMutationOptions<Data, Variables>) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        ...options,
        meta: {
            ...options?.meta,
            ...(options?.disableGlobalError ? disableGlobalErrorMeta : undefined),
        },
        onSuccess: (data, variables, context) => {
            options?.onSuccess?.(data, variables, context)

            if (options?.invalidateQueriesKeyFn) {
                queryClient.invalidateQueries(
                    options.invalidateQueriesKeyFn(data, variables),
                    options?.refetchNone ? {refetchType: 'none'} : undefined,
                )
            }

            if (options?.invalidateQueriesKeysFn) {
                for (const key of options.invalidateQueriesKeysFn(data, variables)) {
                    queryClient.invalidateQueries(
                        key,
                        options?.refetchNone ? {refetchType: 'none'} : undefined,
                    )
                }
            }
        },
    })
}
