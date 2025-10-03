"use client"

import BrandPageRoute from "@/app/(root)/brand/route.info"
import CategoryPageRoute from "@/app/(root)/category/route.info"
import DashboardPageRoute from "@/app/(root)/dashboard/route.info"
import ProductPageRoute from "@/app/(root)/product/route.info"
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
  useSidebar,
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: DashboardPageRoute.navigate(),
    icon: LayoutDashboard,
  },
  {
    title: "Product",
    url: ProductPageRoute.navigate(),
    icon: BaggageClaim,
  },
  {
    title: "Order",
    url: "/orders",
    icon: Folders,
  },
  {
    title: "Category",
    url: CategoryPageRoute.navigate(),
    icon: Shapes,
  },
  {
    title: "Brand",
    url: BrandPageRoute.navigate(),
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
  const { open } = useSidebar()

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
                      {!open ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <item.icon />
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <>
                          <item.icon />
                          <span>{item.title}</span>
                        </>
                      )}
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
