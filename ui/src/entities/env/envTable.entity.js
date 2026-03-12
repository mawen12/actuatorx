export const envTableEntity = {
  id: 'envTableEntity',
  itemValue: 'name',
  showToolbar: false,
  headers: [
    {
      title: 'Name',
      key: 'name',
      sortable: true,
      align: 'start',
      width: '30%',
    },
    {
      title: 'Value',
      sortable: false,
      key: 'value',
      align: 'start',
      width: '60%',
    },
    {
      title: 'Actions',
      sortable: false,
      key: 'actions',
      align: 'center',
      width: '10%',
      // actions: [
      //   {
      //     id: 'copy',
      //     label: 'Copy Property',
      //     icon: 'mdi-content-copy',
      //   },
      // ],
    },
  ],
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
