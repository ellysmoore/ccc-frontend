import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // Needed if you're using cookies for sessions
});

// Request Interceptor: Add Bearer token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("cc_token"); // Or use a Redux selector via store.getState()

        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized, logging out...");
            // store.dispatch(logout());

            // Optional: redirect user to login page
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
