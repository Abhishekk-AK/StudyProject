import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
    total: localStorage.getItem('total') 
    ? JSON.parse(localStorage.getItem('total')) 
    : 0,
    totalItems: localStorage.getItem('totalItems') 
    ? JSON.parse(localStorage.getItem('totalItems')) 
    : 0
}

const cartSlice = createSlice ({
    name:'cart',
    initialState:initialState,
    reducers: {
        setCart(state, value) {
            state.cart = value.payload
        }, 
        setTotal(state, value) {
            state.total = value.payload
        },
        setTotalItems(state, value) {
            state.totalItems = value.payload
        }
        //add to cart
        //remove from cart
        //reset cart
    }
})

export const {setTotal, setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;