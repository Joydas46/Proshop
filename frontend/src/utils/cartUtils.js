// helper functon to add correct amount of decimals
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    // calculate the item price
    state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price*item.qty, 0)
    // calculate the shipping price (if the order price is more than 100 then shipping free else 10% of order price)
    state.shippingPrice = state.itemsPrice > 100 ? 0 : (0.10*state.itemsPrice).toFixed(2)
    // calculate the tax price
    state.taxPrice = (0.05*state.itemsPrice).toFixed(2)
    // calculate the total price
    state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice)
        ).toFixed(2)
    
    // storing the cart in the local storage
    localStorage.setItem("cart", JSON.stringify(state))

    return state
}