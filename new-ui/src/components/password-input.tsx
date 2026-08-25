import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, type Ref } from "react";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement>
}

export function PasswordInput({ className, disabled, ref, ...props }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    const {value} = props

    return (
        <InputGroup className={className}>
            <InputGroupInput ref={ref} disabled={disabled} type={showPassword ? 'text' : 'password'} className={cn(className)} {...props}/>
            <InputGroupAddon align='inline-end'>
                <Button
                    aria-haspopup="true"
                    size='icon'
                    variant={'ghost'}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={cn(value === '' && 'hidden')}
                >
                    {showPassword ? <Eye /> : <EyeOff />}
                </Button>
            </InputGroupAddon>
        </InputGroup>
    )
}