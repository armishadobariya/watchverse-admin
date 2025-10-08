import { ApiResponse } from "@/type/type"
import { ApiEndPoint } from "@/utils/constants"
import { toast } from "sonner"

import axiosInstance from "../axiosIntance"
import { errorHandler } from "../utils"
import { BrandData } from "./brand"
import { CategoryData } from "./category"

export interface ProductData {
  _id: string
  name: string
  productModel: string
  description: string
  thumbnail?: string
  thumbnailPublicId?: string
  category: CategoryData[]
  brand: BrandData
  stock: number
  price: number
  dummyPrice: number
  warranty: string
  isActive: boolean
  offer: number
  image: string[]
  createdAt: string
  updatedAt: string
  __v: number
  rating: number
  totalReviews: number
}

export interface ProductParams {
  search?: string
  startPrice?: number
  endPrice?: number
  startStockRange?: number
  endStockRange?: number
}

// to create a new product handler
export const addProductHandler = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `${ApiEndPoint.PRODUCT}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )
    if (response.data.statusCode !== 200) {
      toast.error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response.data
  } catch (error) {
    errorHandler(error)
  }
}

// get product handler with optional filters
export const getProductsHandler = async (params?: ProductParams) => {
  try {
    const response = await axiosInstance.get<ApiResponse<ProductData[]>>(
      ApiEndPoint?.PRODUCT,
      {
        params: params,
      },
    )
    return response.data?.data
  } catch (error) {
    errorHandler(error)
    throw error
  }
}
