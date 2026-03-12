import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'

export const evictCache = async (variables) => {
  return (await axiosInstance.delete(`caches/${variables.cacheManager}/${variables.cacheName}`))
    .data
}

export const useEvictCache = (options) => useBaseMutation(evictCache, options)
