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

// to create a new brand handler
export const addBrandHandler = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(`${ApiEndPoint.BRAND}`, formData)
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

// update brand handler
export const updateBrandHandler = async (id: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `${ApiEndPoint.BRAND}/${id}`,
      formData,
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

// delete brand handler
export const deleteBrandHandler = async (ids: string | string[]) => {
  try {
    const idsArray = Array.isArray(ids) ? ids : [ids]
    const queryString = idsArray
      ?.map((id, index) => `id[${index}]=${id}`)
      ?.join("&")
    const response = await axiosInstance.delete(
      `${ApiEndPoint.BRAND}?${queryString}`,
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
