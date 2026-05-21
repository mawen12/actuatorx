import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getThreaddump = async (variables) => {
    const data = (await axiosInstance.get(`threaddump`, {
        params: {
            url: connectUrl.value,
        }
    })).data

    return data.threads.map((t) => ({
        ...t,
        search: `${t.threadId}${t.threadName.toLowerCase()}${t.threadState.toLowerCase()}`,
    }))
}

export const useGetThreaddump = (options) => useBaseMutation(getThreaddump, options)

export const useGetThreaddumpQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemThreaddump(), getThreaddump, variables, options)
