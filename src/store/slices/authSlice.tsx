import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

interface AuthState {
    user: null | { id: string; name: string };
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await api.post("/auth/login", credentials);
            return response.data; // expect { user, token }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
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
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
