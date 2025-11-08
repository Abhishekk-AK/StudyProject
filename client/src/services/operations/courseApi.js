import toast from "react-hot-toast";
import { categoryEndpoints, courseEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    CATEGORIES_API
} = categoryEndpoints

const {
    ADDCOURSE_API,
    EDITCOURSE_API
} = courseEndpoints

export async function fetchCourseCategories() {
    let result = []
    const toastId = toast.loading('Loading...')

    try {
        const response = await apiConnector('GET', CATEGORIES_API)

        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }

        result = response?.data?.allCategorys
        toast.success('course Categories fetched successfully.')

    } catch (err) {
        console.error(err)
        toast.error('Could not fetch categories.')
    }
    toast.dismiss(toastId)
    return result
}


export async function addCourseDetails(data, token) {
    let result = null
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', ADDCOURSE_API, data,
            {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        )

        console.log('addcourse response :', response)

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        toast.success('Course details added successfully')
        result = response?.data?.data

    } catch (err) {
        console.log("Add COURSE API ERROR...", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

export async function editCourseDetails(data, token) {
    let result = null
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', EDITCOURSE_API, data,
            {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        )

        console.log('EditCourse response :', response)

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        toast.success('Course details updated successfully')
        result = response?.data?.data

    } catch (err) {
        console.log("Edit COURSE API ERROR...", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}