import {ref} from 'vue'
import {useClipboard, useTimeoutFn} from '@vueuse/core'

export const useCopyFeedback = (options) => {
    const {timeout = 1500, getKey} = options

    const copiedKey = ref(undefined)

    const {copy} = useClipboard()

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
