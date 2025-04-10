"use client";

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
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [rowSelection, setRowSelection] = React.useState({});

    function getPageRange(currentPage: number, totalPages: number) {
        let start = Math.max(0, currentPage - 1);
        let end = Math.min(totalPages, start + 3);

        // Adjust start if we're at the end
        if (end - start < 3 && start > 0) {
            start = Math.max(0, end - 3);
        }

        const range = [];
        for (let i = start; i < end; i++) {
            range.push(i);
        }
        return range;
    }
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
        },
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center py-4 relative">
                    <Search className="absolute left-2 text-muted-foreground size-5" />
                    <Input
                        placeholder="search..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm pl-8.5 h-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-800">Items Per Page</span>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
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
                                                cell.getContext()
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
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                            className="border p-1 rounded w-16 h-8"
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
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="shadow-none"
                        >
                            Prev
                        </Button>
                        {/* Page numbers */}
                        <span className="flex items-center gap-2">
                            {getPageRange(
                                table.getState().pagination.pageIndex,
                                table.getPageCount()
                            ).map((page) => (
                                <span
                                    key={page}
                                    onClick={() => table.setPageIndex(page)}
                                    className={`px-3 py-1 border rounded-md ${page === table.getState().pagination.pageIndex
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
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
