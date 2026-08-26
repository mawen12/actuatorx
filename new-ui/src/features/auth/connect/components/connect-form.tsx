import { useConnect } from "@/apis/requests/endpoints/connect/connect";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const authTypes = [
    { label: 'No Auth', value: 'no' },
    { label: 'Basic Auth', value: 'basic' },
    { label: 'Bearer Token', value: 'token' }
]

const formSchema = z.object({
    url: z.url({
        error: (iss) => (iss.input === '' ? 'Please enter actuator endpoint.' : undefined),
    }),
    authType: z.enum(["no", "basic", "token"]),
    username: z.string(),
    password: z.string(),
    token: z.string(),
})

export interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
    redirectTo?: string
}

export function ConnectForm({ className, redirectTo, ...props }: UserAuthFormProps) {
    const connectState = useConnect()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
            authType: 'no',
            username: '',
            password: '',
            token: '',
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        toast.promise(connectState.mutateAsync(data), {
            loading: 'Connect...',
            success: () => {
                setIsLoading(false)

                const redirectPath = redirectTo || '/health'
                navigate({ to: redirectPath, replace: true })

                return `Connect success`
            },
            error: (e) => {
                return e
            }
        })
    }

    const authType = useWatch({
        control: form.control,
        name: 'authType',
    })

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('grid gap-3', className)}
            {...props}
        >
            <Controller
                control={form.control}
                name='url'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>URL</FieldLabel>
                        <Input placeholder="http://localhost:8080/actuator" {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name='authType'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Select Auth Type</FieldLabel>
                        <Select items={authTypes} onValueChange={field.onChange} {...field}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {authTypes.map((authType) => (
                                    <SelectItem key={authType.value} value={authType.value}>
                                        {authType.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            {authType === 'basic' && (
                <>
                    <Controller
                        control={form.control}
                        name='username'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Username</FieldLabel>
                                <Input {...field} />
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
                                <PasswordInput {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </>
            )}
            {authType === 'token' && (
                <Controller
                    control={form.control}
                    name='token'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Token</FieldLabel>
                            <Input {...field} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            )}

            <Button type='submit' className='mt-2' disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
                Connect
            </Button>
        </form>
    )
}