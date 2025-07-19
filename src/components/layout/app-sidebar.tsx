"use client"

import DashboardPageRoute from "@/app/(root)/dashboard/route.info"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BadgeIndianRupee,
  BaggageClaim,
  Folders,
  LayoutDashboard,
  Shapes,
  Tag,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "static/icons/logo.svg"

import { LogOut } from "../auth/log-out"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: DashboardPageRoute.navigate(),
    icon: LayoutDashboard,
  },
  {
    title: "Product",
    url: "#",
    icon: BaggageClaim,
  },
  {
    title: "Order",
    url: "/orders",
    icon: Folders,
  },
  {
    title: "Category",
    url: "#",
    icon: Shapes,
  },
  {
    title: "Brand",
    url: "#",
    icon: Tag,
  },
  {
    title: "Customer",
    url: "#",
    icon: Users,
  },
  {
    title: "Offer",
    url: "#",
    icon: BadgeIndianRupee,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center px-1 py-2 bg-accent rounded-lg shrink-0 dark:bg-neutral-20">
            <Logo className="size-10 flex-shrink-0" />
            <SidebarGroupLabel>WatchVerse</SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item) => (
                <SidebarMenuItem key={item?.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex gap-3.5"
                    isActive={pathname === item?.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="p-0">
              {/* <LogOut />
                            <span>Logout</span> */}
              <LogOut />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
