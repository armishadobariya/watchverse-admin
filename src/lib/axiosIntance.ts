import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

// Queue for requests waiting for token refresh
const refreshRequestQueue: {
    config: AxiosRequestConfig;
    resolve: (value: AxiosResponse) => void;
    reject: (error: AxiosError) => void;
}[] = [];

let isRefreshInProgress = false;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Enable if using HTTP-only cookies
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = getCookie("AUTH_TOKEN");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        const { token, refreshToken } = response.data;

        // Update tokens if they are in the response
        if (token) {
            setCookie("AUTH_TOKEN", token, { maxAge: 30 * 24 * 60 * 60 }); // 30 days
        }
        if (refreshToken) {
            setCookie("REFRESH_TOKEN", refreshToken, { maxAge: 30 * 24 * 60 * 60 });
        }

        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        // Check if it's a 401 error (Unauthorized) and not a login request
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== "/auth/login"
        ) {
            originalRequest._retry = true;

            if (!isRefreshInProgress) {
                isRefreshInProgress = true;
                try {
                    const refreshToken = getCookie("REFRESH_TOKEN");
                    if (!refreshToken) {
                        throw new Error("No refresh token available");
                    }

                    // Request a new token using the refresh token
                    const refreshResponse = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
                        { refreshToken }
                    );

                    const { token: newToken, refreshToken: newRefreshToken } =
                        refreshResponse.data;

                    // Update tokens in cookies
                    if (newToken) {
                        setCookie("AUTH_TOKEN", newToken, { maxAge: 30 * 24 * 60 * 60 });
                    }
                    if (newRefreshToken) {
                        setCookie("REFRESH_TOKEN", newRefreshToken, {
                            maxAge: 30 * 24 * 60 * 60,
                        });
                    }

                    // Update Axios default headers
                    axiosInstance.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${newToken}`;

                    // Retry all queued requests
                    refreshRequestQueue.forEach(({ config, resolve, reject }) => {
                        axiosInstance.request(config).then(resolve).catch(reject);
                    });

                    // Clear the queue
                    refreshRequestQueue.length = 0;

                    // Retry the original request
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // Clear cookies and redirect to login on failure
                    deleteCookie("AUTH_TOKEN");
                    deleteCookie("REFRESH_TOKEN");
                    if (typeof window !== "undefined") {
                        window.location.href = "/login";
                    }
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshInProgress = false;
                }
            }

            // If refresh is in progress, add to queue
            return new Promise((resolve, reject) => {
                refreshRequestQueue.push({
                    config: originalRequest,
                    resolve,
                    reject,
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
