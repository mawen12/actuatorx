import type { CacheView } from "@/apis/requests/endpoints/caches/getCaches";
import type { DataTableEntity } from "@/components/data-table/entity";


export const CachesTableEntity: DataTableEntity<CacheView> = {
    id: 'cachesTableEntity',
    showToolbar: false,
    columns: [
        { 
            key: 'name',
            title: 'Name',
            sortable: true,
            hideable: false,
        },
        { 
            key: 'cacheManager',
            title: 'Cache Manager',
            sortable: true,
            hideable: false,
        },
        { 
            key: 'target',
            title: 'Target',
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