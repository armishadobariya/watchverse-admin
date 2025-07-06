"use client"

import { getProfileHandler } from "@/lib/api/profile"
import { useQuery } from "@tanstack/react-query"
import { CircleUserRound } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"

const Header = () => {
  const pathname = usePathname()
  const fromatePath = () =>
    pathname
      .replace("/", "")
      .split("/")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileHandler,
  })
  return (
    <header className="!w-full shadow-sm">
      <div className="flex w-full items-center justify-between px-5 py-6">
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
          <CircleUserRound className="bg-teal !size-9 rounded-full p-1 text-white" />
          <span className="font-semibold text-slate-900">
            {profile.data?.username}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
