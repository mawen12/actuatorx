import { toast } from "@/components/ui/toast";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                // eslint-disable-next-line no-console
                if (import.meta.env.DEV) console.log({ failureCount, error })

                if (failureCount >= 0 && import.meta.env.DEV) return false
                if (failureCount > 3 && import.meta.env.PROD) return false

                return !(
                    error instanceof AxiosError &&
                    [401, 403].includes(error.response?.status ?? 0)
                )
            },
            refetchOnWindowFocus: import.meta.env.PROD,
            staleTime: 10 * 1000, // 10s
        },
        mutations: {
            onError: (error) => {
                // handleServerError(error)

                if (error instanceof AxiosError) {
                    if (error.response?.status === 304) {
                        toast.add({ type: "error", description: 'Content not modified!' })
                    }
                }
            },
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    toast.add({ type: "error", description: 'Session expired!' })
                }
                if (error.response?.status === 500) {
                    toast.add({ type: "error", description: 'Internal Server Error!' })
                }
                if (error.response?.status === 403) {
                    // router.navigate("/forbidden", { replace: true });
                }
            }
        },
    }),
})
