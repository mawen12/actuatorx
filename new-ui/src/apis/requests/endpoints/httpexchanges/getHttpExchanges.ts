import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery';
import { DateTime, Duration } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

interface HttpExchangeResponse {
    exchanges: HttpExchange[]
}

interface HttpExchange {
    timestamp: string
    request: HttpRequest
    response: HttpResponse
    timeTaken: string
}

interface HttpRequest {
    uri: string
    method: string
    headers: Record<string, string[]>
}

interface HttpResponse {
    status: number
    headers: Record<string, string[]>
}

interface HttpExchangeView extends Omit<HttpExchange, "timestamp"> {
    search: string
    cost: number
    timestamp: string | null
    uid: string
}

export const getHttpExchanges = async (): Promise<HttpExchangeView[]> => {
    const result = (await axiosInstance.get<HttpExchangeResponse>(`httpexchanges`)).data.exchanges

    return result.map((exchange) => ({
        ...exchange,
        search: `${exchange.request.method.toLowerCase()}${exchange.request.uri.toLowerCase()}`,
        cost: Duration.fromISO(exchange.timeTaken).toMillis(),
        timestamp: DateTime.fromISO(exchange.timestamp).toISO(),
        uid: uuidv4(),
    }))
}

export const useGetHttpExchanges = (options: BaseMutationOptions<HttpExchangeView[], void>) => useBaseMutation(getHttpExchanges, options)

export const useGetHttpExchangesQuery = (variables: void, options: BaseMutationOptions<HttpExchangeView[], void>) =>
    useBaseQuery(apiKeys.itemHttpExchanges(), getHttpExchanges, variables, options)
