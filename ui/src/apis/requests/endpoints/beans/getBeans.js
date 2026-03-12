import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'

export const getBeans = async (variables) => {
  const data = (await axiosInstance.get(`beans`)).data

  const result = Object.entries(data.contexts).map(([key, value]) => ({
    name: key,
    value: Object.entries(value.beans).map(([beanName, bean]) => {
      const index = bean.type.lastIndexOf('.')
      const shortName = index > 0 ? bean.type.substring(index + 1) : beanName
      const typePackage = index > 0 ? bean.type.substring(0, index) : 'default'
      return {
        ...bean,
        name: beanName,
        shortName,
        package: typePackage,
        search: `${beanName.toLowerCase()}${bean.type.toLowerCase()}`,
      }
    }),
  }))

  return result
}

export const useGetBeans = (options) => useBaseMutation(getBeans, options)

export const useGetBeansQuery = (variables, options) =>
  useBaseQuery(apiKeys.itemBeans(), getBeans, variables, options)
