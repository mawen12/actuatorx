import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/context/theme-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// const fonts = ['inter', 'manrope', 'system'] as const

const appearanceFormSchema = z.object({
    theme: z.enum(['light', 'dark']),
    // font: z.enum(fonts),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
    const { resolvedTheme, setTheme } = useTheme()

    const form = useForm<AppearanceFormValues>({
        resolver: zodResolver(appearanceFormSchema),
        defaultValues: {
            theme: resolvedTheme as 'light' | 'dark'
        }
    })

    function onSubmit(data: AppearanceFormValues) {
        if (data.theme != resolvedTheme) setTheme(data.theme)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Controller
                control={form.control}
                name='theme'
                render={({ field, fieldState }) => (
                    <FieldSet data-invalid={fieldState.invalid}>
                        <FieldLegend>Theme</FieldLegend>
                        <FieldDescription>Select the theme for the dashboard.</FieldDescription>
                        <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            className='grid max-w-md grid-cols-2 gap-8 pt-2'
                        >
                            <div>
                                <FieldLabel htmlFor="light" className="*:data-[slot=field]:p-0.5 has-data-checked:border-primary dark:has-data-checked:border-primary">
                                    <Field>
                                        <FieldContent className="p-0">
                                            <div className='space-y-2 rounded-lg border-muted bg-[#ecedef] p-2'>
                                                <div className='space-y-2 rounded-md bg-white p-2 shadow-xs'>
                                                    <div className='h-2 w-20 rounded-lg bg-[#ecedef]' />
                                                    <div className='h-2 w-25 rounded-lg bg-[#ecedef]' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs'>
                                                    <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                                                    <div className='h-2 w-25 rounded-lg bg-[#ecedef]' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs'>
                                                    <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                                                    <div className='h-2 w-25 rounded-lg bg-[#ecedef]' />
                                                </div>
                                            </div>
                                        </FieldContent>
                                        <RadioGroupItem value='light' className='sr-only hidden' id='light' />
                                    </Field>
                                </FieldLabel>
                                <span className="block w-full p-2 text-center font-normal">
                                    Light
                                </span>
                            </div>
                            <div>
                                <FieldLabel htmlFor="dark" className="*:data-[slot=field]:p-0.5 has-data-checked:border-primary dark:has-data-checked:border-primary">
                                    <Field>
                                        <FieldContent className="p-0">
                                            <div className='space-y-2 rounded-lg border-muted bg-slate-950 p-2'>
                                                <div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                                                    <div className='h-2 w-20 rounded-lg bg-slate-400' />
                                                    <div className='h-2 w-25 rounded-lg bg-slate-400' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                                                    <div className='h-4 w-4 rounded-full bg-slate-400' />
                                                    <div className='h-2 w-25 rounded-lg bg-slate-400' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                                                    <div className='h-4 w-4 rounded-full bg-slate-400' />
                                                    <div className='h-2 w-25 rounded-lg bg-slate-400' />
                                                </div>
                                            </div>
                                        </FieldContent>
                                        <RadioGroupItem value='dark' className='sr-only hidden' id='dark' />
                                    </Field>
                                </FieldLabel>
                                <span className="block w-full p-2 text-center font-normal">
                                    Dark
                                </span>
                            </div>
                        </RadioGroup>
                    </FieldSet>
                )}
            />
            <Button type="submit">Update perferences</Button>
        </form>
    )
}