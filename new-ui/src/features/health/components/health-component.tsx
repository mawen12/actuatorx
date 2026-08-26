import type { JsonValue } from "@/apis/apiKeys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { getHealthDetailsKeyFormatter, getHealthDetailsValueFormatter } from "../lib/healthDetailsFormatters";
import { getHealthStatusColor } from "../lib/itemUtils";
import type { HealthComponentView } from "./health-content";

export interface HealthComponentProps {
    component: HealthComponentView
}

export function HealthComponent({ component }: HealthComponentProps) {
    const name = useMemo(() => {
        const keyFormatter = getHealthDetailsKeyFormatter(component.name)
        return keyFormatter(component.name)
    }, [component])

    const statusColor = useMemo(() => {
        return getHealthStatusColor(component.status)
    }, [component])

    const formattedKey = useCallback((key: string) => {
        const fullKey = `${component.name}.${key}`
        const keyFormatter = getHealthDetailsKeyFormatter(fullKey)
        return keyFormatter(key)
    }, [component])

    const formattedValue = useCallback((key: string, value: JsonValue) => {
        const fullKey = `${component.name}.${key}`
        const valueFormatter = getHealthDetailsValueFormatter(fullKey)
        return valueFormatter(value)
    }, [component])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-between">
                        <span>{name}</span>
                        <span className={cn(statusColor)}>{component.status}</span>
                    </div>
                </CardTitle>
            </CardHeader>
            {component.details && (
                <CardContent>
                    {Object.entries(component.details).map(([key, value]) => (
                        <div className="flex items-center justify-between">
                            <span>{formattedKey(key)}</span>
                            <span>{formattedValue(key, value)}</span>
                        </div>
                    ))}
                </CardContent>
            )}
        </Card>
    )
}