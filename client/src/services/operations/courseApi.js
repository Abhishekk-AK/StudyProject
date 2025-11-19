import toast from "react-hot-toast";
import { categoryEndpoints, courseEndpoints, ratingEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    CATEGORIES_API
} = categoryEndpoints

const {
    ADDCOURSE_API,
    EDITCOURSE_API,
    COURSE_DETAILS_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    LECTURE_COMPLETION_API,
    GET_AUTHENTICATED_COURSE_DETAILS_API
} = courseEndpoints

const {
    CREATE_RATING_REVIEWS_API
} = ratingEndpoints

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

export async function fetchCourseDetails(courseId) {
    let result = null
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('GET', `${COURSE_DETAILS_API}?courseId=${courseId}`)
        console.log(response)

        if(!response) {
            throw new Error(response.data.message)
        }

        result = response?.data?.data
        toast.success('Course deatils fetched successfully.')

    } catch (err) {
        console.log('Fetch course API error:', err)
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


export async function createSubSection(data, token) {
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

        result = response?.data?.updatedSection
        toast.success('New Subsection created successfully.')
console.log(result)
    } catch (err) {
        console.log('Error in creating New subsection:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

export async function updateSubSection(data, token) {
    let result = null 
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('PUT', UPDATE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Edit subsection response:', response)

        if(!response?.data?.success) {
            throw new Error('Could not edit subsection.')
        }

        result = response?.data?.updatedSection
        toast.success('Subsection edited successfully.')

    } catch (err) {
        console.log('Error in editing subsection:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

export async function deleteSubSection(data, token) {
    let result = null 
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('DELETE', DELETE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Delete subsection response:', response)

        if(!response?.data?.success) {
            throw new Error('Could not delete subsection.')
        }

        result = response?.data?.updatedSection
        toast.success('Subsection deleted successfully.')

    } catch (err) {
        console.log('Error in deleting subsection:', err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

//get authenticated course details
export async function getFullDetailsCourse(courseId, token) {
    const toastId = toast.loading('Loading...')
    let result = null

    try {
        const response = await apiConnector('POST', GET_AUTHENTICATED_COURSE_DETAILS_API,
            {courseId},
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Authenticated course response:', response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response?.data?.data

    } catch (err) {
        console.log('Authenticated Course API error:', err)
        result = err.response.data
        toast.error('Authenticated Course API error')
    }
    toast.dismiss(toastId)
    return result
}

//mark lecture as complete
export async function markLectureAsComplete(data, token) {
    let result = null
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', LECTURE_COMPLETION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Mark lecture complete response:', response)

        if(!response.data.success) {
            throw new Error(response.data.error)
        }

        result = true
        toast.success('Lecture completed')

    } catch (err) {
        console.log('Mark lecture complete API error:', err)
        toast.error(`Couldn't marked as complete`)
        result = false
    }
    toast.dismiss(toastId)
    return result
}

//create rating and reviews
export async function createRatingReviews(data, token) {
    let result = false
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', CREATE_RATING_REVIEWS_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log('Create rating review response:', response)

        if(!response.data.success)
            throw new Error(response.data.error)

        result = true
        toast.success('Course reviewed successfully.')

    } catch (err) {
        console.error('Create rating review API error:', err)
        toast.error(err.response.data.message ? err.response.data.message : 'Error in rating creation.')
    }
    toast.dismiss(toastId)
    return result
}