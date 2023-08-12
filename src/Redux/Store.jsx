import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import userSlice from "./Slices/userSlice";
import productsSlice from "./Slices/productsSlice";


const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
        products: productsSlice
    }
})

export default store