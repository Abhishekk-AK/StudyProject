import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { categoryEndpoints } from "../apis"

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading('Loading...')
    let result = []

    try {
        console.log(categoryId)
        const response = await apiConnector('GET',
                                            `${categoryEndpoints.CATEGORY_PAGE_API}?categoryId=${categoryId}`
                                            )

        console.log('Get Catalog data response:', response)

        if(!response?.data?.success)
            throw new Error('Could not fetch category page data.')

        result = response?.data

    } catch (err) {
        console.error(err)
        toast.error(err.message)
        result = err.response?.data
    }
    toast.dismiss(toastId)
    return result
}