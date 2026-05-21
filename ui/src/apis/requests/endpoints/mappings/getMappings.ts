import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useBaseQuery} from '@/apis/requests/base/useBaseQuery'
import {apiKeys} from '@/apis/apiKeys'
import {v4 as uuidv4} from 'uuid'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const getMappings = async (variables) => {
    const data = (await axiosInstance.get(`mappings`, {
        params: {
            url: connectUrl.value,
        }
    })).data

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

function dispatcherServletsToArray(dispatcherServlets) {
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
