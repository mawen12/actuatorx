import { apiKeys } from '@/apis/apiKeys'
import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { v4 as uuidv4 } from 'uuid'

interface MappingResponse {
    contexts: Record<string, MappingsContext>
}

interface MappingsContext {
    mappings: Mappings
}

interface Mappings {
    dispatcherServlets: DispatcherServlet[]
    servlets: Servlet[]
    servletFilters: ServletFilter[]
}

interface DispatcherServlet {
    details?: Details
    handler: string
    predicate: string
}

interface Details {
    handlerMethod: HandlerMethod
    requestMappingConditions: RequestMappingConditions
}

interface HandlerMethod {
    className: string
    name: string
    descriptor: string
}

interface RequestMappingConditions {
    consumes: Produce[]
    headers: Header[]
    methods: string[]
    params: Header[]
    patterns: string[]
    produces: Produce[]
}

interface Produce {
    mediaType: string
    negated: boolean
}

interface Header {
    name: string
    negated: boolean
    value: string
}

interface Servlet {
    mappings: string[]
    name: string
    className: string
}

interface ServletFilter {
    servletNameMappings: string[]
    urlPatternMappings: string[]
    name: string
    className: string
}

interface MappingGroup {
    name: string
    value: 
}

interface MappingView {
    url: string
    method: string[]
    handler: string
    type: string
    uid: string
    search: string
}

export const getMappings = async () => {
    const data = (await axiosInstance.get<MappingResponse>(`mappings`)).data

    return Object.entries(data.contexts).map(([key, value]) => ({
        name: key,
        value: Object.entries(value.mappings).flatMap(([mappingType, mappings]) => {
            if (mappingType === 'dispatcherServlets') {
                return dispatcherServletsToArray(mappings)
            } else if (mappingType === 'servletFilters') {
                return servletFiltersToArray(mappings)
            } else if (mappingType === 'servlets') {
                return servletsToArray(mappings)
            }
            return []
        }),
    }))
}

function dispatcherServletsToArray(dispatcherServlets: Mappings) {
    try {
        const data = dispatcherServlets.dispatcherServlet
            .filter((ds) => ds.details !== null)
            .flatMap((ds) =>
                ds.details.requestMappingConditions.patterns.map((mapping) => ({
                    ...ds,
                    uid: uuidv4(),
                    url: mapping,
                    method: ds.details.requestMappingConditions.methods,
                    handler: `${ds.details.handlerMethod.className}#${ds.details.handlerMethod.name}`,
                    type: 'dispatcherServlet',
                    search: `${mapping.toLowerCase()}${ds.details.handlerMethod.className.toLowerCase()}${ds.details.handlerMethod.name.toLowerCase()}`,
                })),
            )
        return data
    } catch (err) {
        console.log('err is', err)
        return null
    }
}

function servletFiltersToArray(servletFilters) {
    return servletFilters.flatMap((sf) =>
        sf.urlPatternMappings.map((mapping) => ({
            ...sf,
            url: mapping,
            uid: uuidv4(),
            handler: `${sf.className}#${sf.name}`,
            type: 'servletFilter',
            search: `${mapping.toLowerCase()}${sf.className.toLowerCase()}${sf.name.toLowerCase()}`,
        })),
    )
}

function servletsToArray(servlets) {
    return servlets.flatMap((servlet) =>
        servlet.mappings.map((mapping) => ({
            ...servlet,
            url: mapping,
            uid: uuidv4(),
            handler: `${servlet.className}#${servlet.name}`,
            type: 'servlet',
            search: `${mapping.toLowerCase()}${servlet.className.toLowerCase()}${servlet.name.toLowerCase()}`,
        })),
    )
}

export const useGetMappings = (options) => useBaseMutation(getMappings, options)

export const useGetMappingsQuery = (variables, options) =>
    useBaseQuery(apiKeys.itemMappings(), getMappings, variables, options)
