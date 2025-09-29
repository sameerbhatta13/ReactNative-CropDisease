
import axios from "axios";

// reads from .env

const api = axios.create({
    // baseURL: BACKEND_URL,
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
