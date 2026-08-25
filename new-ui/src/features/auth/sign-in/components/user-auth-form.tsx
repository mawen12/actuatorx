import { IconFacebook } from "@/assets/brand-icons/icon-facebook";
import { IconGithub } from "@/assets/brand-icons/icon-github";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.email({
        error: (iss) => (iss.input === '' ? 'Please enter your email.' : undefined),
    }),
    password: z
        .string()
        .min(1, 'Please enter your password.')
        .max(7, 'Password must be at most 7 characters long.')
})

export interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
    redirectTo?: string
}

export function UserAuthForm({ className, redirectTo, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    // const { auth } = useAuthStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const sleep = (ms: number = 1000) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        toast.promise(sleep(2000), {
            loading: 'Signing in...',
            success: () => {
                setIsLoading(false)

                const redirectPath = redirectTo || '/'
                navigate({ to: redirectPath, replace: true })

                return `Welcome back, ${data.email}`
            },
            error: 'Error'
        })
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('grid gap-3', className)}
            {...props}
        >
            <Controller
                control={form.control}
                name='email'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Email</FieldLabel>
                        <Input placeholder="name@example.com" {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name='password'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className="flex items-center justify-between">
                            <FieldLabel>Password</FieldLabel>
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-muted-foreground hover:opacity-75"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <PasswordInput placeholder='********' {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Button type='submit' className='mt-2' disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
                Sign in
            </Button>

            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-b" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button variant='outline' type='button' disabled={isLoading}>
                    <IconGithub className="size-4" /> Github
                </Button>
                <Button variant='outline' type='button' disabled={isLoading}>
                    <IconFacebook className="size-4" /> Facebook
                </Button>
            </div>
        </form>
    )
}