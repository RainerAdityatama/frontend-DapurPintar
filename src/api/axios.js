import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

    withCredentials: true,

    withXSRFToken: true,

    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response.status;
        const url = error.config.url;

        if (status === 401) {
            if (url.includes("/api/user")) {
                return Promise.reject(error);
            }

            window.location.replace("/login");
        }

        return Promise.reject(error);
    },
);

export default api;
