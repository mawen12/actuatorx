import { DataTableColumnHeader } from "@/components/data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { createColumnHelper, type ColumnDef, type TableFeatures } from "@tanstack/react-table";
import { ChevronRight, ListChevronsUpDown } from "lucide-react";
import { TaskDetail } from "./task-detail";
import type { Task } from "./schema";
import type { DataTableEntity } from "@/components/data-table/entity";

export interface TasksTableProps {
    data: Task[]
    columns: ColumnDef<TableFeatures, Task>[]
}

const tasks: Task[] = [
    {
        id: "1",
        name: "task-1",
        group: "business",
        source: "none",
        pattern: "1",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "2",
        name: "task-2",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "3",
        name: "task-3",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "4",
        name: "task-4",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "5",
        name: "task-5",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "6",
        name: "task-6",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "7",
        name: "task-7",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "8",
        name: "task-8",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "9",
        name: "task-9",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "10",
        name: "task-10",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "11",
        name: "task-11",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "12",
        name: "task-12",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "13",
        name: "task-13",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "14",
        name: "task-14",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "15",
        name: "task-15",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "16",
        name: "task-16",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "17",
        name: "task-17",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "18",
        name: "task-18",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "19",
        name: "task-19",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "20",
        name: "task-20",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "21",
        name: "task-21",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "22",
        name: "task-22",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
    {
        id: "23",
        name: "task-23",
        group: "business",
        source: "none",
        pattern: "2",
        isConfiged: false,
        timezone: "none",
        firstLogLine: "a",
        lastLogLine: "b"
    },
]

const columnHelper = createColumnHelper<TableFeatures, Task>()

const taskColunms = [
    // select
    columnHelper.display({
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
    }),
    // expand
    columnHelper.display({
        id: 'expand',
        header: ({ table }) => (
            <Button size='icon' variant='ghost' title={'Collapse All'} disabled={!table.getIsSomeRowsExpanded()} onClick={() => table.toggleAllRowsExpanded(false)}>
                <ListChevronsUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <Button size='icon' variant='ghost' disabled={!row.getCanExpand()} onClick={() => row.toggleExpanded()}>
                <ChevronRight className={cn(row.getIsExpanded() && 'rotate-90')} />
                {/* {row.getIsExpanded() ? <ChevronDown/> : <ChevronRight/>} */}
            </Button>
        ),
    }),
    columnHelper.accessor('id', {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='ID' />
        ),
        cell: ({ row }) => <div className='w-5'>{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.accessor('name', {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
        meta: {
            className: 'ps-1 max-w-0 w-1/3',
            tdClassName: 'ps-4',
        },
        // cell: ({ row }) => (
        //     <div className='flex space-x-2'>
        //         <span className='truncate font-medium'>{row.getValue('name')}</span>
        //     </div>
        // ),
    }),
    columnHelper.accessor('group', {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Description' />
        ),
        meta: {
            className: 'ps-1',
            tdClassName: 'ps-4',
        },
        enableSorting: false,
    }),
    columnHelper.accessor('source', {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Category' />
        ),
        meta: {
            className: 'ps-1',
            tdClassName: 'ps-4',
        },
    }),
    columnHelper.accessor('pattern', {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Status' />
        ),
        meta: {
            className: 'ps-1',
            tdClassName: 'ps-4 text-center',
        },
    }),
    // {
    //     accessorKey: 'pattern',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title='Status' />
    //     ),
    //     meta: {
    //         className: 'ps-1',
    //         tdClassName: 'ps-4 text-center',
    //     },
    // },
    // {
    //     accessorKey: 'isConfiged',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title='Created' />
    //     ),
    //     meta: {
    //         className: 'ps-1',
    //         tdClassName: 'ps-4 text-center',
    //     },
    // },
    // {
    //     accessorKey: 'timezone',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title='Updated' />
    //     ),
    //     meta: {
    //         className: 'ps-1',
    //         tdClassName: 'ps-4 text-center',
    //     },
    // },
    // {
    //     accessorKey: 'firstLogLine',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title='Updated' />
    //     ),
    //     meta: {
    //         className: 'ps-1',
    //         tdClassName: 'ps-4 text-center',
    //     },
    // },
    // {
    //     accessorKey: 'lastLogLine',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title='Updated' />
    //     ),
    //     meta: {
    //         className: 'ps-1',
    //         tdClassName: 'ps-4 text-center',
    //     },
    // },
]

const TaskEntity: DataTableEntity<Task> = {
    id: 'TaskEntity',
    showToolbar: true,
    columns: [
        { key: 'data-table-select' },
        { key: 'data-table-expand' },
        {
            key: 'id',
            title: 'ID',
            sortable: true,
            hideable: true,
        },
        {
            key: 'group',
            title: 'Group',
            sortable: true,
            hideable: true,
        },
        {
            key: 'source',
            title: 'Source',
            sortable: true,
            hideable: true,
        },
        {
            key: 'pattern',
            title: 'Pattern',
            sortable: true,
            hideable: true,
        },
        {
            key: 'data-table-row-actions',
            
        }
    ],
    massActions: [],
    globalActions: [],
}

export function TasksTable() {
    return (
        <div
            className="flex min-h-0 flex-1 flex-col"
            data-layout='fixed'
        >
            <DataTableProvider entity={TaskEntity} data={tasks} isLoading={false} refetchHandler={() => []}>
                <DataTable
                    renderExpandedRow={TaskDetail}
                >

                </DataTable>
            </DataTableProvider>
        </div>
    )
}