import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const bookingCreate = createAsyncThunk(
    "room/createBooking",
    async (formData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch('http://diyalo.localhost:8080/api/booking/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

            return data
        } catch (error) {
            return rejectWithValue(error.messsage);
        }
    }
);


const bookingSlice = createSlice({
    name: "room",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        errors: null, // <--- add this
    },

    extraReducers: (builder) => {
        builder
            .addCase(bookingCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errors = null;
            })
            .addCase(bookingCreate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
                state.isError = false;
                state.errors = null;
            })
            .addCase(bookingCreate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                // <--- store backend validation errors
                state.errors = action.payload?.errors || { general: action.payload?.message || "Something went wrong" };
            });
    },
});

export default bookingSlice.reducer;