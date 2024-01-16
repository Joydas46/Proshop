import { createSlice } from "@reduxjs/toolkit"

// We want our items in the local stprage,so that even if we leave the site the items will be in the cart.
// So when we come back the items willbe theer in the cart still.
// Therefore here we are schecking the local sotrage first
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {}
})

export default cartSlice.reducer