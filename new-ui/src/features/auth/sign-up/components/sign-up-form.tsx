import { IconFacebook } from "@/assets/brand-icons/icon-facebook";
import { IconGithub } from "@/assets/brand-icons/icon-github";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
    .object({
        email: z.string().min(1, "Please enter your email.").email('Please enter a valid email.'),
        password: z.string().min(1, 'Please enter your password.').max(7, 'Password must be at most 7 characters long.'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: `Password don't match.`,
        path: ['confirmPassword'],
    })

export function SignUpForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    const sleep = (ms: number = 1000) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        toast.promise(sleep(2000), {
            loading: 'Creating account...',
            success: () => {
                setIsLoading(false)
                return `Account created for ${data.email}.`
            },
            error: 'Error',
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
                        <Input  {...field} />
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
                        <FieldLabel>Password</FieldLabel>
                        <PasswordInput placeholder='' {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name='confirmPassword'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Confirm Password</FieldLabel>
                        <PasswordInput placeholder='********' {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Button type='submit' className='mt-2' disabled={isLoading}>
                {isLoading ? <Loader2 className='animate-spin'/> : <UserPlus/>}
                Create Account
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