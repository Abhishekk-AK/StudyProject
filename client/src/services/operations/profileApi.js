import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { instructorEndpoints, profileEndpoints } from "../apis";

const {
    GET_USER_ENROLLED_COURSES_API
} = profileEndpoints

const {
    INSTRUCTOR_DASHBOARD_API
} = instructorEndpoints

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
        console.log(response)

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

export async function getInstructorData(token) {
    const toastId = toast.loading('Loading...')
    let result = []
    try {
        const response = await apiConnector('GET', INSTRUCTOR_DASHBOARD_API, null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Get Instructor data response:', response)

        if(!response.data.success)
            throw new Error(response.data.message)

        result = response?.data?.courses
        console.log(result)

    } catch (err) {
        console.log('Get Instructor Data API error:', err)
        toast.error(`Couldn't get Instructor data.`)
    }
    toast.dismiss(toastId)
    return result
}