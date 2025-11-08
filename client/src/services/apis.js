const BASE_URL = import.meta.env.VITE_BASE_URL

//auth endpoints
export const authEndpoints = {
    SENDOTP_API: BASE_URL + '/auth/otp',
    SIGNUP_API: BASE_URL + '/auth/signup',
    LOGIN_API: BASE_URL + '/auth/login',
    RESETPASSTOKEN_API: BASE_URL + '/auth/reset-password-token',
    RESETPASSWORD_API: BASE_URL + '/auth/reset-password'
}

//profile 
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + '/profile/details',
    GET_USER_ENROLLED_COURSES_API: BASE_URL + '/profile/enrolled-courses'
}

//contactUs
export const contactUsEndpoint = {
    CONTACT_US_API: BASE_URL + '/common/submit-contact-form'
}

//categories
export const categoryEndpoints = {
    CATEGORIES_API: BASE_URL + '/category/all'
}

//course
export const courseEndpoints = {
    ADDCOURSE_API: BASE_URL + '/category/course/create',
    EDITCOURSE_API: BASE_URL + '/category/course/update'
}