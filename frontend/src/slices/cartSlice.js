import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../utils/cartUtils"

// We want our items in the local stprage,so that even if we leave the site the items will be in the cart.
// So when we come back the items willbe theer in the cart still.
// Therefore here we are schecking the local sotrage first
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // storing the item which is being added to the cart, this willbe present as part of the payload
            const item = action.payload
            // If the items exist in the cartItems array then store the item im the existItem variable.
            const existItem = state.cartItems.find((i) => i._id === item._id)
            // If item exist in the cartItems array then return that item , else update the item in the cartItems array.
            if (existItem) {
                state.cartItems = state.cartItems.map((i) => i._id === existItem._id ? item : i)
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            // updating the cart
            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)
            return updateCart(state)
        }
    }
})

// exporting the actions
export const { addToCart, removeFromCart } = cartSlice.actions
// exporting the reducer
export default cartSlice.reducer