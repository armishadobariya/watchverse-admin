import { ApiResponse } from "@/type/type"
import { ApiEndPoint } from "@/utils/constants"
import { toast } from "sonner"

import axiosInstance from "../axiosIntance"
import { errorHandler } from "../utils"

export interface CategoryData {
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

// to create a new category handler
export const addCategoryHandler = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `${ApiEndPoint.CATEGORY}`,
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

// update category handler
export const updateCategoryHandler = async (id: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `${ApiEndPoint.CATEGORY}/${id}`,
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

// get category handler
export const getCategoryHandler = async (params: string) => {
  try {
    const response = await axiosInstance.get<ApiResponse<CategoryData[]>>(
      `${ApiEndPoint.CATEGORY}?${params}`,
    )
    return response.data?.data
  } catch (error) {
    errorHandler(error)
  }
}

// delete brand handler
export const deleteCategoryHandler = async (ids: string | string[]) => {
  try {
    const idsArray = Array.isArray(ids) ? ids : [ids]
    const queryString = idsArray
      ?.map((id, index) => `id[${index}]=${id}`)
      ?.join("&")
    const response = await axiosInstance.delete(
      `${ApiEndPoint.CATEGORY}?${queryString}`,
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
