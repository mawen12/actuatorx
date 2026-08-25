import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { type Row, type RowData, type TableFeatures } from '@tanstack/react-table'
import { Ellipsis, Trash2 } from 'lucide-react'
import { useDataTable } from './data-table-provider';

type RowActionsProps<TData extends RowData> = {
    row: Row<TableFeatures, TData>
}

export function RowActions<TData extends RowData>({
    row
}: RowActionsProps<TData>) {
    const { setCurrentRow, setOpen } = useDataTable()
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant='ghost'
                        className='flex size-8 p-0 data-[state=open]:bg-muted'
                    >
                        <Ellipsis className='size-4' />
                    </Button>
                }
            />
            <DropdownMenuContent align='end' className='w-40'>
                <DropdownMenuItem
                    onClick={() => {
                        setCurrentRow(row)
                        setOpen('update')
                    }}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    variant='destructive'
                    onClick={() => {
                        setCurrentRow(row)
                        setOpen('delete')
                    }}
                >
                    Delete
                    <DropdownMenuShortcut>
                        <Trash2 size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
