import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

const {
    GET_USER_ENROLLED_COURSES_API
} = profileEndpoints

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading('Loading..')
    let result = []
    try {
        const response = await apiConnector(
            'GET',
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            },
        )

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data

    } catch (err) {
        console.log('Error in getting enrolled courses', err)
        toast.error('Could not get enrolled courses.')
    }
    toast.dismiss(toastId)
    return result
}