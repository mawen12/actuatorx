import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface CacheResponse {
    cacheManagers: Record<string, CacheManager>
}

interface CacheManager {
    caches: Record<string, Cache>
}

interface Cache {
    target: string
}

interface CacheView extends Cache {
    name: string
    cacheManager: string
    search: string
}

export const getCaches = async (): Promise<CacheView[]> => {
    const result = (await axiosInstance.get<CacheResponse>(`caches`)).data

    return Object.entries(result.cacheManagers).flatMap(([cacheManager, manager]) =>
        Object.entries(manager.caches).map(([name, cache]) => ({
            ...cache,
            name,
            cacheManager,
            search: `${name.toLowerCase()}${cacheManager.toLowerCase()}${cache.target.toLowerCase()}`,
        })),
    )
}

export const useGetCaches = (options: BaseMutationOptions<CacheView[], void>) => useBaseMutation(getCaches, options)

export const useGetCachesQuery = (variables: void, options: BaseQueryOptions<CacheView[], void>) =>
    useBaseQuery(apiKeys.itemCaches(), getCaches, variables, options)
