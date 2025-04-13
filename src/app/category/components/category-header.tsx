import { FolderDown } from "lucide-react";
import React from "react";
import AddCategoryDialog from "./add-category-dialog";
// import AddCategory from "./add-category";

const CategoryHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 bg-bronze-foreground px-4 py-2.5 w-fit text-bronze font-semibold  xl:text-lg rounded-md">
                    <FolderDown />
                    <span>Export</span>
                </div>
                <p className="text-slate-800 font-medium">
                    <span>(20)</span> categories
                </p>
            </div>
            <AddCategoryDialog />
        </div>
    );
};

export default CategoryHeader;
