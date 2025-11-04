import { FcGoogle } from "react-icons/fc"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import frameImage from '../../../assets/TimeLineLogo/Logo2.svg'

const Template = ({title, text1, text2, image, formType}) => {
  return (
    <div className="flex text-richblack-5">

      <div className="flex flex-col">
        <h2>
            {title}
        </h2>
        <div>
          <p>
            {text1}
          </p>
          <p>
            {text2}
          </p>
        </div>

        {
            formType === 'signup'
            ? (<SignUpForm/>) 
            : (<LoginForm/> )
        }

        <div>
            <div></div>
            <p>OR</p>
            <div></div>
        </div>

        <button className="flex items-center">
            <FcGoogle/>
            <p>Sign in with google</p>
        </button>
      </div>

      <div>
        <div className="relative w-11/12 max-w-[450px]">
          <img
            src={frameImage}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <img
            src={image}
            alt="Students"
            width={558}
            height={490}
            loading="lazy"
            className="absolute -top-4 right-4"
          />
        </div>
      </div>

    </div>
  )
}

export default Template