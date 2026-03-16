import {ref} from 'vue'

export function useAsyncData(asyncFunction) {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    async function execute(...args) {
        loading.value = false
        error.value = null

        try {
            data.value = await asyncFunction(...args)
        } catch (err) {
            error.value = err
            console.error('Async operation failed:', err)
        } finally {
            loading.value = false
        }
    }

    return {data, loading, error, execute}
}
