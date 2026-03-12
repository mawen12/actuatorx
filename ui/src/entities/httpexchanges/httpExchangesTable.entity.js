import HttpExchangeDetail from '@/pages/httpexchanges/components/HttpExchangeDetail.vue'

export const httpExchangesTableEntity = {
  id: 'httpExchangesTableEntity',
  showToolbar: true,
  itemValue: 'uid',
  headers: [
    {
      key: 'data-table-expand',
    },
    {
      title: 'Method',
      key: 'method',
      value: (item) => item.request.method,
      sortable: true,
      align: 'start',
      width: '10%',
    },
    {
      title: 'URI',
      key: 'uri',
      value: (item) => item.request.uri,
      sortable: true,
      align: 'start',
      width: 'calc(55%-48px)',
    },
    {
      title: 'Status',
      key: 'status',
      value: (item) => item.response.status,
      sortable: true,
      align: 'center',
      width: '10%',
    },
    {
      title: 'Time Taken',
      key: 'cost',
      sortable: true,
      align: 'center',
      width: '10%',
    },
    {
      title: 'Timestamp',
      key: 'timestamp',
      sortable: true,
      align: 'center',
      width: '15%',
    },
  ],
  rowAction: {
    type: 'Details',
    component: HttpExchangeDetail,
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
