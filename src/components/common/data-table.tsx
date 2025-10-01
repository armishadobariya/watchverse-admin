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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchPlaceholder?: string
  onSearchChange?: (search: string) => void
  onTableReady?: (table: TanStackTable<TData>) => void
  onRowClick?: (row: TData) => void
  rowSelection?: Record<string, boolean>
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
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
  let start = Math.max(0, currentPage - 1)
  const end = Math.min(totalPages, start + 3)

  // Adjust start if we're at the end
  if (end - start < 3 && start > 0) {
    start = Math.max(0, end - 3)
  }

  const range = []
  for (let i = start; i < end; i++) {
    range.push(i)
  }
  return range
}
export function DataTable<TData, TValue>({
  columns,
  data,
  onTableReady,
  onRowClick,
  rowSelection = {},
  onRowSelectionChange,
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
    getRowId: (row: any) => row._id,

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
      <div className="rounded-md border dark:border-neutral-20 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                  onClick={(e) => {
                    onRowClick?.(row?.original)
                    e.preventDefault()
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-2 items-center py-4">
        <div className="flex justify-end">
          <span className="text-sm text-slate-700 dark:text-white/70 flex items-center justify-center gap-1">
            Go to page:
            <Input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
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
              const totalRecords = table.getFilteredRowModel().rows.length // or from API if server-side
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
                    table.previousPage()
                  }}
                  className="shadow-none py-1"
                  aria-disabled={!table.getCanPreviousPage()}
                />
              </PaginationItem>

              {getPageRange(
                table.getState().pagination.pageIndex,
                table.getPageCount(),
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === table.getState().pagination.pageIndex}
                    onClick={(e) => {
                      e.preventDefault()
                      table.setPageIndex(page)
                    }}
                    className={`px-3 py-1 cursor-pointer ${
                      page === table.getState().pagination.pageIndex
                        ? "border-teal bg-teal-20 dark:border-white dark:bg-neutral-light font-medium text-bronze"
                        : "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                    }`}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    table.nextPage()
                  }}
                  className="shadow-none  py-1"
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
