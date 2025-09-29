"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { parseAsIndex, parseAsInteger, useQueryStates } from "nuqs"
import React from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchPlaceholder?: string
  onSearchChange?: (search: string) => void
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
  // searchPlaceholder = "Search...",
  // onSearchChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [rowSelection, setRowSelection] = React.useState({})

  // Use NuQS for pagination state
  const [paginationParams, setPaginationParams] = useQueryStates(
    paginationParsers,
    { urlKeys: paginationUrlKeys },
  )

  // Handle search from URL
  // const [urlSearch, setUrlSearch] = useQueryState(
  //   "search",
  //   parseAsString.withDefault(""),
  // )

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
    onRowSelectionChange: setRowSelection,
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

  // const handleSearchChange = (value: string) => {
  //   setUrlSearch(value || null)
  //   if (onSearchChange) {
  //     onSearchChange(value)
  //   }
  //   // Reset to first page when searching
  //   setPaginationParams({ pageIndex: 0 })
  // }

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center py-4 relative">
          <Search className="absolute left-2 text-gray-400 size-5" />

          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={urlSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="max-w-sm pl-8.5 h-10 border-[1.5px] rounded-full border-gray-200 placeholder:text-gray-400 w-2xs "
          />
        </div> */}
        <div className="flex items-center gap-2">
          <span className="text-gray-800">Items Per Page</span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={pageSize.toString()}
                  className="cursor-pointer"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border mt-4">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
      <div className="relative flex items-center w-full py-4">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-sm text-slate-700 flex items-center justify-center gap-1">
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
        <div className="ml-auto justify-end flex items-center space-x-5">
          <span className="text-sm text-slate-700 flex items-center gap-1">
            <div>Page</div>
            <strong className="font-medium">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <div className="flex items-center space-x-1.5">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="shadow-none px-2 py-1"
            >
              <ChevronLeft />
            </Button>
            {/* Page numbers */}
            <span className="flex items-center gap-2">
              {getPageRange(
                table.getState().pagination.pageIndex,
                table.getPageCount(),
              ).map((page) => (
                <span
                  key={page}
                  onClick={() => table.setPageIndex(page)}
                  className={`px-3 py-1 border rounded-md cursor-pointer ${
                    page === table.getState().pagination.pageIndex
                      ? "border-bronze font-medium text-bronze"
                      : "border-gray-300"
                  }`}
                >
                  {page + 1}
                </span>
              ))}
            </span>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="shadow-none px-2 py-1"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
