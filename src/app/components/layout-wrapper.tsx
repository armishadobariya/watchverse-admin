"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import Provider from "@/lib/provider";
// import Header from "./header";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const pathnames = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
    ];

    if (pathnames.includes(pathname)) {
        return (
            <div>
                <Provider>{children}</Provider>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <Provider>
                    {/* <Header /> */}
                    {children}
                </Provider>
            </main>
        </SidebarProvider>
    );
};

export default LayoutWrapper;
