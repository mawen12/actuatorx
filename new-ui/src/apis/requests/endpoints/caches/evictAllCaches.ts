import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';

export const evictAllCaches = async () => {
    return (await axiosInstance.delete(`caches`)).data
}

export const useEvictAllCaches = (options: BaseMutationOptions<void, void>) => useBaseMutation(evictAllCaches, options)
