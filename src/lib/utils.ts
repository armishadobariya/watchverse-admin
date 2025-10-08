import { AxiosError } from "axios"
import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// api error handler
export const errorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message)
    throw error
  }
  // Handle other error types if needed
  throw error
}

// date formatter
export const formateDate = (dateString: string) => {
  const date = new Date(dateString)
  const shortMonth = date.toLocaleString("en-US", { month: "short" })
  return `${shortMonth} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}

// Convert to Capitalize

export const convertToCapitalize = (str: string) => {
  return str?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}
