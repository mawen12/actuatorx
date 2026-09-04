import type { BeanView } from "@/apis/requests/endpoints/beans/getBeans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface BeanDetailProps {
    bean: BeanView
}

export function BeanDetail({ bean }: BeanDetailProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {bean.type}
                </CardTitle>
                <CardDescription>
                    {bean.aliases}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {bean.dependencies}
            </CardContent>
        </Card>
    )
}