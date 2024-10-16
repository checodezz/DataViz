import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice.js"
import dashboardSlice from "./dashboardSlice.js"
export const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice
    }
})

