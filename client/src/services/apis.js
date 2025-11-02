const BASE_URL = import.meta.env.VITE_BASE_URL

//auth endpoints
export const authEndpoints = {
    RESETPASSTOKEN_API: BASE_URL + '/auth/reset-password-token',
    RESETPASSWORD_API: BASE_URL + '/auth/reset-password'
}

//contactUs
export const contactUsEndpoint = {
    CONTACT_US_API: BASE_URL + '/common/submit-contact-form'
}


export const categories = {
    CATEGORIES_API: BASE_URL + '/category/all'
}