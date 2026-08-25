import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';

interface EvictCacheRequest {
    cacheManager: string
    cacheName: string
}

export const evictCache = async (variables: EvictCacheRequest): Promise<void> => {
    return (await axiosInstance.delete(`caches/${variables.cacheManager}/${variables.cacheName}`)).data
}

export const useEvictCache = (options: BaseMutationOptions<void, EvictCacheRequest>) => useBaseMutation(evictCache, options)
