"use client";
import { getProfile } from "@/lib/api/profile";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
    const pathname = usePathname();
    const fromatePath = () =>
        pathname
            .replace("/", "")
            .split("/")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");

    const profile = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });
    return (
        <header className="!w-full shadow-sm">
            <div className="flex items-center justify-between w-full py-6 px-5">
                {pathname === "/" ? (
                    <h1 className="ml-3 text-lg font-semibold text-slate-900">
                        Dashboard
                    </h1>
                ) : (
                    <h1 className="ml-3 text-lg font-semibold text-slate-900">
                        {fromatePath()}
                    </h1>
                )}
                <div className="flex items-center gap-2">
                    <CircleUserRound className=" text-white p-1 bg-bronze !size-9 rounded-full" />
                    <span className="text-slate-900 font-semibold">
                        {profile.data?.username}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
