import LoggerCustomFilter from '@/pages/loggers/components/LoggerCustomFilter.vue'

export const loggersTableEntity = {
  id: 'loggersTableEntity',
  showToolbar: true,
  itemValue: 'name',
  headers: [
    {
      title: 'Name',
      key: 'name',
      sortable: true,
      align: 'start',
      width: '40%',
      cellProps: {
        class: 'text-break',
      },
    },
    {
      title: 'Level',
      key: 'level',
      sortable: true,
      align: 'center',
      width: '50%',
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
  globalActions: [],
  filterData: (data, filter, customFilters) => {
    if (filter && filter !== '') {
      const lower = filter.toLowerCase()
      return data.filter(
        (item) =>
          item.search.includes(lower) && (!customFilters.configured || item.configuredLevel),
      )
    }
    return data.filter(
      (item) =>
        !customFilters.configured || (item.configuredLevel != null && item.configuredLevel !== ''),
    )
  },
  customFilterComponent: LoggerCustomFilter,
}
