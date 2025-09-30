import { FolderDown } from "lucide-react"
import React from "react"

interface SectionHeaderProps {
  count: number
  name: string
  selectedCount?: number
  onDeleteSelected?: () => void
}

const SectionHeader = ({
  count,
  name,
  selectedCount = 0,
  onDeleteSelected,
}: SectionHeaderProps) => {
  console.log("selectedCount: ", selectedCount)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 bg-bronze-foreground px-4 py-2 w-fit text-slate-800 font-medium border rounded-md text-sm cursor-pointer dark:text-white/70 dark:border-neutral-20">
          <FolderDown className="size-[18px]" />
          <span>Export</span>
        </div>
        <p className="text-slate-800 font-medium text-sm dark:text-white/70">
          <span>({count})</span> {name}
        </p>

        {selectedCount > 0 && (
          <div
            onClick={onDeleteSelected}
            className="flex items-center gap-2.5 bg-red-50 px-4 py-2 w-fit text-red-500 font-medium border border-red-200 dark:bg-neutral-20 dark:text-red-400 rounded-md text-sm cursor-pointer hover:bg-red-100 dark:hover:bg-neutral-30 transition-colors"
          >
            <span>Delete ({selectedCount})</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionHeader
