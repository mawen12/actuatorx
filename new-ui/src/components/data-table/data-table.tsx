import { cn } from "@/lib/utils";
import { columnFacetingFeature, columnFilteringFeature, columnVisibilityFeature, createFilteredRowModel, createPaginatedRowModel, createSortedRowModel, filterFn_includesString, flexRender, rowExpandingFeature, rowPaginationFeature, rowSelectionFeature, rowSortingFeature, sortFn_alphanumeric, tableFeatures, useTable, type ColumnDef, type Row, type RowData, type TableFeatures } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DataTableBulkActions } from "./bulk-actions";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";
import type React from "react";
import { Fragment } from "react";
import { useDataTable } from "./data-table-provider";

export interface DataTableProps<DataType extends RowData> {
    fixed?: boolean
    // data: DataType[]
    // columns: ColumnDef<TableFeatures, DataType>[]
    renderExpandedRow?: (row: Row<TableFeatures, DataType>) => React.ReactNode
}

export function DataTable<DataType extends RowData>({ renderExpandedRow }: DataTableProps<DataType>) {
    const {data, columns} = useDataTable()

    // const [rowSelection, setRowSelection] = useState({})
    // const [sorting, setSorting] = useState<SortingState>([])
    // const [columnVisiblity, setColumnVisiblity] = useState<ColumnVisibilityState>({})
    // const [globalFilter, setGlobalFilter] = useState('')
    // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>()
    // const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

    const features = tableFeatures({
        columnFilteringFeature,
        columnFacetingFeature,
        columnVisibilityFeature,
        rowSortingFeature,
        rowPaginationFeature,
        rowSelectionFeature,
        rowExpandingFeature,
        filteredRowModel: createFilteredRowModel(),
        sortedRowModel: createSortedRowModel(),
        paginatedRowModel: createPaginatedRowModel(),
        filterFns: { includesString: filterFn_includesString },
        sortFns: { alphanumeric: sortFn_alphanumeric },
    })

    const table = useTable({
        features,
        data,
        columns,
        getRowCanExpand: () => true,
    })

    return (
        <div
            className={cn(
                'max-sm:has-[div[role="toolbar"]]:mb-16',
                'flex min-h-0 flex-1 flex-col gap-4',
            )}
        >
            <DataTableToolbar
                table={table}
                searchPlaceholder='Filter by title or ID...'
                filters={[]}
            />
            <div className='flex h-full min-h-0 flex-1 overflow-hidden rounded-md border'>
                <Table className='min-h-0 flex-1'>
                    <TableHeader className="top-0 sticky bg-muted z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cn(
                                                header.column.columnDef.meta?.className,
                                                header.column.columnDef.meta?.thClassName,
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Fragment key={row.id}>
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                    >
                                        {row.getVisibleCells && row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    cell.column.columnDef.meta?.className,
                                                    cell.column.columnDef.meta?.tdClassName
                                                )}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    {row.getIsExpanded() && renderExpandedRow && (
                                        <TableRow>
                                            <TableCell colSpan={row.getVisibleCells().length}>
                                                {renderExpandedRow(row)}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} className='mt-auto' />
            <DataTableBulkActions table={table} />
        </div>
    )
}