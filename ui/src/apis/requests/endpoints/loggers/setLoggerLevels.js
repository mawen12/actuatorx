import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { apiKeys } from '@/apis/apiKeys'

export const setLoggerLevel = async (variables) => {
  return (
    await axiosInstance.post(`loggers`, null, {
      params: {
        name: variables.loggerName,
        level: variables.level,
      },
    })
  ).data
}

export const useSetLoggerLevel = (options) =>
  useBaseMutation(setLoggerLevel, {
    ...options,
    invalidateQueriesKeyFn: (data, variables) => apiKeys.itemLoggers(),
  })
