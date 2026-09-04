import { cn } from "@/lib/utils";
import { columnFacetingFeature, columnFilteringFeature, columnVisibilityFeature, createFilteredRowModel, createPaginatedRowModel, createSortedRowModel, filterFn_includesString, flexRender, rowExpandingFeature, rowPaginationFeature, rowSelectionFeature, rowSortingFeature, sortFn_alphanumeric, sortFn_text, tableFeatures, useTable, type ColumnDef, type ColumnFiltersState, type ColumnVisibilityState, type PaginationState, type Row, type RowData, type RowSelectionState, type SortingState, type TableFeatures } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DataTableBulkActions } from "./bulk-actions";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";
import type React from "react";
import { Fragment, useState } from "react";
import { useDataTable } from "./data-table-provider";
import { initPagination } from "@/constants/pagination";

const features = tableFeatures({
    columnFilteringFeature,
    columnVisibilityFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    columnFacetingFeature,
    rowExpandingFeature,
    filteredRowModel: createFilteredRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    sortedRowModel: createSortedRowModel(),
    filterFns: { includesString: filterFn_includesString },
    sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

export interface DataTableProps<DataType extends RowData> {
    fixed?: boolean
    // data: DataType[]
    // columns: ColumnDef<TableFeatures, DataType>[]
    renderExpandedRow?: (row: Row<TableFeatures, DataType>) => React.ReactNode
}

export function DataTable<DataType extends RowData>({ renderExpandedRow }: DataTableProps<DataType>) {
    const { data, columns, entity } = useDataTable()

    // externally-controlled state: lifted into React state so any ancestor could
    // hoist/replace these with its own state (e.g. synced to the URL or a store)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({})
    const [globalFilter, setGlobalFilter] = useState('')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>(initPagination)

    const table = useTable({
        features,
        columns,
        data,
        state: {
            rowSelection,
            sorting,
            columnVisibility,
            globalFilter,
            columnFilters,
            pagination,
        },
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getRowCanExpand: () => true,
    })

    return (
        <div
            className={cn(
                'max-sm:has-[div[role="toolbar"]]:mb-16',
                'flex min-h-0 flex-1 flex-col gap-4',
            )}
        >
            {entity.showToolbar && (
                <DataTableToolbar
                    table={table}
                    searchPlaceholder='Filter by title or ID...'
                    filters={[]}
                />
            )}

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
                                                : (<table.FlexRender header={header}/>) 
                                            }
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
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    cell.column.columnDef.meta?.className,
                                                    cell.column.columnDef.meta?.tdClassName
                                                )}
                                            >
                                                <table.FlexRender cell={cell}/>
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