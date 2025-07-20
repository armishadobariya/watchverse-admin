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
