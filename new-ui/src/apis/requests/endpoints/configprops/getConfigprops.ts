import { apiKeys, type JsonValue } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery';

interface ConfigpropsResponse {
    contexts: Record<string, ConfigpropsContext>
}

interface ConfigpropsContext {
    parentId: string
    beans: Record<string, ConfigpropsBean>
}

interface ConfigpropsBean {
    prefix: string
    inputs: Record<string, JsonValue>
    properties: Record<string, JsonValue>
}

interface ConfigpropsContextGroup {
    name: string
    value: ConfigpropsBeanView[]
}

interface ConfigpropsBeanView extends ConfigpropsBean {
    file: string
    search: string
}


export const getConfigprops = async (): Promise<ConfigpropsContextGroup[]> => {
    const data = (await axiosInstance.get<ConfigpropsResponse>(`configprops`)).data

    const result = Object.entries(data.contexts).map(([key, value]) => ({
        name: key,
        value: [
            ...Object.entries(value.beans).map(([name, bean]) => ({
                ...bean,
                file: name.includes('-') ? name.split('-')[1] : name,
                search: name.toLowerCase(),
            })),
        ],
    }))

    return result
}

export const useGetConfigprops = (options: BaseMutationOptions<ConfigpropsContextGroup[], void>) => useBaseMutation(getConfigprops, options)

export const useGetConfigpropsQuery = (variables: void, options: BaseMutationOptions<ConfigpropsContextGroup[], void>) =>
    useBaseQuery(apiKeys.itemConfigProps(), getConfigprops, variables, options)
