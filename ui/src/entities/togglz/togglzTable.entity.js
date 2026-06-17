import TogglzDetail from "@/pages/togglz/components/TogglzDetail.vue";

export const togglzTableEntity = {
    id: 'togglzTableEntity',
    showToolbar: true,
    itemValue: 'name',
    headers: [
        // {
        //     key: 'data-table-expand',
        // },
        {
            title: 'Name',
            key: 'name',
            sortable: true,
            align: 'start',
            width: '60%',
            cellProps: {
                class: 'text-break',
            },
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
        // type: 'Details',
        // component: TogglzDetail,
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
