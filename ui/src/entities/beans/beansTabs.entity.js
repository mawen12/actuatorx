import BeansTable from '@/pages/beans/components/BeansTable.vue'
import {beansTableEntity} from './beansTable.entity'

export const beansTabsEntity = {
    id: 'beansTabsEntity',
    showOnlyOneTab: true,
    showSearchToolbar: true,
    lazy: true,
    getTabs: (data) => {
        return data.map((context, index) => {
            return {
                name: context.name,
                entity: beansTableEntity,
                componentType: 'Table',
                component: BeansTable,
                getTabData: (tabData) => tabData[index].value,
            }
        })
    },
    filterData: (data, filter) => {
        if (filter && filter !== '') {
            const lower = filter.trim().toLowerCase()
            return data.map((item) => ({
                ...item,
                value: item.value.filter((b) => b.search.includes(lower)),
            }))
        }
        return data
    },
}
