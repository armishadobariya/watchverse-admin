"use client"

import { DataTable } from "@/components/common/data-table"
import DeleteItemModal from "@/components/common/delete-item-modal"
import PerPageRecord from "@/components/common/per-page-record"
import SearchBar from "@/components/common/search-bar"
import SectionHeader from "@/components/common/section-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useDebounce from "@/hooks/useDebounce"
import { BrandData } from "@/lib/api/brand"
import {
  CategoryData,
  deleteCategoryHandler,
  getCategoryHandler,
} from "@/lib/api/category"
import { formateDate } from "@/lib/utils"
import queryKeyFactory from "@/utils/queryKeyFactory"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ColumnDef, Row, RowSelectionState, Table } from "@tanstack/react-table"
import { SquarePen, Trash2 } from "lucide-react"
import Image from "next/image"
import { parseAsString, useQueryState } from "nuqs"
import React, { useState } from "react"

import AddCategoryModal from "./add-category-modal"

const Category = () => {
  const [search] = useQueryState("search", parseAsString.withDefault(""))
  const [tableInstance, setTableInstance] = useState<Table<BrandData>>()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const debouncedSearch = useDebounce({ value: search, delay: 500 })
  const queryClient = useQueryClient()

  const params = new URLSearchParams()
  if (search) params.set("search", debouncedSearch)

  const selectedIds = Object.keys(rowSelection)

  // multiple delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string | string[]) => deleteCategoryHandler(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory?.categoryList(),
      }),
    onSettled: () => {
      tableInstance?.resetRowSelection()
      setRowSelection({})
    },
  })

  // handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedIds?.length) {
      await deleteMutation.mutateAsync(selectedIds)
    }
  }

  const selectedCount = Object.keys(rowSelection).length

  // fetch category
  const { data, isPending } = useQuery({
    queryKey: queryKeyFactory?.categoryList(debouncedSearch),
    queryFn: () => getCategoryHandler(params.toString()),
  })
  return (
    <div className="space-y-6">
      <div className="flex justify-end w-full">
        <AddCategoryModal>
          <Button variant="outline">Add Category</Button>
        </AddCategoryModal>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-6">
          {/* search, filter, delete actions */}
          <div className="flex items-center gap-6">
            <SearchBar placeholder="Search brand" />
            <SectionHeader
              name="Categories"
              count={data?.length || 0}
              selectedCount={selectedCount}
              onDeleteSelected={handleBulkDelete}
              loading={deleteMutation?.isPending}
            />
          </div>
          {tableInstance && <PerPageRecord table={tableInstance} />}
        </div>

        <DataTable
          columns={CategoryColumns()}
          data={data || []}
          onTableReady={setTableInstance}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          isLoading={isPending}
        />
      </div>
    </div>
  )
}

export default Category

// category columns
export const CategoryColumns = (): ColumnDef<CategoryData>[] => {
  const ActionCell = ({ row }: { row: Row<CategoryData> }) => {
    const queryClient = useQueryClient()

    const deleteCategoryMutation = useMutation({
      mutationFn: (id: string) => deleteCategoryHandler(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: queryKeyFactory?.categoryList(),
        }),
    })

    return (
      <div className="flex items-center justify-end gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <AddCategoryModal initialData={row.original} isEditing>
              <SquarePen className="size-5 cursor-pointer" />
            </AddCategoryModal>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <DeleteItemModal
              text="Are you sure you want to delete this brand?"
              handleDelete={() =>
                deleteCategoryMutation.mutateAsync(row.original._id)
              }
              loading={deleteCategoryMutation.isPending}
            >
              <Trash2 className="size-5 text-red-700 cursor-pointer" />
            </DeleteItemModal>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Image
            src={row.original.image}
            alt={`${row.original.name} image`}
            width={48}
            height={48}
            className="size-8 object-cover rounded"
          />
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = row.getValue("createdAt")
        return typeof date === "string" ? formateDate(date) : String(date)
      },
    },
    {
      id: "actions",
      header: () => <div className="text-end">Action</div>,
      cell: ActionCell,
    },
  ]
}
