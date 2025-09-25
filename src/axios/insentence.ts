import axios from "axios";


export const publicApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const protectedApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

protectedApi.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
