import type { ConditionMatchView } from "@/apis/requests/endpoints/conditions/getConditions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ConditionDetailProps {
    condition: ConditionMatchView
}

export function ConditionDetail({ condition }: ConditionDetailProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {condition.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {condition.value && condition.value.map((match) => (
                    <div>
                        <div>{match.condition}</div>
                        <div>{match.message}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}