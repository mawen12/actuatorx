export const cronTableEntity = {
  id: 'cronTableEntity',
  itemValue: 'uid',
  showToolbar: false,
  headers: [
    {
      title: 'Target',
      key: 'target',
      value: (item) => item.runnable.target,
      sortable: true,
      align: 'start',
      width: '50%',
      cellProps: {
        class: 'text-break',
      },
    },
    {
      title: 'Expression',
      key: 'expression',
      sortable: false,
      align: 'center',
      width: '50%',
    },
  ],
  rowAction: {},
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
