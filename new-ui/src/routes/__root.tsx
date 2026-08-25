import { NavigationProgress } from "@/components/navigation-progress";
import { Toaster } from "@/components/ui/toast";
import { GeneralError } from "@/features/errors/general-error";
import { NotFoundError } from "@/features/errors/not-found-error";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: () => {
        return (
            <>
                <NavigationProgress />
                <Outlet />
                <Toaster timeout={2500} />
                {import.meta.env.MODE === 'development' && (
                    <>
                        <TanStackRouterDevtools position="bottom-right" />
                    </>
                )}
            </>
        )
    },
    notFoundComponent: NotFoundError,
    errorComponent: GeneralError,
})