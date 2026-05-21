import {computed} from 'vue'
import {useQuery} from '@tanstack/vue-query'
import {disableGlobalErrorMeta} from '@/apis/useCreateQueryClient'

export const useBaseQuery = (queryKey, queryFn, variables, options) => {
    const queryFnInterval = computed(() => () => queryFn(variables))

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
