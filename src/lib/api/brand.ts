import { ApiResponse } from "@/type/type"
import { ApiEndPoint } from "@/utils/constants"
import { toast } from "sonner"

import axiosInstance from "../axiosIntance"
import { errorHandler } from "../utils"

export interface BrandData {
  _id: string
  name: string
  icon: string
  iconPublicId: string
  image: string
  imagePublicId: string
  createdAt: string
  updatedAt: string
  __v: number
}

// API function to create a new category
export const addBrandHandler = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(`${ApiEndPoint.BRAND}`, formData)
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response.data
  } catch (error) {
    errorHandler(error)
  }
}

// get brand handler
export const getBrandsHandler = async (params: string) => {
  try {
    const response = await axiosInstance.get<ApiResponse<BrandData[]>>(
      `${ApiEndPoint.BRAND}?${params}`,
    )
    return response.data?.data
  } catch (error) {
    errorHandler(error)
  }
}
