import { AuthLayout } from "@/components/layout/auth-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectForm } from "./components/connect-form";

export function Connect() {
    return (
        <AuthLayout>
            <Card className="w-sm gap-4">
                <CardHeader>
                    <CardTitle className="text-lg tracking-tight">Connect to actuator</CardTitle>
                </CardHeader>
                <CardContent>
                    <ConnectForm />
                </CardContent>
            </Card>
        </AuthLayout>
    )
}