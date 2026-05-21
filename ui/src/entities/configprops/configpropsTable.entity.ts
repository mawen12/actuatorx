import ConditionDetail from '@/pages/conditions/components/ConditionDetail.vue'

export const configpropsTableEnitty = {
    id: 'configpropsTableEnitty',
    itemValue: 'prefix',
    showToolbar: false,
    headers: [
        {
            key: 'data-table-expand',
        },
        {
            title: 'Prefix',
            key: 'prefix',
            sortable: true,
            align: 'start',
            width: '30%',
            cellProps: {
                class: 'text-break',
            },
        },
        {
            title: 'Properties File',
            key: 'file',
            sortable: true,
            align: 'start',
            width: 'calc(70% - 48px)',
            cellProps: {
                class: 'text-break',
            },
        },
    ],
    rowAction: {
        type: 'Details',
        component: ConditionDetail,
    },
    massActions: [],
    globalActions: [],
    getAnchor: (item) => item.name,
    filterData: (data, filter) => {
        if (filter && filter !== '') {
            const lower = filter.toLowerCase()
            return data.filter((item) => item.search.includes(lower))
        }
        return data
    },
}
