import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

interface AuthState {
    user: null | { id: string; name: string, email: string };
    token: string | null;
    setUser: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    setUser: false,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData: Record<string, any>, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/register", formData);
            return response?.data; // expected { user, accessToken }
        } catch (err: any) {
            // Safely handle network errors
            if (err.response && err.response?.data) {
                return rejectWithValue(err.response?.data);
            }
            return rejectWithValue({ message: err.message || "Network error" });
        }
    }
);


// Async thunk for login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", credentials);
            return response?.data; // expect { user, token }
        } catch (err: any) {
            return rejectWithValue(err.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.setUser = false
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data?.user;
                state.setUser = true;
                state.token = action.payload?.data?.accessToken;

                AsyncStorage.setItem('token', action?.payload?.data?.accessToken)
            })
            .addCase(loginUser.rejected, (state, action: any) => {
                state.loading = false;
                state.setUser = false;
                state.error = action.payload?.message || "Login failed";
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.setUser = false;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.setUser = true;
                state.user = action.payload?.data?.user;
                state.token = action.payload?.data?.accessToken;

                AsyncStorage.setItem('token', action.payload.data.accessToken)
            })
            .addCase(registerUser.rejected, (state, action: any) => {
                state.loading = false;
                state.setUser = false
                state.error = action?.payload || "Register failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
