import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const profileFromSchema = z.object({
    username: z
        .string('Please enter your username.')
        .min(2, 'Username must be at least 2 characters.')
        .max(30, 'Username must not be longer than 30 characters'),
    email: z.email({
        error: (iss) =>
            iss.input === undefined
                ? 'Please select an email to display.'
                : undefined
    }),
    bio: z
        .string()
        .min(4)
        .max(160),
    urls: z
        .array(z
            .object({ value: z.url('Please enter a valid URL.') }))
        .optional(),

})

type ProfileFormValues = z.infer<typeof profileFromSchema>

const defaultValues: Partial<ProfileFormValues> = {
    bio: 'I own a computer.',
    urls: [
        { value: 'https://shadcn.com' },
        { value: 'http://twitter.com/shadcn' }
    ]
}

export function ProfileForm() {

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFromSchema),
        defaultValues,
        mode: 'onChange',
    })

    const { fields, append } = useFieldArray({
        name: 'urls',
        control: form.control,
    })

    return (
        <form className="space-y-8">
            <Controller
                control={form.control}
                name='username'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Username</FieldLabel>
                        <Input {...field} placeholder="shadcn" />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        <FieldDescription>
                            This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
                        </FieldDescription>
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name='email'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Email</FieldLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder='Select a verified email to display' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        <FieldDescription>
                            You can manage verified email addresses in your{' '}
                            <Link to="/">email settings</Link>
                        </FieldDescription>
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name='bio'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Bio</FieldLabel>
                        <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        <FieldDescription>
                            You can <span>@mention</span> other users and organization to link to them.
                        </FieldDescription>
                    </Field>
                )}
            />
            <Button type="submit">
                Update profile
            </Button>
        </form>
    )
}