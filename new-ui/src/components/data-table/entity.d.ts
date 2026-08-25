import type { JSX } from "react";

interface DataTableEntity<DataType> {
    id: string
    showToolbar: boolean
    columns: DataTableColumn<DataType>[]
    massActions: DataTableAction[]
    globalActions: DataTableAction[]
}

interface DataTableColumn {
    key: string
    title?: string
    sortable?: boolean
    hideable?: boolean
    actions?: DataTableAction[]
    component?: JSX.Element
}

interface DataTableAction {
    id: string
    label: string
    icon: string
}