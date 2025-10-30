import { FaArrowRight } from 'react-icons/fa'
import InstructorImage from '../../../assets/Images/aic-home.jpg'
import CTAButton from './Button'
import HighlightText from './HighlightText'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className="flex gap-20 items-center">

        <div className="w-[50%]">
          <img 
            src={InstructorImage}
            alt='InstructorImage'
            className='shadow-white'
          />
        </div>

        <div className='w-[50%] flex flex-col gap-10'>
          <div className='text-4xl font-semibold w-[50%]'>
            Become an
            <HighlightText text={'Instructor'}/>
          </div> 
          <p className='font-medium text-[16px] w-[80%] text-richblack-300 '>
            Instructors from around the world teach millions of students on StudyProject. We provide the tools and skills to teach what you love. 
          </p>  

          <div className='w-fit'>
            <CTAButton active={true} linkto={'/signup'}>
              <div className='flex gap-2 items-center'>
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection