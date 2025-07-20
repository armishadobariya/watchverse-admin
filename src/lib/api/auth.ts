import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/type/auth"
import { ApiEndPoint } from "@/utils/constants"
import { toast } from "sonner"

// import { API_ENDPOINTS } from "@/utils/constants"

import axiosInstance from "../axiosIntance"
import { errorHandler } from "../utils"

// admin registration handler
export const registerAdminHandler = async (payload: RegisterPayload) => {
  try {
    const response = await axiosInstance.post(
      `${ApiEndPoint.REGISTER}`,
      payload,
    )
    if (response.data.statusCode !== 200) {
      toast.error(response.data.message)
      throw new Error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response.data
  } catch (error) {
    errorHandler(error)
  }
}

// admin login handler
export const loginAdminHandler = async (payload: LoginPayload) => {
  try {
    const response = await axiosInstance.post(ApiEndPoint.LOGIN, payload)
    if (response.data.statusCode !== 200) {
      toast.error(response.data.message)
      throw new Error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response.data
  } catch (error) {
    errorHandler(error)
  }
}

// forgot password handler
export const forgotPasswordHandler = async (payload: ForgotPasswordPayload) => {
  try {
    const response = await axiosInstance.post(
      `${ApiEndPoint.FORGOT_PASSWORD}`,
      payload,
    )
    if (response.data.statusCode !== 200) {
      toast.error(response.data.message)
      throw new Error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response.data
  } catch (error) {
    errorHandler(error)
  }
}

// reset password handler
export const resetPasswordHandler = async (
  id: string | null,
  payload: ResetPasswordPayload,
) => {
  try {
    const response = await axiosInstance.post(
      `${ApiEndPoint.RESET_PASSWORD}?id=${id}`,
      payload,
    )
    if (response.data.statusCode !== 200) {
      toast.error(response.data.message)
      throw new Error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response.data
  } catch (error) {
    errorHandler(error)
  }
}
