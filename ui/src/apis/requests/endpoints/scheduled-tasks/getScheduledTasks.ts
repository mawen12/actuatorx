import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {v4 as uuidv4} from 'uuid'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getScheduledTasks = async (variables) => {
    const result = (await axiosInstance.get(`scheduledtasks`, {
        params: {
            url: connectUrl.value,
        }
    })).data
    return Object.fromEntries(
        Object.entries(result).map(([key, arr]) => [
            key,
            arr.map((item) => ({
                ...item,
                search: item.runnable.target.toLowerCase(),
                uid: uuidv4,
            })),
        ]),
    )
}

export const useGetScheduldTasks = (options) =>
    useBaseMutation(getScheduledTasks, options)

export const useGetScheduldTasksQuery = (variables, options) =>
    useBaseQuery(
        apiKeys.itemScheduledTasks(),
        getScheduledTasks,
        variables,
        options,
    )
