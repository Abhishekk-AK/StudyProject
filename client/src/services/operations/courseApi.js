import toast from "react-hot-toast";
import { categoryEndpoints, courseEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    CATEGORIES_API
} = categoryEndpoints

const {
    ADDCOURSE_API,
    EDITCOURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API
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


export async function createSection(data, token) {
    let result = null 
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', CREATE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Add section response:', response)

        if(!response?.data?.success) {
            throw new Error('Could not add section.')
        }

        result = response?.data?.updatedCourseDetails

        toast.success('New Section created successfully.')

    } catch (err) {
        console.log('Error in creating New section:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

export async function updateSection(data, token) {
    let result = null 
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('PUT', UPDATE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Edit section response:', response)

        if(!response?.data?.success) {
            throw new Error('Could not edit section.')
        }

        result = response?.data?.updatedCourse
        toast.success('Section edited successfully.')

    } catch (err) {
        console.log('Error in editing section:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

export async function deleteSection(data, token) {
    let result = null 
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('DELETE', DELETE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Delete section response:', response)

        if(!response?.data?.success) {
            throw new Error('Could not delete section.')
        }

        result = response?.data?.course
        toast.success('Section deleted successfully.')

    } catch (err) {
        console.log('Error in deleting section:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}


export async function  createSubSection(data, token) {
    let result = null 
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', CREATE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Add subsection response:', response)

        if(!response?.data?.success) {
            throw new Error('Could not add subsection.')
        }

        result = response?.data?.data
        toast.success('New Subsection created successfully.')

    } catch (err) {
        console.log('Error in creating New subsection:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

export async function  updateSubSection(data, token) {
    let result = null 
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', UPDATE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Edit subsection response:', response)

        if(!response?.data?.success) {
            throw new Error('Could not edit subsection.')
        }

        result = response?.data?.data
        toast.success('Subsection edited successfully.')

    } catch (err) {
        console.log('Error in editing subsection:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

export async function  deleteSubSection(data, token) {
    let result = null 
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', DELETE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Delete subsection response:', response)

        if(!response?.data?.success) {
            throw new Error('Could not delete subsection.')
        }

        result = response?.data?.data
        toast.success('Subsection deleted successfully.')

    } catch (err) {
        console.log('Error in deleting subsection:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}