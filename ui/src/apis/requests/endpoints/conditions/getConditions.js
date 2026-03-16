import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getConditions = async (variables) => {
    const data = (await axiosInstance.get(`conditions`, {
        params: {
            url: connectUrl.value,
        }
    })).data

    const result = Object.entries(data.contexts).map(([key, value]) => ({
        name: key,
        value: [
            ...Object.entries(value.positiveMatches).map(([name, matches]) => ({
                value: matches,
                type: 'positiveMatches',
                name,
                search: name.toLowerCase(),
            })),
            ...Object.entries(value.negativeMatches).map(([name, matches]) => ({
                ...matches,
                type: 'negativeMatches',
                name,
                search: name.toLowerCase(),
            })),
            ...value.unconditionalClasses.map((clazz) => ({
                name: clazz,
                type: 'unconditional',
                search: clazz.toLowerCase(),
            })),
        ],
    }))

    return result
}

export const useGetConditions = (options) => useBaseMutation(getConditions, options)

export const useGetConditionsQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemConditions(), getConditions, variables, options)
