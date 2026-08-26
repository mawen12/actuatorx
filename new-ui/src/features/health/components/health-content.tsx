import type { JsonValue } from "@/apis/apiKeys";
import { useGetHealthQuery, type HealthComponentResp } from "@/apis/requests/endpoints/health/getHealth";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { RotateCw } from "lucide-react";
import { useMemo } from "react";
import { HealthComponent } from "./health-component";

export interface HealthComponentView {
    name: string
    path: string
    status: string
    details?: Record<string, JsonValue>
}

export function HealthContent() {
    const { data, isLoading, refetch, isRefetching, isError, dataUpdatedAt } = useGetHealthQuery(undefined, { refetchInterval: 1000 * 60 })

    const flattenComponents = (components: Record<string, HealthComponentResp>, currentPath?: string) => {
        const flattenedArray = []

        for (const key in components) {
            const component = components[key]
            const name = key
            const path = currentPath ? `${currentPath} / ${key}` : key
            flattenedArray.push({ name, path, ...component })
        }
        return flattenedArray
    }

    const components = useMemo((): HealthComponentView[] => {
        return data ? [
            {
                name: 'Instance',
                path: 'Instance',
                status: data.status,
            },
            ...flattenComponents(data.components),
        ] : []
    }, [data])

    return (
        <Card className="mx-auto w-full lg:w-3/4 xl:w-1/2">
            <CardHeader>
                <CardTitle>Health</CardTitle>
                <CardDescription>{dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString() : "-"}</CardDescription>
                <CardAction>
                    <Button variant={'ghost'} size={'icon'} onClick={() => refetch()} disabled={isRefetching}>
                        {isRefetching ? <Spinner/> : <RotateCw />}
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {components?.map((component) => (
                        <HealthComponent key={component.path} component={component} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}