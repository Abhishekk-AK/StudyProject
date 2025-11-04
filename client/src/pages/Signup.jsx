import Template from "../components/core/Auth/Template"
import SignUpImage from '../assets/TimeLineLogo/Logo3.svg'

const Signup = () => {
  return (
    <>
      <Template
        title='Join the millions learning to code with StudtProject for free.'
        text1='Build skills for today, tomorrow and future.'
        text2='Education to future proof your career.'
        image={SignUpImage}
        formType='signup'
      />
    </>
  )
}

export default Signup