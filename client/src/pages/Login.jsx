import Template from "../components/core/Auth/Template"
import LoginImage from '../assets/TimeLineLogo/Logo3.svg'

const Login = () => {
  return (
    <>
      <Template
        title='Welcome Back'
        text1='Build skills for today, tomorrow and beyond.'
        text2='Education to future proof your career.'
        image={LoginImage}
        formType='login'
      />
    </>
  )
}

export default Login