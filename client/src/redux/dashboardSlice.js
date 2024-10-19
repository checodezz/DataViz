import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardDataAsync = createAsyncThunk(
    "dashboard/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://data-visualization-dashboard-seven.vercel.app/dashboard", {
                withCredentials: true,
            });
            console.log(response.data)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardDataAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardDataAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDashboardDataAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dashboardSlice.reducer;
