import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getCaches = async (variables) => {
    const result = (await axiosInstance.get(`caches`, {
        params: {
            url: connectUrl.value,
        }
    })).data

    return Object.entries(result.cacheManagers).flatMap(([cacheManager, manager]) =>
        Object.entries(manager.caches).map(([name, cache]) => ({
            ...cache,
            name,
            cacheManager,
            search: `${name.toLowerCase()}${cacheManager.toLowerCase()}${cache.target.toLowerCase()}`,
        })),
    )
}

export const useGetCaches = (options) => useBaseMutation(getCaches, options)

export const useGetCachesQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemCaches(), getCaches, variables, options)
