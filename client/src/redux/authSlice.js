import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const loginUserAsync = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/user/login`,
                userData,
                {
                    withCredentials: true
                }
            );
            return response.data.existingUser;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUserAsync = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/user/logout`,
                {},
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isAuthenticated: sessionStorage.getItem("isAuthenticated") === "true" || false,
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
                sessionStorage.setItem("isAuthenticated", true);
                sessionStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                console.log(action.payload);
                state.error = action.payload;
                sessionStorage.removeItem("isAuthenticated");
                sessionStorage.removeItem("user");
            })
            .addCase(logoutUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
                sessionStorage.removeItem("isAuthenticated");
                sessionStorage.removeItem("user");
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
