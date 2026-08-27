import type { BeanView } from "@/apis/requests/endpoints/beans/getBeans";
import type { DataTableEntity } from "@/components/data-table/entity";


export const BeansTableEntity: DataTableEntity<BeanView> = {
    id: 'beansTableEntity',
    showToolbar: false,
    columns: [
        { 
            key: 'data-table-expand',
            meta: {
                className: 'w-[32px]'
            }
        },
        { 
            key: 'name',
            title: 'Name',
            sortable: true,
            hideable: false,
        },
        { 
            key: 'package',
            title: 'Package',
            sortable: true,
            hideable: false,
        },
        { 
            key: 'scope',
            title: 'Scope',
            sortable: false,
            hideable: false,
        },
        { 
            key: 'data-table-actions',
            title: 'Actions',
            sortable: false,
            hideable: false,
            meta: {
                className: 'w-[80px]'
            }
        },
    ],
    massActions: [],
    globalActions: [],
}