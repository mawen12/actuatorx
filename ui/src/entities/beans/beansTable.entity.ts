import BeanDetail from '@/pages/beans/components/BeanDetail.vue'

export const beansTableEntity = {
    id: 'beansTableEntity',
    itemValue: 'name',
    showToolbar: false,
    headers: [
        {
            key: 'data-table-expand',
        },
        {
            title: 'Name',
            key: 'shortName',
            sortable: true,
            align: 'start',
            width: '30%',
            cellProps: {
                class: 'text-break',
            },
        },
        {
            title: 'Package',
            sortable: true,
            key: 'package',
            align: 'start',
            width: 'calc(50% - 48px)',
            cellProps: {
                class: 'text-break',
            },
        },
        {
            title: 'Scope',
            key: 'scope',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            sortable: false,
            width: '10%',
        },
    ],
    rowAction: {
        type: 'Details',
        component: BeanDetail,
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
