import { AuthLayout } from "@/components/layout/auth-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ForgotPasswordForm } from "./components/forgot-password-form";

export function ForgotPassword() {
    return (
        <AuthLayout>
            <Card className="max-w-md gap-4 sm:min-w-sm">
                <CardHeader>
                    <CardTitle className="text-lg tracking-tight">
                        Forgot password
                    </CardTitle>
                    <CardDescription>
                        Enter your registered email and <br /> we will send you a link to
                        reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm/>
                </CardContent>
                <CardFooter>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Don't jave an account?{' '}
                        <Link
                            to="/sign-up"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </AuthLayout>
    )
}