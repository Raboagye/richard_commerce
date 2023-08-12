import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {
        pushProducts: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { pushProducts } = productsSlice.actions

export default productsSlice.reducer

