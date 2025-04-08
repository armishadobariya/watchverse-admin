
import axiosInstance from "../axiosIntance";
import { LoginPayload, RegisterPayload } from "@/type/auth";
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
