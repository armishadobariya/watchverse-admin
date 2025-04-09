import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCookie } from "cookies-next";
import { LogOutIcon, OctagonAlert } from "lucide-react";
import { redirect } from "next/navigation";

export const LogOut = () => {
    const handleLogout = () => {
        deleteCookie("AUTH_TOKEN");
        deleteCookie("REFRESH_TOKEN");
        redirect("/login");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex w-full gap-3.5 px-2 py-3 cursor-pointer text-red-500 bg-red-50 rounded-md hover:text-red-600 hover:bg-red-50  transition-colors duration-300 justify-start h-auto text-base">
                    <LogOutIcon className="size-6" />
                    <span>Logout</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col gap-3.5 mx-auto justify-center items-center">
                    <OctagonAlert className="size-20 text-bronze" />
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-semibold text-slate-800">
                            Confirm Logout
                        </h1>
                        <h2 className="text-lg text-slate-600 font-medium">
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
    );
};
