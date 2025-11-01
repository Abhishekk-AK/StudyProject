import { apiConnector } from "../apiConnector"
import { setLoading } from '../../slices/AuthSlice'
import toast from "react-hot-toast";
import { authEndpoints } from "../apis";

const {
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = authEndpoints


export function getPasswordResetToken(email, setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST', RESETPASSTOKEN_API, {email});

            console.log('Resest pass token:', response);

            if(!response.data.success) {
                throw new Error(response.data.messsage);
            }

            toast.success('Reset Email Sent');
            setEmailSent(true);

        } catch (err) {
            console.log('Reset password token error.', err)
            toast.error('Failed to send password reset email')
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST', RESETPASSWORD_API, {password, confirmPassword, token});

            console.log('Reset pass response:', response);

            if(!response.data.success) {
                throw new Error(response.data.messsage);
            }

            toast.success('Password reset successfully')

        } catch (err) {
            console.log('Reset password error:', err);
            toast.error('Unable to reset password')
        }
        dispatch(setLoading(false));
    }
}