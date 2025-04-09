import { API_ENDPOINTS } from "@/utils/constants";
import axiosInstance from "../axiosIntance";

export const getProfile = async () => {
    const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.PROFILE}`
    );
    return response.data?.data;
};