"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "../ui/button"

export function ThemeToggle(props: React.ComponentProps<typeof Button>) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        <Sun className="size-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 dark:text-neutral-20" />
        <Moon className="absolute size-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 dark:text-white/70" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
