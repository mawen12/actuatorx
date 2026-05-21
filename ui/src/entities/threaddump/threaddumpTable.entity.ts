import ThreadDetail from "@/pages/threaddump/components/ThreadDetail.vue";

export const threaddumpTableEntity = {
    id: 'threaddumpTableEntity',
    showToolbar: true,
    itemValue: 'threadId',
    headers: [
        {
            key: 'data-table-expand',
        },
        {
            title: 'Id',
            key: 'threadId',
            sortable: true,
            align: 'center',
            width: '5%',
            cellProps: {
                class: 'text-break',
            },
        },
        {
            title: 'Name',
            key: 'threadName',
            sortable: true,
            align: 'start',
            width: '60%',
            cellProps: {
                class: 'text-break',
            },
        },
        {
            title: 'State',
            key: 'threadState',
            sortable: true,
            align: 'start',
            width: 'calc(70% - 48px)',
            cellProps: {
                class: 'text-break',
            },
        },
        {
            title: 'Daemon',
            key: 'daemon',
            align: 'center',
            width: '5%',
        },
        // {
        //     title: 'Actions',
        //     key: 'actions',
        //     align: 'center',
        //     sortable: false,
        //     width: '10%',
        // },
    ],
    rowAction: {
        type: 'Details',
        component: ThreadDetail,
    },
    massActions: [],
    globalActions: [
        {
            id: 'download',
            label: 'Download',
            icon: 'mdi-download',
        }
    ],
    getAnchor: (item) => item.id,
    filterData: (data, filter) => {
        if (filter && filter !== '') {
            const lower = filter.toLowerCase()
            return data.filter((item) => item.search.includes(lower))
        }
        return data
    },
}
