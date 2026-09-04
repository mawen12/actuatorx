import type { MetricView } from "@/apis/requests/endpoints/metrics/getMetrics";
import type { DataTableEntity } from "@/components/data-table/entity";


export const MetricsTableEntity: DataTableEntity<MetricView> = {
    id: 'metricsTableEntity',
    showToolbar: true,
    columns: [
        { 
            key: 'data-table-expand',
            meta: {
                className: 'w-10'
            }
        },
        { 
            key: 'name',
            title: 'Name',
            sortable: true,
            hideable: false,
            
        }
    ],
    massActions: [],
    globalActions: [],
}