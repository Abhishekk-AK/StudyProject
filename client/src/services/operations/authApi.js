import { apiConnector } from "../apiConnector"
import { setLoading, setToken } from '../../slices/AuthSlice'
import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { setUser } from "../../slices/ProfileSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = authEndpoints


export function sendSignupOtp(email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('POST', SENDOTP_API, {email, checkUserPresent: true})

            console.log('otp response:', response);

            if(!response.data.success) {
                throw new Error(response.data.messsage);
            }
            
            toast.success('OTP Sent, check your email.');
            navigate('/verify-email');

        } catch (err) {
            console.log('Error in signup OTP sending.', err)
            toast.error('Signup otp sending error.')
        }
        dispatch(setLoading(false))
    }
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading..')
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('POST', SIGNUP_API, {accountType, firstName, lastName, email, password, confirmPassword, otp});

            console.log('Signup Response:', response)

            if(!response.data.success) {
                throw new Error(response.data.messsage)
            }

            toast.success('User account created successfully.')
            navigate('/login')
            
        } catch (err) {
            console.log('Error in Signup:', err)
            toast.error('Could not signup, try again')
            navigate('/signup')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading..')
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('POST', LOGIN_API, {email, password});

            console.log('Login Response:', response)

            if(!response.data.success) {
                throw new Error(response.data.messsage)
            }

            toast.success('User logged in successfully.')
            dispatch(setToken(response.data.token))

            const userImage = response.data?.user?.image 
                                ? response.data.user.image
                                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image:userImage }))
            localStorage.setItem('token', JSON.stringify(response.data.token))
            navigate('/dashboard/my-profile')

        } catch (err) {
            console.log('Error in login API:', err)
            toast.error('Could not login, try again')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged Out');
        navigate('/');
    }
}

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