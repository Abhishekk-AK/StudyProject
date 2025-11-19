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
    CATEGORIES_API: BASE_URL + '/category/all',
    CATEGORY_PAGE_API: BASE_URL + '/category/detail'
}

//course
export const courseEndpoints = {
    ADDCOURSE_API: BASE_URL + '/category/course/create',
    EDITCOURSE_API: BASE_URL + '/category/course/update',
    COURSE_DETAILS_API: BASE_URL + '/category/course/detail',
    CREATE_SECTION_API: BASE_URL + '/category/course/section/create',
    UPDATE_SECTION_API: BASE_URL + '/category/course/section/update',
    DELETE_SECTION_API: BASE_URL + '/category/course/section/delete',
    CREATE_SUBSECTION_API: BASE_URL + '/category/course/section/subSection/create',
    UPDATE_SUBSECTION_API: BASE_URL + '/category/course/section/subSection/update',
    DELETE_SUBSECTION_API: BASE_URL + '/category/course/section/subSection/delete',
    INSTRUCTOR_COURSES_API: BASE_URL + '/category/instructor/courses',
    LECTURE_COMPLETION_API: BASE_URL +'/category/course/progress/update',
    GET_AUTHENTICATED_COURSE_DETAILS_API: BASE_URL + '/category/course/authenticated/detail'
}

//student
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + '/payment/capture',
    COURSE_VERIFY_API: BASE_URL + '/payment/verify',
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + '/payment/success-email'
}

//rating
export const ratingEndpoints = {
    CREATE_RATING_REVIEWS_API: BASE_URL + '/category/createRating',
    ALL_RATING_REVIEWS_API: BASE_URL + '/category/allRatingReviews'
}

//instructor
export const instructorEndpoints = {
    INSTRUCTOR_DASHBOARD_API: BASE_URL + '/profile/instructor/dashboard'
}