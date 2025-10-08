import LayoutWrapper from "@/components/layout/layout-wrapper"
import { ThemeProvider } from "@/components/layout/theme-provider"
import varela_Round from "@/fonts/varela-round"
import Provider from "@/lib/provider"
import type { Metadata } from "next"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Toaster } from "sonner"

import "./globals.css"

export const metadata: Metadata = {
  title: "WatchVerse",
  description: "WatchVerse",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${varela_Round.variable}, h-screen w-screen overflow-hidden antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider>
            <NuqsAdapter>
              <LayoutWrapper>{children}</LayoutWrapper>
            </NuqsAdapter>
          </Provider>
        </ThemeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              error:
                "bg-red-50 w-full flex !item-center gap-2 text-red-400 border border-red-100 px-2 py-3 rounded-md shadow-md text-sm",
              success:
                "text-green-400 bg-green-50 border border-green-100  w-full px-2 py-3 rounded-md shadow-md text-sm flex item-center gap-2",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />
      </body>
    </html>
  )
}
