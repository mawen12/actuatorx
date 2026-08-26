import { apiKeys } from '@/apis/apiKeys'
import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery'
import { v4 as uuidv4 } from 'uuid'

interface ScheduledTaskResponse {
    cron: Cron[]
    custom: Custom[]
    fixedDelay: FixedDelay[]
    fixedRate: FixedRate[]
}

interface Cron {
    expression: string
    nextExecution: string
    lastExecution: string
    runnable: string
}

interface Custom {
    runnable: string
    trigger: string
    lastExecution: LastExecution
}

interface FixedDelay {
    initialDelay: number
    interval: number
    lastExecution: LastExecution
    nextExecution: NextExecution
    runnable: string
}

interface FixedRate {
    initialDelay: number
    interval: number
    lastExecution: LastExecution
    runnable: string
}

interface LastExecution {
    time: string
    status: string
    exception: Exception
}

interface NextExecution {
    time: string
}

interface Exception {
    message: string
    type: string
}

interface ScheduledTaskView extends FixedDelay | FixedRate | Cron | Custom {
    search: string
    uid: string

}

export const getScheduledTasks = async (): Promise<ScheduledTaskView[]> => {
    const result = (await axiosInstance.get<ScheduledTaskResponse>(`scheduledtasks`)).data
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

export const useGetScheduldTasks = (options: BaseMutationOptions<ScheduledTaskView[], void>) =>
    useBaseMutation(getScheduledTasks, options)

export const useGetScheduldTasksQuery = (variables: void, options: BaseQueryOptions<ScheduledTaskView[], void>) =>
    useBaseQuery(
        apiKeys.itemScheduledTasks(),
        getScheduledTasks,
        variables,
        options,
    )
