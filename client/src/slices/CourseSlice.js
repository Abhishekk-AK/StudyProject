import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    course: null,
    published: false,
    editCourse: false,
    paymentLoading: false
}

const courseSlice = createSlice({
    name:'course',
    initialState:initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload
        },
        setCourse: (state, action) => {
            state.course = action.payload
        },
        setPublished: (state, action) => {
            state.published = action.payload
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editCourse = false
        }
    }
})

export const { 
    setStep, 
    setCourse, 
    setPublished,
    setEditCourse,
    setPaymentLoading,
    resetCourseState
} = courseSlice.actions;

export default courseSlice.reducer;