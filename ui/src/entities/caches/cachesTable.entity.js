export const cachesTableEntity = {
    id: 'cachesTableEntity',
    showToolbar: true,
    itemValue: 'name',
    headers: [
        {
            title: 'Name',
            key: 'name',
            sortable: true,
            align: 'start',
            width: '20%',
        },
        {
            title: 'Cache Manager',
            key: 'cacheManager',
            sortable: true,
            align: 'start',
            width: '20%',
        },
        {
            title: 'Target',
            key: 'target',
            sortable: true,
            align: 'start',
            width: 'calc(50% - 48px)',
        },
        {
            title: 'Actions',
            key: 'actions',
            sortable: false,
            align: 'center',
            width: '10%',
        },
    ],
    massActions: [],
    globalActions: [
        {
            id: 'evictAll',
            label: 'Evict All',
            icon: 'mdi-broom',
        },
    ],
    filterData: (data, filter) => {
        if (filter && filter !== '') {
            const lower = filter.toLowerCase()
            return data.filter((item) => item.search.includes(lower))
        }
        return data
    },
}
