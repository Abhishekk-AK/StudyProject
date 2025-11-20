import HighlightText from '../components/core/HomePage/HighlightText'
import AboutImage1 from '../assets/Images/aic-home.jpg'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/aic-home.jpg'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactForm from '../components/core/AboutPage/ContactForm'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
  return (
    <div className='mt-[100px] text-white w-11/12 max-w-max-content mx-auto'>
      {/*SEction1*/}
      <section>
        <div>
            <header>
                Driving inoovation in Education for a 
                <HighlightText text={'Brighter future.'}/>
            </header>
            <p>
                Studyproject is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant community.
            </p>
            <div className='flex gap-x-3'>
                <img src={AboutImage1} width={300}/>
                <img src={AboutImage1} width={300}/>
                <img src={AboutImage1} width={300}/>
            </div>
        </div>
      </section>

      {/* Section2 */}
      <section>
        <div>
           <Quote/>
        </div>
      </section>

      {/* Section3 */}
      <section>
        <div className='flex flex-col'>
            {/* Founding Story */}
            <div className='flex'>
                <div>
                    <h2>Our Founding Story</h2>
                    <p>
                        Our learning platform was born out of a shared vision and transformative education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>

                <div>
                    <img src={FoundingStory}/>
                </div>
            </div>

            {/* Vision and mission */}
            <div className='flex'>
                <div>
                    <h2>Our Vision</h2>
                    <p>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>
                <div>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Section4 */}
      <section>
        <StatsComponent/>
      </section>

      {/* Section5 */}
      <section>
        <LearningGrid/>
      </section>

      {/* Section6 */}
      <section>
        <ContactForm/>
      </section>
      <ReviewSlider/>
    </div>
  )
}

export default About