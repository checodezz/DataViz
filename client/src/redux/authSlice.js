import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for logging in
export const loginUserAsync = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `https://data-visualization-dashboard-seven.vercel.app/user/login`,
                userData,
                {
                    withCredentials: true
                }
            );
            console.log(response.data.existingUser);
            return response.data.existingUser;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for logging out
export const logoutUserAsync = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `https://data-visualization-dashboard-seven.vercel.app/user/logout`,
                {},
                {
                    withCredentials: true
                }
            );
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            // Handle logout
            .addCase(logoutUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
