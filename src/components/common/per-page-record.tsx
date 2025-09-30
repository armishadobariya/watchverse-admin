import { BrandData } from "@/lib/api/brand"
import { Table as TanStackTable } from "@tanstack/react-table"
import React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface PerPageRecordProps {
  table: TanStackTable<BrandData>
}

const PerPageRecord = ({ table }: PerPageRecordProps) => {
  const pageSize = table.getState().pagination.pageSize

  const handleValueChange = (value: string) => {
    table.setPageSize(Number(value))
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-800 dark:text-white/70">Items Per Page</span>
      <Select value={pageSize.toString()} onValueChange={handleValueChange}>
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
  )
}

export default PerPageRecord
