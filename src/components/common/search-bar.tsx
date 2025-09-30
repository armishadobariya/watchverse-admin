"use client"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { parseAsString, useQueryState } from "nuqs"
import React from "react"

interface SearchBarProps {
  placeholder?: string
}

const SearchBar = ({ placeholder = "Search..." }: SearchBarProps) => {
  // Use NuQS to sync search with URL query params
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value || null)
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "relative flex gap-2.5 rounded-lg border-[1px] duration-150 ease-linear w-full md:w-[235px]",
          search ? "border-gray-600" : "border-gray-300",
        )}
      >
        <input
          type="search"
          className="w-full rounded-xl border-none p-2 pl-9 text-sm leading-5 font-normal outline-none focus:ring-0 focus:outline-none dark:bg-transparent"
          placeholder={placeholder}
          value={search}
          onChange={handleInputChange}
        />
        <Search className="text-sub-text absolute top-1/2 left-3 z-0 size-4 -translate-y-1/2" />
      </div>
    </div>
  )
}

export default SearchBar
