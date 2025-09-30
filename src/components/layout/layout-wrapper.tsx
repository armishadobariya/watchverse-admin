"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Provider from "@/lib/provider"
import { usePathname } from "next/navigation"
import React from "react"

import { AppSidebar } from "./app-sidebar"
import Header from "./header"

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const pathnames = [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ]

  if (pathnames.includes(pathname)) {
    return (
      <div>
        <Provider>{children}</Provider>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Provider>
          <Header />
          <div className="p-6">{children}</div>
        </Provider>
      </main>
    </SidebarProvider>
  )
}

export default LayoutWrapper
