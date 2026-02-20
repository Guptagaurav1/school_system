import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_SERVER_PATH}`,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            if (config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("accessToken");
                if (window.location.pathname !== "/") {
                    window.location.href = "/";
                }

            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
