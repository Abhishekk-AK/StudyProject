import toast from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/ProfileSlice";

const {
    EDIT_PROFILE_API
} = settingsEndpoints

export function updateProfile(data, token) {

    return async (dispatch) => {
        const toastId = toast.loading('Loading...')
        try {
        const response = await apiConnector('PUT', EDIT_PROFILE_API, data,
            {
                Authorization:`Bearer ${token}`
            }
        )
        console.log('Update Profile response:', response)

        if(!response.data.success) 
            throw new Error(response.data.message)

        const userImage = response.data.data.image

        dispatch(setUser({...response.data.data, image:userImage}))

        toast.success('Profile updated.')

        } catch (err) {
            console.error('Update Profile API error:', err)
            toast.error(`Couldn't update profile.`)
        }
        toast.dismiss(toastId)
    }
}