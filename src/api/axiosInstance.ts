
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// reads from .env

const api = axios.create({
    // baseURL: BACKEND_URL,
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default api;
