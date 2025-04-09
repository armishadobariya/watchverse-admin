
import axiosInstance from "../axiosIntance";
import { ForgotPasswordPayload, LoginPayload, RegisterPayload, ResetPasswordPayload } from "@/type/auth";
import { API_ENDPOINTS } from "@/utils/constants";

// admin registration handler
export const registerAdmin = async (payload: RegisterPayload) => {
    const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.REGISTER}`,
        payload
    );
    // if (response.data.statusCode !== 200) {
    //   throw new Error(response.data.message);
    // }
    return response.data;
};

// admin login handler
export const loginAdmin = async (payload: LoginPayload) => {
    const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.LOGIN}`,
        payload
    );
    if (response.data.statusCode !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
};

// forgot password handler
export const forgotPassword = async (payload: ForgotPasswordPayload) => {
    const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.FORGOT_PASSWORD}`,
        payload
    );
    if (response.data.statusCode !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
};

// reset password handler
export const resetPassword = async (
    id: string | null,
    payload: ResetPasswordPayload
) => {
    const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.RESET_PASSWORD}?id=${id}`,
        payload
    );
    if (response.data.statusCode !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
};