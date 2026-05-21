import ConditionDetail from '@/pages/conditions/components/ConditionDetail.vue'

export const conditionsTableEnitty = {
    id: 'conditionsTableEnitty',
    itemValue: 'name',
    showToolbar: false,
    headers: [
        {
            key: 'data-table-expand',
        },
        {
            title: 'Name',
            key: 'name',
            sortable: true,
            align: 'start',
            width: 'calc(90%-48px)',
            cellProps: {
                class: 'text-break',
            },
        },
        {
            title: 'Type',
            key: 'type',
            sortable: true,
            align: 'center',
            width: '10%',
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
