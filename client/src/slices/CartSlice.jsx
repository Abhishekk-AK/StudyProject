import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
        //add to cart
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index >= 0) {
                //if the course is already in the cart, do not modify cart
                toast('Course already in cart', {icon: 'ℹ️'})
                return
            }

            //if the course is not in the cart
            state.cart.push(course)
            //update quantity and price
            state.totalItems++
            state.total += course.price

            localStorage.setItem('cart', JSON.stringify(state.cart))
            localStorage.setItem('total', JSON.stringify(state.total))
            localStorage.setItem('totalItems', JSON.stringify(state.totalItems))

            toast.success('Course added to cart')
        },

        //remove from cart
        removeFromCart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            if(index >= 0) {
                //if course is present remove it
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)

                localStorage.setItem('cart', JSON.stringify(state.cart))
                localStorage.setItem('total', JSON.stringify(state.total))
                localStorage.setItem('totalItems', JSON.stringify(state.totalItems))

                toast.success('Course is removed from cart')
            }
        },

        //reset cart
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0

            localStorage.removeItem('cart')
            localStorage.removeItem('total')
            localStorage.removeItem('totalItems')
        }
    }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;