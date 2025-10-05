import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface Profile {
    _id: string;
    user: User;
    dob: string; // ISO date string
    address: string;
    phone: string;
    gender: "male" | "female" | "other";
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ProfileState {
    profile: Profile | null;
    setProfile: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profile: null,
    setProfile: false,
    loading: false,
    error: null,
};
export const createProfile = createAsyncThunk(
    "profile/createProfile",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post("/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data; // { success, message, data }
        } catch (err: any) {
            return rejectWithValue(err.response?.data);
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

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.patch("/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data);
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        deleteProfile: (state) => {
            state.profile = null;
            state.setProfile = false
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProfile.pending, (state) => {
                state.loading = true;
                state.setProfile = false
                state.error = null;
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload.data;
                state.setProfile = true;

            })
            .addCase(createProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.setProfile = false;
                state.error = action.payload?.message || "Login failed";
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.setProfile = false;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.setProfile = true;
                state.profile = action.payload.data;

            })
            .addCase(getProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.setProfile = false
                state.error = action.payload?.message || "Register failed";
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.setProfile = false;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.setProfile = true;
                state.profile = action.payload.data;

            })
            .addCase(updateProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.setProfile = false
                state.error = action.payload?.message || "Register failed";
            });
    },
});

export const { deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;
