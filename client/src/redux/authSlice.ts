import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;