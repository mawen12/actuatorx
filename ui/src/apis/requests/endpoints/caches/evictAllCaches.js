import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'

export const evictAllCaches = async (variables) => {
  return (await axiosInstance.delete(`caches`)).data
}

export const useEvictAllCaches = (options) => useBaseMutation(evictAllCaches, options)
