"use client"

import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  RowData,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { parseAsIndex, parseAsInteger, useQueryStates } from "nuqs"
import React, { useEffect } from "react"

import NoDataFound from "./no-data-found"
import { TableSkeleton } from "./table-skeleton"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
    sortable?: boolean
    filterFn?: (row: TData, columnId: string, filterValue: TValue) => boolean
  }
}

interface WithId {
  _id: string
}
interface DataTableProps<TData extends WithId, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchPlaceholder?: string
  onSearchChange?: (search: string) => void
  onTableReady?: (table: TanStackTable<TData>) => void
  onRowClick?: (row: TData) => void
  rowSelection?: Record<string, boolean>
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  getRowId?: (row: TData) => string
  isLoading?: boolean
}

const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
}

const paginationUrlKeys = {
  pageIndex: "page",
  pageSize: "per_page",
}

function getPageRange(currentPage: number, totalPages: number) {
  const delta = 1
  const range: (number | string)[] = []
  const rangeWithDots: (number | string)[] = []
  let l: number | undefined

  for (let i = 0; i < totalPages; i++) {
    if (
      i === 0 ||
      i === totalPages - 1 ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (l !== undefined) {
      if (Number(i) - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (Number(i) - l > 2) {
        rangeWithDots.push("...")
      }
    }
    rangeWithDots.push(i)
    l = Number(i)
  }

  return rangeWithDots
}

export function DataTable<TData extends WithId, TValue>({
  columns,
  data,
  onTableReady,
  onRowClick,
  rowSelection = {},
  onRowSelectionChange,
  getRowId,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  // Use NuQS for pagination state
  const [paginationParams, setPaginationParams] = useQueryStates(
    paginationParsers,
    { urlKeys: paginationUrlKeys },
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination: {
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize,
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: onRowSelectionChange,
    enableRowSelection: true,
    // Type-safe row ID extractor
    getRowId: getRowId || ((row: TData) => row._id),
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({
              pageIndex: paginationParams.pageIndex,
              pageSize: paginationParams.pageSize,
            })
          : updater

      setPaginationParams({
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
      })
    },
  })

  // Pass table instance to parent component using useEffect
  useEffect(() => {
    if (onTableReady) {
      onTableReady(table)
    }
  }, [table, onTableReady])

  return (
    <div>
      <div className="flex items-center justify-between"></div>
      <div className="rounded-md border dark:border-neutral-20 ">
        <Table divClassName="max-h-[calc(100vh-320px)]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`${
                      header.column.columnDef.meta?.className ?? ""
                    } `}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="z-0">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row?.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${cell.column.columnDef.meta?.className ?? ""}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {isLoading ? (
                  <TableSkeleton
                    columns={table.getVisibleFlatColumns().length}
                  />
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getVisibleFlatColumns().length}
                      className="h-24 text-center"
                    >
                      <div className="flex justify-center">
                        <NoDataFound desc="No Brands Found" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}

      <div className="grid grid-cols-2 items-center py-4">
        <div className="flex justify-end">
          <span className="text-sm text-slate-700 dark:text-white/70 flex items-center justify-center gap-1">
            Go to page:
            <Input
              type="number"
              min={1}
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                let page = e.target.value ? Number(e.target.value) - 1 : 0

                if (page < 0) page = 0
                if (page >= table.getPageCount())
                  page = table.getPageCount() - 1

                table.setPageIndex(page)
              }}
              className="rounded w-16"
              inputClassName="h-8"
            />
          </span>
        </div>
        <div className="justify-end flex items-center gap-6 w-full">
          <span className="text-sm text-slate-700 dark:text-white/70 flex items-center gap-1">
            {(() => {
              const pageIndex = table.getState().pagination.pageIndex
              const pageSize = table.getState().pagination.pageSize
              const totalRecords = table.getFilteredRowModel().rows.length
              const start = pageIndex * pageSize + 1
              const end = Math.min((pageIndex + 1) * pageSize, totalRecords)

              return (
                <>
                  <span>
                    {start}-{end} of {totalRecords}
                  </span>
                </>
              )
            })()}
          </span>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (table?.getCanPreviousPage()) table.previousPage()
                  }}
                  className="shadow-none py-1"
                  aria-disabled={!table.getCanPreviousPage()}
                />
              </PaginationItem>
              {getPageRange(
                table?.getState()?.pagination?.pageIndex,
                table?.getPageCount(),
              )?.map((page, idx) => (
                <PaginationItem key={idx}>
                  {page === "..." ? (
                    <span className="px-3 py-1">...</span>
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={page === table.getState().pagination.pageIndex}
                      onClick={(e) => {
                        e.preventDefault()
                        table.setPageIndex(Number(page))
                      }}
                      className={`px-3 py-1 cursor-pointer ${
                        page === table.getState().pagination.pageIndex
                          ? "border-teal bg-teal-20 dark:border-white dark:bg-neutral-light font-medium text-bronze"
                          : "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                      }`}
                    >
                      {Number(page) + 1}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (table?.getCanNextPage()) table?.nextPage()
                  }}
                  className="shadow-none py-1"
                  aria-disabled={!table.getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
