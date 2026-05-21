import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {v4 as uuidv4} from 'uuid'
import {DateTime, Duration} from 'luxon'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getHttpExchanges = async (variables) => {
    const result = (await axiosInstance.get(`httpexchanges`, {
        params: {
            url: connectUrl.value,
        }
    })).data.exchanges

    return result.map((exchange) => ({
        ...exchange,
        search: `${exchange.request.method.toLowerCase()}${exchange.request.uri.toLowerCase()}`,
        cost: Duration.fromISO(exchange.timeTaken).toMillis(),
        timestamp: DateTime.fromISO(exchange.timestamp).toISO(),
        uid: uuidv4(),
    }))
}

export const useGetHttpExchanges = (options) => useBaseMutation(getHttpExchanges, options)

export const useGetHttpExchangesQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemHttpExchanges(), getHttpExchanges, variables, options)
