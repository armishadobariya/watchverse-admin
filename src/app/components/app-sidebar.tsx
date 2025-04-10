"use client";
import {
    LayoutDashboard,
    BaggageClaim,
    Folders,
    Shapes,
    Tag,
    Users,
    BadgeIndianRupee,
    CircleUserRound,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "./log-out";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Product",
        url: "/products",
        icon: BaggageClaim,
    },
    {
        title: "Order",
        url: "/orders",
        icon: Folders,
    },
    {
        title: "Category",
        url: "/category",
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
    {
        title: "Profile",
        url: "/profile",
        icon: CircleUserRound,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center py-4">
                        <Image src="/icons/logo.svg" width={40} height={40} alt="logo" />
                        <SidebarGroupLabel>WatchVerse</SidebarGroupLabel>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className="flex  gap-3.5"
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
    );
}
