import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getConfigprops = async (variables) => {
  const data = (await axiosInstance.get(`configprops`)).data

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

export const useGetConfigprops = (options) => useBaseMutation(getConfigprops, options)

export const useGetConfigpropsQuery = (variables, options) =>
  useBaseQuery(apiKeys.itemConfigProps(), getConfigprops, variables, options)
