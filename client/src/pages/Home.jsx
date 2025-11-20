import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimeLine from '../components/core/HomePage/TimeLine'
import LearningLanguage from '../components/core/HomePage/LearningLanguage'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'


const Home = () => {
  return (
    <>
      {/* Section1 */}
        <div className='relative mt-16 p-1 mx-auto max-w-7/11 flex flex-col w-11/12 items-center text-white justify-between'>
          
          <Link to={'/'}>
            <div className='group mx-auto rounded-full bg-richblack-800 transition-all duration-200 hover:scale-95 font-bold text-richblack-200 w-fit'>
              <div className='flex items-center gap-2 rounded-full px-10 py-2 transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become an instructor</p>
                <FaArrowRight/>
              </div>
            </div>
          </Link>

          <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your future with
            <HighlightText text={'Coding Skills'} />
          </div>

          <div className='w-[90%] text-center text-lg text-richblack-300 font-bold mt-4'>
            With our online coding courses, you can learn at your own pace, from anywhere in world, and get access to a wealth of resources, including hands-on projects, quizzes and personalized feedback from instructors.
          </div>

          <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={'/signup'}>
              Learn More
            </CTAButton>

            <CTAButton active={false} linkto={'/login'}>
              Book a demo
            </CTAButton>
          </div>

          <div className='shadow-blue-200 my-13 mx-7 w-full'>
            <video muted loop autoPlay className='w-full'>
              <source src={Banner} type='video/mp4'/>
            </video>
          </div>

          {/* Code Section1 */}
          <div>
            <CodeBlocks 
              position={"lg:flex-row"}
              heading={
                <div>
                  Unlock your
                  <HighlightText text={'coding potential'}/>
                  with our online courses.
                </div>
              }
              subheading={
                <div>
                  Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                </div>
              }
              ctabtn1={
                {
                  btnText: 'Try it yourself',
                  linkto: '/signup',
                  active: true
                }
              }
              ctabtn2={
                {
                  btnText: 'Learn more',
                  linkto: '/login',
                  active: false
                }
              }
              codeBlock={
                  `<!DOCTYPE html>
                  <head>
                    <link rel="stylesheet" href="styles.css">
                  </head>
                  <body>
                    <h1>Welcome to My Website</h1>
                    <p>This is where your content goes.</p>
                    <script src="scripts.js"></script>
                  </body>
                  </html>
                `
              }
              codeColor={'text-yellow-25'}
            />
            
          </div>    

          {/* Code Section2 */}
          <div>
            <CodeBlocks 
              position={"lg:flex-row-reverse"}
              heading={
                <div>
                  Unlock your
                  <HighlightText text={'coding potential'}/>
                  with our online courses.
                </div>
              }
              subheading={
                <div>
                  Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                </div>
              }
              ctabtn1={
                {
                  btnText: 'Try it yourself',
                  linkto: '/signup',
                  active: true
                }
              }
              ctabtn2={
                {
                  btnText: 'Learn more',
                  linkto: '/login',
                  active: false
                }
              }
              codeBlock={
                  `<!DOCTYPE html>
                  <head>
                    <link rel="stylesheet" href="styles.css">
                  </head>
                  <body>
                    <h1>Welcome to My Website</h1>
                    <p>This is where your content goes.</p>
                    <script src="scripts.js"></script>
                  </body>
                  </html>
                `
              }
              codeColor={'text-yellow-25'}
            />
          </div>  
          
          <ExploreMore />   
             
        </div>

      {/* Section2 */}
      <div className='bg-richblack-5 text-richblue-700'>
        <div className='homepage_bg h-[310px]'>
          
          <div className='w-11/12 max-w-7/11 max-w-maxContent flex items-center justify-center gap-5 mx-auto'>
              <div className='h-[310px]'></div>
              <div className='flex gap-7 text-white'>
                <CTAButton active={true} linkto={'/signup'}>
                  <div className='flex items-center gap-2'>
                    Explore Full Catalogue
                    <FaArrowRight/>
                  </div>
                </CTAButton>

                <CTAButton active={false} linkto={'/login'}>
                  <div className='flex items-center gap-2'>
                    Learn More
                    <FaArrowRight/>
                  </div>
                </CTAButton>
              </div>
          </div>

        </div>

        <div className='mx-auto w-11/12 max-w-7/11 max-w-maxContent flex flex-col gap-5 items-center justify-between'>

          <div className='flex flex-row gap-5 mt-[95px]'>
            <div className='text-4xl font-semibold w-[45%]'>
              Get the skills you need for a 
              <HighlightText text={'job that is in demand'} />
            </div>  
            <div className='flex flex-col gap-10 w-[40%] items-start'>
            <p className='text-[16px]'>
              The modern StudyProject dictates its'own terms.  Today, to be a competitive specialist requires more than professional skills.
            </p>
            <CTAButton active={true} linkto={'/signup'}>
              Learn more
            </CTAButton>
          </div>
          </div>  
          
          <TimeLine />

          <LearningLanguage />

        </div>

      </div>

      {/* Section3 */}
      <div className='w-11/12 mx-auto max-w-7/11 max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
        
        <InstructorSection />
        
        <h2 className='text-center text-4xl font-semibold mt-10'>
          Reviews from other Learners
        </h2>

        {/* Review slider */}
        <ReviewSlider/>

      </div>

      {/* Footer */}
    </>
  )
}

export default Home