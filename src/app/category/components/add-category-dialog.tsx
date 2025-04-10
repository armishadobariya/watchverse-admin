"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddCategoryForm } from "./add-category-form";

const AddCategoryDialog = () => {
    return (
        <Dialog>
            <DialogTrigger className="flex items-center bg-slate-900 rounded-md text-bronze text-base !px-4 !py-2.5 h-full w-fit cursor-pointer">
                <Plus className="size-6" />
                Add Category
            </DialogTrigger>
            <DialogContent className="!max-w-2xl w-full space-y-5">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-2">
                    <AddCategoryForm />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryDialog;
