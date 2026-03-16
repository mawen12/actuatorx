import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')


export const evictAllCaches = async (variables) => {
    return (await axiosInstance.delete(`caches`, {
        params: {
            url: connectUrl.value,
        }
    })).data
}

export const useEvictAllCaches = (options) => useBaseMutation(evictAllCaches, options)
