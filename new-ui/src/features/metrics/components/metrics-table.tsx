import { useGetMetricsQuery } from "@/apis/requests/endpoints/metrics/getMetrics";
import type { MetricView } from "@/apis/requests/endpoints/metrics/getMetrics";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-provider";
import { MetricsTableEntity } from "@/entities/metrics-table.entity";
import { MetricDetail } from "./metric-detail";

export function MetricsTable() {

    const {data, isLoading, refetch } = useGetMetricsQuery(undefined, {})

    return (
        <div
            className="flex min-h-0 flex-1 flex-col"
            data-layout='fixed'
        >
            <DataTableProvider entity={MetricsTableEntity} data={data ?? []} isLoading={isLoading} refetchHandler={() => refetch()}>
                <DataTable<MetricView> renderExpandedRow={(row) => <MetricDetail row={row} />}></DataTable>
            </DataTableProvider>
        </div>
    )
}