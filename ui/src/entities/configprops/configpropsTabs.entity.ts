import {configpropsTableEnitty} from './configpropsTable.entity'
import ConfigpropsTable from '@/pages/configprops/components/ConfigpropsTable.vue'

export const configpropsTabsEntity = {
    id: 'configpropsTabsEntity',
    showSearchToolbar: true,
    showOnlyOneTab: true,
    lazy: true,
    getTabs: (data) => {
        return data.map((context, index) => {
            return {
                name: context.name,
                label: context.name,
                entity: configpropsTableEnitty,
                componentType: 'Table',
                component: ConfigpropsTable,
                getTabData: (tabData) => tabData[index].value,
            }
        })
    },
    filterData: (data, filter, customFilters) => {
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
