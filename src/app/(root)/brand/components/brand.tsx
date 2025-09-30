"use client"

import { DataTable } from "@/components/common/data-table"
import DeleteItemModal from "@/components/common/delete-item-modal"
import PerPageRecord from "@/components/common/per-page-record"
import SearchBar from "@/components/common/search-bar"
import SectionHeader from "@/components/common/section-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import useDebounce from "@/hooks/useDebounce"
import {
  BrandData,
  deleteBrandHandler,
  getBrandsHandler,
} from "@/lib/api/brand"
import { formateDate } from "@/lib/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ColumnDef, Row, Table } from "@tanstack/react-table"
import { SquarePen, Trash2 } from "lucide-react"
import Image from "next/image"
import { parseAsString, useQueryState } from "nuqs"
import React, { useState } from "react"

import AddBrandModal from "./add-brand-modal"

const Brand = () => {
  const [search] = useQueryState("search", parseAsString.withDefault(""))
  const [tableInstance, setTableInstance] = useState<Table<BrandData>>()

  const debouncedSearch = useDebounce({ value: search, delay: 500 })

  const params = new URLSearchParams()
  if (search) {
    params.set("search", debouncedSearch)
  }

  const handleBulkDelete = () => {
    // Add your bulk delete logic here
  }

  const selectedCount = tableInstance?.getSelectedRowModel().rows.length || 0

  const data = useQuery({
    queryKey: ["brands", debouncedSearch],
    queryFn: () => getBrandsHandler(params.toString()),
  })

  const handleRowClick = (row: BrandData) => {
    if (!tableInstance) return

    const rowModel = tableInstance
      .getRowModel()
      .rows.find((r) => r.original._id === row._id)
    if (rowModel) {
      rowModel.toggleSelected()
      // Force re-render by updating state
      setTableInstance({ ...tableInstance })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end w-full">
        <AddBrandModal>
          <Button variant={"outline"}>Add brand</Button>
        </AddBrandModal>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <SearchBar placeholder="Search brand" />
            <SectionHeader
              name="Brands"
              count={data?.data?.length || 0}
              selectedCount={selectedCount}
              onDeleteSelected={handleBulkDelete}
            />
            {selectedCount > 0 && (
              <DeleteItemModal
                text="Are you sure you want to delete these brands?"
                handleDelete={handleBulkDelete}
              >
                <Button
                  variant={"destructive"}
                  disabled={selectedCount === 0}
                  onClick={handleBulkDelete}
                >
                  Delete ({selectedCount})
                </Button>
              </DeleteItemModal>
            )}
          </div>

          {tableInstance && <PerPageRecord table={tableInstance} />}
        </div>
        <DataTable
          columns={BrandColumns()}
          data={data?.data || []}
          onTableReady={setTableInstance}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  )
}

export default Brand

export const BrandColumns = (): ColumnDef<BrandData>[] => {
  const ActionCell = ({ row }: { row: Row<BrandData> }) => {
    const queryClient = useQueryClient()

    const deleteBrandMutation = useMutation({
      mutationFn: (id: string) => deleteBrandHandler(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["brands"], exact: false })
      },
    })

    const handleDelete = () => {}

    return (
      <div className="flex items-center justify-end gap-4">
        <AddBrandModal initialData={row.original} isEditing>
          <SquarePen className="size-5 cursor-pointer" />
        </AddBrandModal>

        <DeleteItemModal
          text="Are you sure you want to delete this brand?"
          handleDelete={handleDelete}
          loading={deleteBrandMutation.isPending}
        >
          <Trash2 className="size-5 text-red-700 cursor-pointer" />
        </DeleteItemModal>
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
      id: "brand",
      accessorFn: (row) => `${row.image}-${row.name}`,
      header: () => <span>Brand</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Image
              src={row.original.image}
              alt={`${row.original.name} image`}
              width={48}
              height={48}
              className="size-8 object-cover rounded"
            />
          </div>
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <span>Created At</span>,
      cell: ({ row }) => {
        const date = row.getValue("createdAt")
        if (typeof date === "string") {
          return <>{formateDate(date)}</>
        }
        return <>{String(date)}</>
      },
    },
    {
      id: "actions",
      header: () => <div className="text-end">Action</div>,
      cell: ActionCell,
    },
  ]
}
