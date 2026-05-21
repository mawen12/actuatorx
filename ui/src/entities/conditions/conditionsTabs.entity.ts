import ConditionsTable from '@/pages/conditions/components/ConditionsTable.vue'
import {conditionsTableEnitty} from './conditionsTable.entity'
import ConditionCustomFilter from '@/pages/conditions/components/ConditionCustomFilter.vue'

export const conditionsTabsEntity = {
    id: 'conditionsTabsEntity',
    showSearchToolbar: true,
    showOnlyOneTab: true,
    lazy: true,
    getTabs: (data) => {
        return data.map((context, index) => {
            return {
                name: context.name,
                label: context.name,
                entity: conditionsTableEnitty,
                componentType: 'Table',
                component: ConditionsTable,
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
                    (b) => b.search.includes(lower) && (!customFilters.type || b.type === customFilters.type),
                ),
            }))
        }
        return data.map((item) => ({
            ...item,
            value: item.value.filter((b) => !customFilters?.type || b.type === customFilters.type),
        }))
    },
    customFilterComponent: ConditionCustomFilter,
}
