import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { disableGlobalErrorMeta } from '@/apis/useCreateQueryClient'

export const useBaseMutation = (mutationFn, options) => {
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
          options?.refetchNone ? { refetchType: 'none' } : undefined,
        )
      }

      if (options?.invalidateQueriesKeysFn) {
        for (const key of options.invalidateQueriesKeysFn(data, variables)) {
          queryClient.invalidateQueries(
            key,
            options?.refetchNone ? { refetchType: 'none' } : undefined,
          )
        }
      }
    },
  })
}
