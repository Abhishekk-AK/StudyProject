import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import OtpInput from 'react-otp-input'
import { Link } from 'react-router-dom'
import { sendSignupOtp, signUp } from "../services/operations/authApi"


const VerifyEmail = () => {

  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, signUpData} = useSelector( (state) => state.auth );

  useEffect( () => {
    if(!signUpData) {
      navigate('/signup');
    }
  },[])

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = signUpData;

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));

  }

  return (
    <div className="text-white">
      {
        loading
        ? (
            <div>Loading...</div>
        )
        : (
            <div>
                <h1>Verify Email</h1>
                <p>
                    A verification code has been sent to you. Enter the code below
                </p>
                <form onSubmit={handleOnSubmit}>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeperator={<span>-</span>}
                    renderInput={ 
                      (props) => <input {...props} 
                      placeholder="_"
                      className="bg-richblack-600 text-richblack-5"
                      /> }
                  />
                  <button type="submit">
                    Verify Email
                  </button>
                </form>

                <div>
                  <div>
                    <Link to='/login'>
                      <p>Back to login</p>
                    </Link>
                  </div>
                  <button 
                    onClick={ () => dispatch(sendSignupOtp(signUpData.email)) }
                  >
                    Resend email
                  </button>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail