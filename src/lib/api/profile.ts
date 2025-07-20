import { ChangePasswordPayload, EditProfilePayload } from "@/type/type"
import { ApiEndPoint } from "@/utils/constants"
import { toast } from "sonner"

import axiosInstance from "../axiosIntance"
import { errorHandler } from "../utils"

// get profile handler
export const getProfileHandler = async () => {
  try {
    const response = await axiosInstance.get(ApiEndPoint.PROFILE)
    return response.data?.data
  } catch (error) {
    errorHandler(error)
  }
}

// edit profile handler
export const editProfileHandler = async (payload: EditProfilePayload) => {
  try {
    const response = await axiosInstance.post(ApiEndPoint.EDIT_PROFILE, payload)
    if (response.data?.statusCode !== 200) {
      toast.error(response.data.message)
      throw new Error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response?.data
  } catch (error) {
    errorHandler(error)
  }
}

// change password handler
export const changePasswordHandler = async (payload: ChangePasswordPayload) => {
  try {
    const response = await axiosInstance.post(
      ApiEndPoint.CHNAGE_PASSWORD,
      payload,
    )
    if (response.data?.statusCode !== 200) {
      toast.error(response.data.message)
      throw new Error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response?.data
  } catch (error) {
    errorHandler(error)
  }
}
