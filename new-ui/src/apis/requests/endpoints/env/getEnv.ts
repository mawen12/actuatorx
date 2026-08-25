import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery';

interface EnvResponse {
    activeProfiles: string[]
    propertySources: EnvPropertySource[]
}

interface EnvPropertySource {
    name: string
    properties: Record<string, EnvProperty> | EnvPropertyView[]
}

type JsonValue = | string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface EnvProperty {
    value: JsonValue
}

interface EnvPropertyView extends EnvProperty {
    name: string
    search: string
}

export const getEnv = async (): Promise<EnvResponse> => {
    const data = (await axiosInstance.get<EnvResponse>(`env`)).data

    for (const propertySource of data.propertySources) {
        if (Object.keys(propertySource.properties).length > 0) {
            const str = propertySource.name
            const match = str.match(/\[([^\]]+\.properties)\]/)
            propertySource.name = match ? match[1] : propertySource.name

            propertySource.properties = Object.entries(propertySource.properties).map(([key, obj]) => ({
                name: key,
                search: key.toLowerCase(),
                value: obj.value,
            }))
        } else {
            propertySource.properties = []
        }
    }

    return data
}

export const useGetEnv = (options: BaseMutationOptions<EnvResponse, void>) => useBaseMutation(getEnv, options)

export const useGetEnvQuery = (variables: void, options: BaseMutationOptions<EnvResponse, void>) =>
    useBaseQuery(apiKeys.itemEnv(), getEnv, variables, options)
