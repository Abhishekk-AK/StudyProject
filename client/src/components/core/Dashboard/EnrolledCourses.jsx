import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
import { useNavigate } from "react-router-dom";
import ProgressBar from '@ramonak/react-progress-bar'

const EnrolledCourses = () => {

  const navigate = useNavigate()

  const {token} = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async() => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);

    } catch (err) {
      console.log('Unable to fetch Enrolled Courses.')
    }
  }

  useEffect(() => {
    getEnrolledCourses();
  },[])


  return (
    <div className="text-richblack-5">
      <h2 className="">
        Enrolled Courses
      </h2>
      {
        !enrolledCourses 
        ? (
          <div>
            Loading...
          </div>
        )
        : (
          enrolledCourses.length === 0 ? (
            <p>
              You have not enrolled in any courses yet.
            </p>
          )
          : (
            <div>
              <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
              </div>

              {
                enrolledCourses.map((course, index) => (
                  <div
                    key={index}
                    className={``}
                  >
                    <div
                      onClick={() => {
                        navigate(
                          `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection[0]}`
                        )
                      }}
                    >
                      <img src={course.thumbnail}/>
                      <div>
                        <p>{course.courseName}</p>
                        <p>{course.courseDescription}</p>
                      </div>
                    </div>
                    <div>
                      {course?.timeDuration}
                    </div>

                    <div>
                      <p>
                        Progress: {course.progressPercentage || 0}%
                      </p>
                      <ProgressBar
                        completed = {course.progressPercentage || 0}
                        height = '8px'
                        isLabelVisible = {false}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          )
        )
      }
    </div>
  )
}

export default EnrolledCourses