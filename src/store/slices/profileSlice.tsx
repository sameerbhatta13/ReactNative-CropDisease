import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

interface ProfileState {
    profile: string | null
    token: string | null;
    setUser: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profile: null,
    token: null,
    setUser: false,
    loading: false,
    error: null,
};
export const createProfile = createAsyncThunk(
    "profile/createProfile",
    async (formData: Record<string, any>, { rejectWithValue }) => {
        try {
            const response = await api.post("/profile", formData);
            return response.data; // expect { user, token }
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Async thunk for login
export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/profile");
            return response.data; // expect { user, token }
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        deleteProfile: (state) => {
            state.profile = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProfile.pending, (state) => {
                state.loading = true;
                state.setUser = false
                state.error = null;
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload.data;
                state.setUser = true;
                state.token = action.payload.data.accessToken;

                AsyncStorage.setItem('token', action.payload.data.accessToken)
            })
            .addCase(createProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.setUser = false;
                state.error = action.payload?.message || "Login failed";
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.setUser = false;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.setUser = true;
                state.profile = action.payload.data;
                state.token = action.payload.data.accessToken;

                AsyncStorage.setItem('token', action.payload.data.accessToken)
            })
            .addCase(getProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.setUser = false
                state.error = action.payload?.message || "Register failed";
            });
    },
});

export const { deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;
