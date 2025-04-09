import { API_ENDPOINTS } from "@/utils/constants";
import axiosInstance from "../axiosIntance";
import { ChangePasswordPayload, EditProfilePayload } from "@/type/type";

export const getProfile = async () => {
    const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.PROFILE}`
    );
    return response.data?.data;
};

export const editProfile = async (payload: EditProfilePayload) => {
    const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.EDIT_PROFILE}`,
        payload
    );
    if (response.data !== 200) {
        throw new Error(response.data.message);
    }
    return response?.data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
    const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.CHNAGE_PASSWORD}`,
        payload
    );
    if (response.data !== 200) {
        throw new Error(response.data.message);
    }
    return response?.data;
};