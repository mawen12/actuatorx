import { useState } from "react"
import { useCopyToClipboard } from "./use-copy-to-clipboard"

export const useCopyFeedback = (options) => {
    const {timeout = 1500, getKey} = options

    const copiedKey = useState<string | undefined>(undefined)

    const {copy} = useCopyToClipboard()

    const {start, stop} = useTimeoutFn(() => (copiedKey.value = undefined), timeout, {
        immediate: false,
    })

    const copyItem = async (value, item) => {
        await copy(value)
        copiedKey.value = getKey(item)
        stop()
        start()
    }

    const isCopied = (item) => copiedKey.value === getKey(item)

    return {
        copiedKey,
        copyItem,
        isCopied,
    }
}
