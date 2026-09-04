import type { ConfigpropsBeanView } from "@/apis/requests/endpoints/configprops/getConfigprops";
import type { DataTableEntity } from "@/components/data-table/entity";


export const ConfigpropsTableEntity: DataTableEntity<ConfigpropsBeanView> = {
    id: 'configpropsTableEntity',
    showToolbar: false,
    columns: [
        { 
            key: 'data-table-expand',
            meta: {
                className: 'w-[32px]'
            }
        },
        { 
            key: 'prefix',
            title: 'Prefix',
            sortable: true,
            hideable: false,
        },
        { 
            key: 'file',
            title: 'Properties File',
            sortable: false,
            hideable: false,
        },
    ],
    massActions: [],
    globalActions: [],
}