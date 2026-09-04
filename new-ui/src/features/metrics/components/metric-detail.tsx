import { useGetMetricDetailsQuery, type MetricDetailResponse } from "@/apis/requests/endpoints/metrics/getMetricDetails";
import type { MetricView } from "@/apis/requests/endpoints/metrics/getMetrics";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import type { Row, TableFeatures } from "@tanstack/react-table";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { MetricTags } from "./metric-tags";

export function MetricDetail({ row }: { row: Row<TableFeatures, MetricView> }) {
    const [metricDetails, setMetricDetails] = useState<MetricDetailResponse | undefined>(undefined)
    const [metricDetailsValue, setMetricDetailsValue] = useState<MetricDetailResponse | undefined>(undefined)
    const [selectedTags, setSelectedTags] = useState<Record<string, string>>({})

    const { data, isRefetching, refetch } = useGetMetricDetailsQuery({
        name: row.original.name,
        tags: selectedTags,
    })

    useEffect(() => {
        if (data) {
            if (!metricDetails) {
                setMetricDetails(data)
            }
            setMetricDetailsValue(data)
        }
    }, [data, setMetricDetails, setMetricDetailsValue])

    return (
        <div className="px-4 flex flex-col gap-2">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row items-center">
                        <span>Description:</span>
                        <span className="pl-2">{metricDetails?.description}</span>
                    </div>

                    <div className="flex flex-row items-center">
                        <span>Base Unit:</span>
                        <span className="pl-2">{metricDetails?.baseUnit}</span>
                    </div>
                </CardContent>
            </Card>

            {metricDetails?.availableTags && (
                <MetricTags
                    allTags={metricDetails?.availableTags}
                    availableTags={metricDetailsValue?.availableTags ?? []}
                    selectedTags={selectedTags}
                    onSelected={setSelectedTags}
                />
            )}

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Measurements</CardTitle>
                    <CardAction>
                        <Button variant={'ghost'} size={'icon'} onClick={() => refetch()} disabled={isRefetching}>
                            {isRefetching ? <Spinner /> : <RotateCw />}
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell className="w-40">Statistic</TableCell>
                                <TableCell className="w-60">Value</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {metricDetailsValue?.measurements && metricDetailsValue.measurements.map((measurement) => (
                                <TableRow key={measurement.statistic}>
                                    <TableCell>{measurement.statistic}</TableCell>
                                    <TableCell>{JSON.stringify(measurement.value)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}