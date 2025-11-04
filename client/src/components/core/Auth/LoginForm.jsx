import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authApi";

const LoginForm = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email:'', password:''
    })
    const [showPassword, setShowpassword] = useState(false);

    function changeHandler(e) {

        setFormData( (prevData) => (
            {
                ...prevData,
            [e.target.name]: e.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();

        dispatch(login(formData.email, formData.password, navigate))
    }

  return (
    <form onSubmit={submitHandler}>
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
      <label>
        <p>
            Password<sup>*</sup>
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
        <Link to='/forgot-password'>
            <p>
                Forgot Password
            </p>
        </Link>
      </label>
      <button>
        Sign in
      </button>
    </form>
  )
}

export default LoginForm