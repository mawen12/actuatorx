import MappingDetail from '@/pages/mappings/components/MappingDetail.vue'

export const mappingsTableEnitty = {
    id: 'mappingsTableEnitty',
    itemValue: 'uid',
    showToolbar: false,
    headers: [
        {
            key: 'data-table-expand',
        },
        {
            title: 'URL',
            key: 'url',
            sortable: true,
            align: 'start',
            width: '30%',
            cellProps: {
                class: 'text-break',
            },
        },
        {
            title: 'Handler',
            key: 'handler',
            sortable: true,
            align: 'start',
            width: 'calc(60%-48px)',
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
        component: MappingDetail,
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
