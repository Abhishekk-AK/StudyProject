import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from "../slices/ViewCourseSlice"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"

const ViewCourse = () => {
    
  const dispatch = useDispatch()
  const {courseId} = useParams()
  const {token} = useSelector((state) => state.auth)
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsCourse(courseId, token)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setCourseEntireData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))

      let lectures = 0
      courseData?.courseDetails?.courseContent.forEach(section => {
        lectures += section.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    }

    setCourseSpecificDetails()
  },[])


  return (
    <>
      <div className="flex">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        <div className="w-11/12 max-w-[1000px] py-10 mx-auto">
          <Outlet/>
        </div>
      </div>
      {
        reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
      }
    </>
  )
}

export default ViewCourse