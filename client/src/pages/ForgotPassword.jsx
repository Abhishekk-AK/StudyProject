import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from "../services/operations/authApi";

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const {loading} = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

  return (
    <div className="text-white flex justify-center">
      {
        loading 
        ? (
            <div>
                Loading...
            </div>
        )
        : (
            <div>
                <h2>
                    {
                        !emailSent ? 'Reset your Password' : 'Check your email'
                    }
                </h2>
                <p>
                    {
                        !emailSent
                        ? `Have no fear. We'll email you instructions to reset your password. If you don't have email access, we can try account recovery.`
                        : `We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleSubmit}>
                    {
                        !emailSent && (
                            <label>
                                <p>Email Address*</p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email Address"
                                />
                            </label>
                        )
                    }
                    <button>
                        {
                            !emailSent ? 'Reset Password' : 'Resend Email'
                        }
                    </button>
                </form>

                <div>
                    <Link to='/login'>
                        Back to login
                    </Link>
                </div>
            </div>
        ) 
      }
    </div>
  )
}

export default ForgotPassword