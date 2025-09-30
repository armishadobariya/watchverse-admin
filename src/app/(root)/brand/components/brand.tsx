"use client"

import { DataTable } from "@/components/common/data-table"
import PerPageRecord from "@/components/common/per-page-record"
import SearchBar from "@/components/common/search-bar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import useDebounce from "@/hooks/useDebounce"
import { BrandData, getBrandsHandler } from "@/lib/api/brand"
import { formateDate } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef, Table } from "@tanstack/react-table"
import Image from "next/image"
import { parseAsString, useQueryState } from "nuqs"
import React, { useState } from "react"

import AddBrandModal from "./add-brand-modal"

const Brand = () => {
  const [search] = useQueryState("search", parseAsString.withDefault(""))
  const [tableInstance, setTableInstance] = useState<Table<BrandData>>()

  // Debounce the search value
  const debouncedSearch = useDebounce({ value: search, delay: 500 })

  const params = new URLSearchParams()
  if (search) {
    params.set("search", debouncedSearch)
  }

  // Use the debounced value in your query
  const data = useQuery({
    queryKey: ["brands", debouncedSearch],
    queryFn: () => getBrandsHandler(params.toString()),
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-end w-full">
        <AddBrandModal>
          <Button variant={"outline"}>Add brand</Button>
        </AddBrandModal>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-6">
          <SearchBar placeholder="Search brand" />
          {tableInstance && <PerPageRecord table={tableInstance} />}
        </div>
        <DataTable
          columns={brandColumns}
          data={data?.data || []}
          onTableReady={setTableInstance}
        />
      </div>
    </div>
  )
}

export default Brand

export const brandColumns: ColumnDef<BrandData>[] = [
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

  // {
  //   id: "actions",
  //   header: () => <div className="text-end">Action</div>,
  //   cell: ({ row }: { row: Row<BrandData> }) => <DeleteBrand row={row} />,
  // },
]
