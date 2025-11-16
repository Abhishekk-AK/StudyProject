import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { buyCourse } from "../services/operations/studentFeaturesApi"
import { useEffect, useState } from "react"
import { fetchCourseDetails } from "../services/operations/courseApi"
import GetAverageRating from "../utils/avgRating"
import Error from "./Error"
import RatingStars from "../components/common/RatingStars"
import { formatDate } from "../services/formatDate"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import ConfirmationModal from "../components/common/ConfirmationModal"
import SectionAccordion from "../components/core/Course/SectionAccordion"

const CourseDetails = () => {

  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const {loading} = useSelector((state) => state.profile)
  const {paymentLoading} = useSelector((state) => state.course)
  const {courseId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState(null)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isActive, setIsActive] = useState(Array(0))


  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId)
        setCourseData(result)

      } catch (err) {
        console.log('Could not fetch course details.')
      }
    }
    getCourseFullDetails()
  },[courseId])

  useEffect(() => {
    if (!courseData) return
    console.log("Updated courseData:", courseData)
  }, [courseData])

  useEffect(() => {
    const count = GetAverageRating(courseData?.courseDetails?.ratingAndReviews)
    setAvgReviewCount(count)
    console.log(count)
  },[courseData])

  useEffect(() => {
    let lectures = 0
    courseData?.courseDetails?.courseContent.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })

    setTotalNoOfLectures(lectures)
  },[courseData])

  if (!courseData) {
  return <div>Coursedata not received.</div>;
}

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ?isActive.concat(id)
        :isActive.filter((e) => e!=id)
    )
  }
  
  const handleBuyCourse = () => {

    if(token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    setConfirmationModal({
      text1:'You are not logged in.',
      text2:'Please log in to purchase the course.',
      btn1Text:'Login',
      btn2Text:'Cancel',
      btn1Handler:() => navigate('/login'),
      btn2Handler:() => setConfirmationModal(null)
    })
  }


  if(loading || !courseData) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if(!courseData) {
    return (
      <div>
        <Error/>
      </div>
    )
  }

  const {
    _id:course_id,
    courseName,
    courseDescription,
    thumbnail,
    whatYouWillLearn,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    courseContent,
    price
  } = courseData?.courseDetails

  return (
    <div className=" text-richblack-5">
      <div className="relative flex flex-col justify-start">
        <div>
          {courseName}
        </div>
        <p>
          {courseDescription}
        </p>
        <div>
          <span>
            {avgReviewCount}
          </span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
          <span>
            {`(${ratingAndReviews.length} reviews)`}
          </span>
          <span>
            {`(${studentsEnrolled.length} students enrolled)`}
          </span>
        </div>
        <div>
          <p>
            Created By {`${instructor.firstName}`}
          </p>
        </div>
        <div>
          <p>
            Created At {formatDate(createdAt)}
          </p>
          <p>
            {' '} English
          </p>
        </div>
      </div>

      <div>
        <CourseDetailsCard
          course={courseData?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        />
      </div>
        
      <div>
        <p>
          What You will learn
        </p>
        <div>
          {whatYouWillLearn}
        </div>
      </div>

      <div>
        <div>
          <p>
            Course Content
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <span>
              {courseContent.length} section(s)
            </span>
            <span>
              {totalNoOfLectures} lectures(s)
            </span>
            <span>
              {/* {courseData.data.totalDuration} Total length */}
            </span>
          </div>
          <div>
            <button
              onClick={() => setIsActive([])}
            >
              Collapse all Sections
            </button>
          </div>
        </div>

        {/* section subsection accordion */}
        <div>
          {
            courseContent?.map((section) => (
              <SectionAccordion
                section={section}
                key={section._id}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))
          }
        </div>

        <div>
          <p>
            Author
          </p>
          <div>
            <img
              src={
                instructor.image
                ? instructor.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName}${instructor.lastName}`
              }
              alt="Author Image"
              className="w-14 h-14 rounded-full object-cover"
            />
            <p>
              {`${instructor.firstName} ${instructor.lastName}`}
            </p>
          </div>
          <p>
            {instructor?.additionalDetails?.about}
          </p>
        </div>
      </div>

      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  )
}

export default CourseDetails