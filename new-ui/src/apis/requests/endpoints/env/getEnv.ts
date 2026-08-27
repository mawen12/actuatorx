import { apiKeys, type BasicValue } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

export interface EnvResponse {
    activeProfiles: string[]
    propertySources: {
        name: string
        properties: Record<string, EnvProperty>
    }[]
}

export interface EnvProperty {
    value: BasicValue
}

export interface EnvPropertyView extends EnvProperty {
    name: string
    search: string
}

export interface EnvPropertySourceView {
    name: string
    properties: EnvPropertyView[]
}

export const getEnv = async (): Promise<EnvPropertySourceView[]> => {
    const data = (await axiosInstance.get<EnvResponse>(`env`)).data

    return data.propertySources?.map(propertySource => {
        const str = propertySource.name
        const match = str.match(/\[([^\]]+\.properties)\]/)
        const name = match ? match[1] : propertySource.name

        return {
            name: name,
            properties: Object.entries(propertySource.properties).map(([key, obj]) => ({
                name: key,
                search: key.toLowerCase(),
                value: obj.value,
            }))
        }
    })

    // for (const propertySource of data.propertySources) {
    //     if (Object.keys(propertySource.properties).length > 0) {
    //         const str = propertySource.name
    //         const match = str.match(/\[([^\]]+\.properties)\]/)
    //         propertySource.name = match ? match[1] : propertySource.name

    //         propertySource.properties = Object.entries(propertySource.properties).map(([key, obj]) => ({
    //             name: key,
    //             search: key.toLowerCase(),
    //             value: obj.value,
    //         }))
    //     } else {
    //         propertySource.properties = []
    //     }
    // }

    // return data
}

export const useGetEnv = (options: BaseMutationOptions<EnvPropertySourceView[], void>) => useBaseMutation(getEnv, options)

export const useGetEnvQuery = (variables?: void, options?: BaseQueryOptions<EnvPropertySourceView[], void>) =>
    useBaseQuery(apiKeys.itemEnv(), getEnv, variables, options)
