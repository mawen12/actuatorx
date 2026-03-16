import MappingsTable from '@/pages/mappings/components/MappingsTable.vue'
import {mappingsTableEnitty} from './mappingsTable.entity'
import MappingCustomFilter from '@/pages/mappings/components/MappingCustomFilter.vue'

export const mappingsTabsEntity = {
    id: 'mappingsTabsEntity',
    showSearchToolbar: true,
    showOnlyOneTab: true,
    lazy: true,
    getTabs: (data) => {
        return data.map((context, index) => {
            return {
                name: context.name,
                label: context.name,
                entity: mappingsTableEnitty,
                componentType: 'Table',
                component: MappingsTable,
                getTabData: (tabData) => tabData[index].value,
            }
        })
    },
    filterData: (data, filter, customFilters) => {
        if (filter && filter !== '') {
            const lower = filter.trim().toLowerCase()
            return data.map((item) => ({
                ...item,
                value: item.value.filter(
                    (b) =>
                        b.search.includes(lower) && (!customFilters?.type || b.type === customFilters?.type),
                ),
            }))
        }
        return data.map((item) => ({
            ...item,
            value: item.value.filter((b) => !customFilters?.type || b.type === customFilters?.type),
        }))
    },
    customFilterComponent: MappingCustomFilter,
}
