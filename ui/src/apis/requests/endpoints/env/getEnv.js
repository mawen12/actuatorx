import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getEnv = async (variables) => {
  const data = (await axiosInstance.get(`env`)).data

  for (let propertySource of data.propertySources) {
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

export const useGetEnv = (options) => useBaseMutation(getEnv, options)

export const useGetEnvQuery = (variables, options) =>
  useBaseQuery(apiKeys.itemEnv(), getEnv, variables, options)
