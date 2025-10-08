"use client"

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
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
        <Header />
        <MainLayout>{children}</MainLayout>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}

export default LayoutWrapper

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar()

  return (
    <section
      className={`${open ? "w-full md:w-[calc(100vw-260px)]" : "md:w-[calc(100vw-65px)]"} h-[calc(100vh-86px)] overflow-x-hidden overflow-y-auto p-6`}
    >
      {children}
    </section>
  )
}
