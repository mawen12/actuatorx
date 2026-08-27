import type { JSX } from "react";

export interface DataTableEntity<DataType> {
    id: string
    showToolbar: boolean
    columns: DataTableColumn<DataType>[]
    massActions: DataTableAction[]
    globalActions: DataTableAction[]
}

export interface DataTableColumn {
    key: string
    title?: string
    sortable?: boolean
    hideable?: boolean
    actions?: DataTableAction[]
    component?: JSX.Element
    meta?: any
}

export interface DataTableAction {
    id: string
    label: string
    icon: React.ElementType
}

export type RowActionsHandler = (row: DataType, actionId: string) => void

export type MassActionsHandler = (someSelected: DataType[], actionId: string) => void

export type GlobalActionsHandler = (actionId: string) => void