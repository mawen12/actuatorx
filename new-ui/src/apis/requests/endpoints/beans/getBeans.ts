import { apiKeys } from '@/apis/apiKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation, type BaseMutationOptions } from '@/apis/requests/base/useBaseMutation';
import { useBaseQuery, type BaseQueryOptions } from '@/apis/requests/base/useBaseQuery';

interface BeanResponse {
    contexts: Record<string, BeansContext>
}

interface BeansContext {
    parentId: string
    beans: Record<string, Bean>
}

interface Bean {
    aliases: string[]
    scope: string
    type: string
    resource: string
    dependencies: string[]
}

interface BeanView extends Bean {
    name: string
    shortName: string
    package: string
    search: string
}

interface BeanContextGroup {
    name: string
    value: BeanView[]
}

export const getBeans = async (): Promise<BeanContextGroup[]> => {
    const data = (await axiosInstance.get<BeanResponse>(`beans`)).data

    return Object.entries(data.contexts).map(([key, value]) => ({
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
}

export const useGetBeans = (options: BaseMutationOptions<BeanContextGroup[], void>) => useBaseMutation(getBeans, options)

export const useGetBeansQuery = (variables: void, options: BaseQueryOptions<BeanContextGroup[], void>) =>
    useBaseQuery(apiKeys.itemBeans(), getBeans, variables, options)
