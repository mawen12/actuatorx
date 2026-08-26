import type { MetricView } from "@/apis/requests/endpoints/metrics/getMetrics";
import type { Row, TableFeatures } from "@tanstack/react-table";

export function MetricDetail(row: Row<TableFeatures, MetricView>) {

    return (
        <div>
            {JSON.stringify(row)}
        </div>
    )
}