import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRoom = createAsyncThunk(
    "room/fetchRoom",
    async ({ checkin, checkout, roomNo }) => {
        localStorage.setItem('token', '6|9MuwmWanAYrFNdQfleQiiXQeXk0KkiYL3f1EYmeMba2ed51a')
        const token = localStorage.getItem("token");

        const checkinDate = new Date(checkin).toISOString().split("T")[0];
        const checkoutDate = new Date(checkout).toISOString().split("T")[0];

        const response = await fetch(`http://diyalo.localhost:8080/api/room?checkin=${checkinDate}&checkout=${checkoutDate}&guest=${roomNo}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        return await response.json();
    }
);

const roomSlice = createSlice({
    name: "room",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoom.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;


            })
            .addCase(fetchRoom.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default roomSlice.reducer;