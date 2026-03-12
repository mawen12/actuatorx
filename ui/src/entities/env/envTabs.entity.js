import EnvTable from '@/pages/env/components/EnvTable.vue'
import { envTableEntity } from './envTable.entity'
import _ from 'lodash-es'

export const envTabsEntity = {
  id: 'envTabsEntity',
  showSearchToolbar: true,
  lazy: true,
  getTabs: (data) => {
    return data.propertySources.map((propertySource, index) => ({
      name: propertySource.name,
      entity: envTableEntity,
      componentType: 'Table',
      component: EnvTable,
      getTabData: (tabData) => tabData.propertySources[index].properties,
    }))
  },
  filterData: (data, filter) => {
    if (filter && filter !== '') {
      const searchLower = filter.trim().toLowerCase()
      return {
        ...data,
        propertySources: _.map(data.propertySources, (ps) => ({
          ...ps,
          properties: _.filter(ps.properties, (p) => p.search.includes(searchLower)),
        })),
      }
    }
    return data
  },
}
