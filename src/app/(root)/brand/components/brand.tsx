"use client"

import { DataTable } from "@/components/common/data-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { BrandData, getBrandsHandler } from "@/lib/api/brand"
import { formateDate } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import React from "react"

import AddBrandModal from "./add-brand-modal"

const Brand = () => {
  const data = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrandsHandler(),
  })

  return (
    <div>
      <AddBrandModal>
        <Button variant={"outline"}>Add brand</Button>
      </AddBrandModal>

      <div>
        <DataTable
          columns={brandColumns}
          data={data?.data || []}
          searchPlaceholder="search brands..."
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
        <div className="font-semibold text-base text-slate-800">
          {row.original.name}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <span>Created At</span>,
    cell: ({ row }) => {
      const date = row.getValue("createdAt")
      if (typeof date === "string") {
        return (
          <div className="text-slate-800 text-sm font-semibold">
            {formateDate(date)}
          </div>
        )
      }
      return <div className="text-slate-800 text-sm">{String(date)}</div>
    },
  },

  // {
  //   id: "actions",
  //   header: () => <div className="text-end">Action</div>,
  //   cell: ({ row }: { row: Row<BrandData> }) => <DeleteBrand row={row} />,
  // },
]
