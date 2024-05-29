import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from '../slice/itemSlice';  // Ensure the correct path to the itemSlice file

export const store = configureStore({
    reducer: {
        items: itemsReducer
    }
});
