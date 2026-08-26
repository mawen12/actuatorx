import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface ThreadResponse {
    threads: Thread[]
}

interface Thread {
    threadName: string
    threadId: number
    blockedTime: number
    blockedCount: number
    waitedTime: number
    waitedCount: number
    lockOwnerId: number
    daemon: boolean
    inNative: boolean
    suspend: boolean
    threadState: string
    priority: number
    stackTrace: StackFrame[]
    lockedMonitors: LockedMonitor[]
    lockedSynchronizers: LockInfo[]
    lockInfo: LockInfo
}

interface StackFrame {
    moduleName: string
    moduleVersion: string
    methodName: string
    fileName: string
    lineNumber: number
    className: string
    nativeMethod: string
}

interface LockedMonitor {
    lockInfo: LockInfo
    lockedStackDepth: number
    lockedStackFrame: StackFrame
}

interface LockInfo {
    className: string
    identifyHashCode: string
}

interface ThreadView extends Thread {
    search: string
}

export const getThreaddump = async (): Promise<ThreadView[]> => {
    const data = (await axiosInstance.get<ThreadResponse>(`threaddump`)).data

    return data.threads.map((t) => ({
        ...t,
        search: `${t.threadId}${t.threadName.toLowerCase()}${t.threadState.toLowerCase()}`,
    }))
}

export const useGetThreaddump = (options: BaseMutationOptions<ThreadView[], void>) => useBaseMutation(getThreaddump, options)

export const useGetThreaddumpQuery = (variables: void, options: BaseQueryOptions<ThreadView[], void>) =>
    useBaseQuery(apiKeys.itemThreaddump(), getThreaddump, variables, options)
