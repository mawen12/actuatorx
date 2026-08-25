import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    otp: z.string().min(6, 'Please enter the 6-digit code.').max(6, 'Please enter the 6-digit code.')
})

export function OtpForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: ''
        }
    })

    const otp = form.watch('otp')

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(false)
        setTimeout(() => {
            setIsLoading(true)
            navigate({ to: '/' })
        }, 1000)
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('grid gap-2', className)}
            {...props}
        >
            <Controller
                control={form.control}
                name='otp'
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className="sr-only">One-Time Password</FieldLabel>
                        <InputOTP
                            maxLength={6}
                            {...field}
                            containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Button type='submit' className='mt-2' disabled={otp.length < 6 || isLoading}>
                Verify
            </Button>
        </form>
    )
}