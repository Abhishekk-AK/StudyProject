import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { sendSignupOtp } from "../../../services/operations/authApi";
import { setSignUpData } from "../../../slices/AuthSlice";

const SignUpForm = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formData, setformData] = useState({
        firstName:'', lastName:'', email:'', password:'', confirmPassword:''
    })
    const [showPassword, setShowpassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState('Student');


    function changeHandler(e) {

        setformData( (prevData) => (
            {
                ...prevData,
            [e.target.name]: e.target.value,
            accountType
            }
        ))
        
    }
console.log(accountType)
    setSignUpData( formData
        )


    console.log(setSignUpData(formData))
    console.log(formData)

    function submitHandler(event) {
        event.preventDefault();
        dispatch(setSignUpData(formData))
        dispatch(sendSignupOtp(event.target.email.value, navigate));
    }


  return (
    <form onSubmit={submitHandler}>
      <div>
        <button 
            className={`${accountType === 'Student' ? 'bg-richblack-900 text-richblack-5' : 'bg-transparent text-richblack-200'} py2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType('Student')}
        >
            Student
        </button>
        <button 
            className={`${accountType === 'Instructor' ? 'bg-richblack-900 text-richblack-5' : 'bg-transparent text-richblack-200'} py2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType('Instructor')}>
            Instructor
        </button>
      </div>
      <div>
        <label>
            <p>
                First Name<sup>*</sup>
            </p>
            <input
                required
                name="firstName"
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={changeHandler}
            />
        </label>
        <label>
            <p>
                Last Name
            </p>
            <input
                name="lastName"
                type="lastName"
                id="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={changeHandler}
            />
        </label> 
      </div> 
      <label>
        <p>
            Email Address<sup>*</sup>
        </p>
        <input
            required
            name="email"
            type="email"
            id="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={changeHandler}
        />
      </label>
      <div>
        <label>
            <p>
                Create Password<sup>*</sup>
            </p>
            <input
                required
                name="password"
                type={showPassword ? ('text') : ('password')}
                id="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={changeHandler}
            />
            <span onClick={() => setShowpassword((prev) => !prev)}>
                {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
            </span>
        </label>
        <label>
            <p>
                Confirm Password<sup>*</sup>
            </p>
            <input
                required
                name="confirmPassword"
                type={showConfirmPassword ? ('text') : ('password')}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={changeHandler}
            />
            <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
            </span>
        </label>
      </div>
      <button type="submit">
        Create Account
      </button>
    </form>
  )
}

export default SignUpForm