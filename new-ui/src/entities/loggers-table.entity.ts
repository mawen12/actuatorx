import type { LoggerView } from "@/apis/requests/endpoints/loggers/getLoggers";
import type { DataTableEntity } from "@/components/data-table/entity";


export const LoggersTableEntity: DataTableEntity<LoggerView> = {
    id: 'loggersTableEntity',
    showToolbar: false,
    columns: [
        {
            key: 'name',
            title: 'Name',
            sortable: true,
            hideable: false,
        },
        {
            key: 'level',
            title: 'Level',
            sortable: true,
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