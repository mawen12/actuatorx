import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
    .object({
        email: z.string().min(1, "Please enter your email.").email('Please enter a valid email.'),
    })

export function ForgotPasswordForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        }
    })

    const sleep = (ms: number = 1000) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        toast.promise(sleep(2000), {
            loading: 'Sending email...',
            success: () => {
                setIsLoading(false)
                form.reset()
                navigate({ to: '/otp' })

                return `Email sent to ${data.email}.`
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
            <Button type='submit' className='mt-2' disabled={isLoading}>
                Continue
                {isLoading ? <Loader2 className='animate-spin' /> : <ArrowRight />}
            </Button>
        </form>
    )
}