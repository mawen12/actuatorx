import {MutationCache, QueryCache, QueryClient} from "@tanstack/vue-query";

export const disableGlobalErrorMeta = { disableGlobalError: true };

export const useCreateQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            mutations: {
                networkMode: 'always'
            },
            queries: {
                networkMode: 'always',
                refetchOnMount: true,
                refetchOnWindowFocus: false,
                refetchInterval: false,
                refetchIntervalInBackground: false,
                retry: false
            }
        },
        queryCache: new QueryCache({}),
        mutationCache: new MutationCache({})
    })
}
