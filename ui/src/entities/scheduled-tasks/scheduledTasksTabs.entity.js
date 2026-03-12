import CronTable from '@/pages/scheduled-tasks/components/CronTable.vue'
import { cronTableEntity } from './cronTable.entity'
import { fixedTableEntity } from './fixedTable.entity'
import FixedTable from '@/pages/scheduled-tasks/components/FixedTable.vue'

export const scheduledTasksTabsEntity = {
  id: 'scheduledTasksTabsEntity',
  showSearchToolbar: true,
  showOnlyOneTab: true,
  lazy: false,
  tabs: [
    {
      name: 'cron',
      label: 'Cron',
      entity: cronTableEntity,
      componentType: 'Table',
      component: CronTable,
      getTabData: (data) => data.cron,
    },
    {
      name: 'fixedDelay',
      label: 'Fixed Delay',
      entity: fixedTableEntity,
      componentType: 'Table',
      component: FixedTable,
      getTabData: (data) => data.fixedDelay,
    },
    {
      name: 'fixedRate',
      label: 'Fixed Rate',
      entity: fixedTableEntity,
      componentType: 'Table',
      component: FixedTable,
      getTabData: (data) => data.fixedRate,
    },
    // {
    //   name: 'custom',
    //   label: 'Custom',
    //   entity: ,
    //   componentType: 'Table',
    //   component: ,
    //   getTabData: (data) => data.fixedRate
    // },
  ],
  filterData: (data, filter) => {
    if (filter && filter !== '') {
      const lower = filter.trim().toLowerCase()
      return Object.fromEntries(
        Object.entries(data).map(([key, arr]) => [
          key,
          arr.filter((item) => item.search.includes(lower)),
        ]),
      )
    }
    return data
  },
}
