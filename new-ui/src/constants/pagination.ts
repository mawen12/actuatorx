import type { PaginationState } from "@tanstack/react-table"

export const pageSizes = [25, 50, 100]

export const initPagination: PaginationState = {
    // start from 0
    pageIndex: 0,
    pageSize: 50
}