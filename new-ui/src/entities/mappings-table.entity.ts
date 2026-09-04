import type { BeanView } from "@/apis/requests/endpoints/beans/getBeans";
import type { DataTableEntity } from "@/components/data-table/entity";


export const MappingsTableEntity: DataTableEntity<BeanView> = {
    id: 'mappingsTableEntity',
    showToolbar: false,
    columns: [
        { 
            key: 'data-table-expand',
            meta: {
                className: 'w-[32px]'
            }
        },
        { 
            key: 'url',
            title: 'URL',
            sortable: true,
            hideable: false,
        },
        { 
            key: 'handler',
            title: 'Handler',
            sortable: true,
            hideable: false,
        },
        { 
            key: 'type',
            title: 'Type',
            sortable: false,
            hideable: false,
        },
    ],
    massActions: [],
    globalActions: [],
}