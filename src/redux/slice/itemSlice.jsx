import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk("fetchItems", async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
    return response.json();
});

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        isLoading: false,
        data: [],
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        });
    }
});

export default itemSlice.reducer;
