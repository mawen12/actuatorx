import { useCallback, useEffect, useRef, useState } from "react"
import { useCopyToClipboard } from "./use-copy-to-clipboard"

interface UseCopyFeedbackOptions<T> {
    timeout?: number
    getKey: (item: T) => string
}

export function useCopyFeedback<T>({ timeout = 1500, getKey }: UseCopyFeedbackOptions<T>) {
    const [copiedKey, setCopiedKey] = useState<string | undefined>(undefined)
    const copy = useCopyToClipboard()
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

    useEffect(() => () => clearTimeout(timer.current), [])

    const copyItem = useCallback(async(value: string, item: T) => {
        const ok = await copy(value)
        if (!ok) return
        setCopiedKey(getKey(item))
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopiedKey(undefined), timeout)
    }, [copy, getKey, timeout])

    const isCopied = useCallback((item: T) => copiedKey === getKey(item), [copiedKey, getKey])
    
    return {
        copiedKey,
        copyItem,
        isCopied,
    }
}
