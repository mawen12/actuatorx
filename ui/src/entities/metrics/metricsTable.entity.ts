import MetricDetails from '@/pages/metrics/components/MetricDetails.vue'

export const metricsTableEntity = {
    id: 'metricsTableEntity',
    showToolbar: true,
    itemValue: 'name',
    headers: [
        {
            key: 'data-table-expand',
        },
        {
            title: 'Name',
            key: 'name',
            sortable: true,
            align: 'start',
        },
    ],
    rowAction: {
        type: 'Details',
        component: MetricDetails,
    },
    massActions: [],
    globalActions: [],
    filterData: (data, filter) => {
        if (filter && filter !== '') {
            const lower = filter.toLowerCase()
            return data.filter((item) => item.search.includes(lower))
        }
        return data
    },
}
