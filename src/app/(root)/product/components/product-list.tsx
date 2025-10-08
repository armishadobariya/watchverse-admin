import { DataTable } from "@/components/common/data-table"
import NA from "@/components/common/na"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ProductData, getProductsHandler } from "@/lib/api/product"
import { convertToCapitalize, formateDate } from "@/lib/utils"
import queryKeyFactory from "@/utils/queryKeyFactory"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ColumnDef, Row, RowSelectionState } from "@tanstack/react-table"
import { SquarePen, Trash2 } from "lucide-react"
import Image from "next/image"
import React, { useState } from "react"

const ProductList = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const data = useQuery({
    queryKey: queryKeyFactory?.productList(),
    queryFn: () =>
      getProductsHandler({
        search: "",
      }),
  })

  console.log("products", data?.data)
  return (
    <div>
      <h2>Product List</h2>
      <DataTable
        data={data?.data ?? []}
        columns={BrandColumns()}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        isLoading={data?.isPending}
      />
    </div>
  )
}

export default ProductList

// product column
export const BrandColumns = (): ColumnDef<ProductData>[] => {
  const ActionCell = ({ row }: { row: Row<ProductData> }) => {
    console.log("row: ", row)
    const queryClient = useQueryClient()
    console.log("queryClient: ", queryClient)

    // const deleteBrandMutation = useMutation({
    //   mutationFn: (id: string) => deleteBrandHandler(id),
    //   onSuccess: () =>
    //     queryClient.invalidateQueries({
    //       queryKey: queryKeyFactory?.brandList(),
    //     }),
    // })

    return (
      <div className="flex items-center justify-end gap-4">
        <Tooltip>
          <TooltipTrigger>
            {" "}
            {/* <AddBrandModal initialData={row.original} isEditing> */}
            <SquarePen className="size-5 cursor-pointer" />
            {/* </AddBrandModal> */}
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            {/* <DeleteItemModal
              text="Are you sure you want to delete this brand?"
              handleDelete={() =>
                deleteBrandMutation.mutateAsync(row.original._id)
              }
              loading={deleteBrandMutation.isPending}
            > */}
            <Trash2 className="size-5 text-red-700 cursor-pointer" />
            {/* </DeleteItemModal> */}
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
      meta: {
        className: "sticky left-0 bg-white z-50",
      },
    },
    {
      accessorKey: "thumbnail",
      header: () => <div className="">Product Name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <Image
              src={row?.original?.thumbnail ?? ""}
              alt={`${row.original.name} image`}
              width={48}
              height={48}
              className="size-10 object-cover rounded-md"
            />
            <span>{convertToCapitalize(row?.original?.name) || <NA />}</span>
          </div>
        )
      },
      meta: {
        className: "sticky left-[33px] bg-white z-50",
      },
    },

    {
      accessorKey: "productModel",
      header: "Product Model",
      cell: ({ row }) => {
        const productModel = row?.original?.productModel

        return (
          <>
            {productModel ? (
              productModel.length > 20 ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="max-w-[200px] truncate cursor-pointer">
                      {productModel}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-96 p-2 shadow-[1px_1px_10px_rgba(0,0,0,0.1)]">
                    <span>{productModel}</span>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="max-w-[200px] truncate">{productModel}</div>
              )
            ) : (
              <NA />
            )}
          </>
        )
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.category
          ?.map((category) => category.name)
          .join(", ")
        return <span>{convertToCapitalize(category) || <NA />}</span>
      },
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => {
        return (
          <span>{convertToCapitalize(row.original.brand?.name) || <NA />}</span>
        )
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return <span>₹ {row?.original?.price || <NA />}</span>
      },
    },
    {
      accessorKey: "stock",
      header: "Inventory",
      cell: ({ row }) => {
        return <span>{row?.original?.stock || <NA />}</span>
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        return (
          <span>
            {row?.original?.isActive ? (
              row?.original?.isActive ? (
                <Badge variant={"active"}>Active</Badge>
              ) : (
                <Badge variant={"destructive"}>Inactive</Badge>
              )
            ) : (
              <NA />
            )}
          </span>
        )
      },
    },
    {
      accessorKey: "warranty",
      header: "Warranty",
      cell: ({ row }) => {
        return <span>{row?.original?.warranty + " Months" || <NA />} </span>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = row.getValue("createdAt")
        return typeof date === "string"
          ? formateDate(date)
          : String(date) || <NA />
      },
    },

    {
      id: "actions",
      header: () => <div className="text-end">Action</div>,
      cell: ActionCell,
      meta: {
        className: "sticky right-0 bg-white z-50",
      },
    },
  ]
}
