import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteCookie } from "cookies-next"
import { LogOutIcon, OctagonAlert } from "lucide-react"
import { redirect } from "next/navigation"

export const LogOut = () => {
  const handleLogout = () => {
    deleteCookie("AUTH_TOKEN")
    deleteCookie("REFRESH_TOKEN")
    redirect("/login")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex h-auto w-full cursor-pointer justify-start gap-3.5 rounded-md bg-red-50 px-2 py-3 text-base text-red-500 transition-colors duration-300 hover:bg-red-50 hover:text-red-600">
          <LogOutIcon className="size-6" />
          <span>Logout</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="mx-auto flex flex-col items-center justify-center gap-3.5">
          <OctagonAlert className="text-teal size-20" />
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-800">
              Confirm Logout
            </h1>
            <h2 className="text-lg font-medium text-slate-600">
              Are you sure you want to log out?
            </h2>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2">
          <DialogClose>
            <Button type="submit" variant={"outline"} className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"destructive"}
            className="w-full"
            onClick={handleLogout}
          >
            yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
