import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const evictCache = async (variables) => {
    return (await axiosInstance.delete(`caches/${variables.cacheManager}/${variables.cacheName}`, {
        params: {
            url: connectUrl.value,
        }
    }))
        .data
}

export const useEvictCache = (options) => useBaseMutation(evictCache, options)
