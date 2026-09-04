import type { ConditionMatchView } from "@/apis/requests/endpoints/conditions/getConditions";
import type { DataTableEntity } from "@/components/data-table/entity";


export const ConditionsTableEntity: DataTableEntity<ConditionMatchView> = {
    id: 'conditionsTableEntity',
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
            key: 'type',
            title: 'Type',
            sortable: false,
            hideable: false,
        },
    ],
    massActions: [],
    globalActions: [],
}