import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface ConditionResponse {
    contexts: Record<string, ConditionContext>
}

interface ConditionContext {
    negativeMatches: Record<string, ConditionNegativeMatch>
    positiveMatches: Record<string, ConditionMatch[]>
    unconditionalClasses: string[]
}

interface ConditionNegativeMatch {
    notMatched: ConditionMatch[]
    matched: ConditionMatch[]
}

interface ConditionMatch {
    condition: string
    message: string
}

export interface ConditionContextGroup {
    name: string
    value: ConditionMatchView[]
}

export interface ConditionMatchView {
    value?: ConditionMatch[]
    type: string
    name: string
    search: string
}

export const getConditions = async (): Promise<ConditionContextGroup[]> => {
    const data = (await axiosInstance.get<ConditionResponse>(`conditions`)).data

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

export const useGetConditions = (options?: BaseMutationOptions<ConditionContextGroup[], void>) => useBaseMutation(getConditions, options)

export const useGetConditionsQuery = (variables?: void, options?: BaseQueryOptions<ConditionContextGroup[], void>) =>
    useBaseQuery(apiKeys.itemConditions(), getConditions, variables, options)
