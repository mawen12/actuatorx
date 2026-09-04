import type { MappingView } from "@/apis/requests/endpoints/mappings/getMappings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface MappingDetailProps {
    mapping: MappingView
}

export function MappingDetail({ mapping }: MappingDetailProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {mapping.type}
                </CardTitle>
                <CardDescription>
                    {mapping.handler}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {mapping.method}
            </CardContent>
        </Card>
    )
}