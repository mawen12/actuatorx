import type { ConfigpropsBeanView } from "@/apis/requests/endpoints/configprops/getConfigprops";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ConfigpropDetailProps {
    configprop: ConfigpropsBeanView
}

export function ConfigpropDetail({ configprop }: ConfigpropDetailProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {configprop.file}
                </CardTitle>
            </CardHeader>
            <CardContent>
                
            </CardContent>
        </Card>
    )
}