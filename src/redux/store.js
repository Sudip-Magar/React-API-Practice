import { configureStore } from "@reduxjs/toolkit";
import roomApiReducer from "./slice/roomApi"
import bookingReducer from "./slice/bookingSlice"
export const store = configureStore({
    reducer: {
        room: roomApiReducer,
        booking: bookingReducer,
    }
})