import { disableGlobalErrorMeta } from '@/apis/useCreateQueryClient';
import { useMutation, useQueryClient, type MutationFunction, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

export type BaseMutationOptions<Data, Variables> = Omit<UseMutationOptions<Data, unknown, Variables>, 'mutationFn'> & {
    refetchNone?: boolean;
    disableGlobalError?: boolean;
    invalidateQueriesKeyFn?: (data: Data, variables: Variables) => string[];
    invalidateQueriesKeysFn?: (data: Data, variables: Variables) => string[][];
};

export type BaseUseMutationResult<Data, Variables> = UseMutationResult<Data, unknown, Variables>;

export const useBaseMutation = <Data, Variables>(mutationFn: MutationFunction<Data, Variables>, options?: BaseMutationOptions<Data, Variables>): BaseUseMutationResult<Data, Variables> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        ...options,
        meta: {
            ...options?.meta,
            ...(options?.disableGlobalError ? disableGlobalErrorMeta : undefined),
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            options?.onSuccess?.(data, variables, onMutateResult, context)

            if (options?.invalidateQueriesKeyFn) {
                queryClient.invalidateQueries({
                    queryKey: options.invalidateQueriesKeyFn(data, variables),
                    refetchType: options?.refetchNone ? 'none' : undefined,
                })
            }

            if (options?.invalidateQueriesKeysFn) {
                for (const key of options.invalidateQueriesKeysFn(data, variables)) {
                    queryClient.invalidateQueries({
                        queryKey: key,
                        refetchType: options?.refetchNone ? 'none' : undefined,
                    })
                }
            }
        },
    })
}
