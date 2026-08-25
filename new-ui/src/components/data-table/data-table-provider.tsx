import useDialogState from "@/hooks/use-dialog-state";
import { cn } from "@/lib/utils";
import { createColumnHelper, type ColumnDef, type ColumnHelper, type RowData, type TableFeatures } from "@tanstack/react-table";
import { ChevronRight, ListChevronsUpDown } from "lucide-react";
import { createContext, useContext, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "./column-header";
import type { DataTableEntity } from "./entity";
import { RowActions } from "./row-actions";

type DataTableDialogType = 'create' | 'update' | 'delete' | 'import'

type DataTableType<DataType extends RowData> = {
    open: DataTableDialogType | null
    setOpen: (str: DataTableDialogType | null) => void
    currentRow: DataType | null
    setCurrentRow: Dispatch<SetStateAction<DataType | null>>

    columns: ColumnDef<TableFeatures, DataType>[]
    data: DataType[]
    isLoading: boolean
    refetchHandler: () => DataType[]
    rowActionsHandler?: (selected: DataType) => void
    massActionsHandler?: (someSelected: DataType[]) => void
    globalActionsHandler: () => void
}

const DataTableContext = createContext<DataTableType<RowData> | null>(null)

export type DataTableProviderProps<DataType extends RowData> = {
    children: React.ReactNode
    entity: DataTableEntity<DataType>
    data: DataType[]
    isLoading: boolean
    refetchHandler: () => DataType[]
    rowActionsHandler?: (selected: DataType) => void
    massActionsHandler?: (someSelected: DataType[]) => void
    globalActionsHandler: () => void
}

export function DataTableProvider({ children, entity, data, isLoading, refetchHandler, rowActionsHandler, massActionsHandler, globalActionsHandler }: DataTableProviderProps<RowData>) {
    const [open, setOpen] = useDialogState<DataTableDialogType>(null)

    const [currentRow, setCurrentRow] = useState<RowData | null>(null)

    const columns = useMemo(() => {
        const columnHelper = createColumnHelper<TableFeatures, RowData>()

        return entity.columns.map((col) => {
            if (col.key === 'data-table-expand') {
                return DataTableExpand(columnHelper)
            } else if (col.key === 'data-table-select') {
                return DataTableSelect(columnHelper)
            } else if (col.key === 'data-table-row-actions') {
                return DataTableRowActions(columnHelper)
            } else {
                return columnHelper.accessor(col.key, {
                    header: ({ column }) => (
                        <DataTableColumnHeader column={column} title={col.title} />
                    ),
                    cell: ({ row }) => <div className='w-5'>{row.getValue(`${col.key}`)}</div>,
                    enableSorting: col.sortable,
                    enableHiding: col.hideable,
                })
            }
        })
    }, [entity])

    return (
        <DataTableContext value={{ open, setOpen, currentRow, setCurrentRow, columns, data, isLoading, refetchHandler, rowActionsHandler, massActionsHandler, globalActionsHandler }}>
            {children}
        </DataTableContext>
    )
}

export const useDataTable = () => {
    const taskContext = useContext(DataTableContext)

    if (!taskContext) {
        throw new Error('useDataTable has to used within <DataTableContext>')
    }

    return taskContext
}

function DataTableExpand(columnHelper: ColumnHelper<TableFeatures, RowData>) {
    return columnHelper.display({
        id: 'expand',
        header: ({ table }) => (
            <Button size='icon' variant='ghost' title={'Collapse All'} disabled={!table.getIsSomeRowsExpanded()} onClick={() => table.toggleAllRowsExpanded(false)}>
                <ListChevronsUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <Button size='icon' variant='ghost' disabled={!row.getCanExpand()} onClick={() => row.toggleExpanded()}>
                <ChevronRight className={cn(row.getIsExpanded() && 'rotate-90')} />
            </Button>
        ),
    })
}

function DataTableSelect(columnHelper: ColumnHelper<TableFeatures, RowData>) {
    return columnHelper.display({
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-0.5'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-0.5'
            />
        )
    })
}

function DataTableRowActions(columnHelper: ColumnHelper<TableFeatures, RowData>) {
    return columnHelper.display({
        id: 'actions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={'Actions'} />
        ),
        cell: ({ row }) => (
            <RowActions row={row}/>
        ),
    })
}