import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { OctagonAlert } from "lucide-react"
import React from "react"

import { Button } from "../ui/button"

interface DeleteItemModalProps {
  children: React.ReactNode
  text: string
  loading?: boolean
  handleDelete: () => void
}
const DeleteItemModal = ({
  children,
  text,
  handleDelete,
  loading,
}: DeleteItemModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="mx-auto flex flex-col items-center justify-center gap-3.5">
          <OctagonAlert className="text-teal size-20" />
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white/90">
              Confirm Delete
            </h1>
            <h2 className="text-lg font-medium text-slate-600 dark:text-white/70">
              {text}
            </h2>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 mt-5">
          <DialogClose>
            <Button
              type="submit"
              variant={"outline"}
              className="w-full"
              size={"lg"}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"destructive"}
            className="w-full"
            onClick={handleDelete}
            size={"lg"}
            loader={loading}
            disabled={loading}
          >
            yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteItemModal
