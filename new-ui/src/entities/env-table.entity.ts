import type { EnvPropertySourceView } from "@/apis/requests/endpoints/env/getEnv";
import type { DataTableEntity } from "@/components/data-table/entity";
import { Copy } from "lucide-react";


export const EnvTableEntity: DataTableEntity<EnvPropertySourceView> = {
    id: 'envTableEntity',
    showToolbar: false,
    columns: [
        {
            key: 'name',
            title: 'Name',
            sortable: true,
            hideable: false,
        },
        {
            key: 'value',
            title: 'Value',
            sortable: true,
            hideable: false,
        },
        {
            key: 'data-table-row-actions',
            title: 'Actions',
            sortable: false,
            hideable: false,
            meta: {
                className: 'w-[80px]'
            },
            actions: [
                {
                    id: 'copy',
                    label: 'Copy property',
                    icon: Copy,
                }
            ]
        }
    ],
    massActions: [],
    globalActions: [],
}