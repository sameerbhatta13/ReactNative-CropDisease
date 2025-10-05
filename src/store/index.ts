import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profielReducer from "./slices/profileSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profielReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
