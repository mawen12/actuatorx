import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getConditions = async (variables) => {
  const data = (await axiosInstance.get(`conditions`)).data

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
