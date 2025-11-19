import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import InstructorChart from "./InstructorChart"
import { Link } from 'react-router-dom'

const Instructor = () => {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState([])
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true)
            const instructorAPIData = await getInstructorData(token)
            const result = await fetchInstructorCourses(token)

            if(instructorAPIData.length)
                setInstructorData(instructorAPIData)

            if(result)
                setCourses(result)

            setLoading(false)
        }
        getCourseDataWithStats()
    },[])

    const totalAmount = instructorData.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
    const totalStudents = instructorData.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)

  return (
    <div className="text-richblack-5">
      <div>
        <h1>
            Hi {user?.firstName}
        </h1>
        <p>
            Let's start something New!
        </p>
      </div>
      
      {
        loading
        ? (
            <div className="spinner" />
        )
        : (
            courses.length > 0
            ? (
                <div>
                    <div>
                        <div>
                            <InstructorChart courses={instructorData} />
                            <div>
                                <p>
                                    Statistics
                                </p>
                                <div>
                                    <p>
                                        Total Students
                                    </p>
                                    <p>
                                        {totalStudents}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Total Income
                                    </p>
                                    <p>
                                        {totalAmount}
                                    </p>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div>
                        <div>
                            <p>
                                Your Courses
                            </p>
                            <Link to="/dashboard/my-courses">
                                <p>
                                    View All
                                </p>
                            </Link>
                        </div>
                        <div>
                            {
                                courses.slice(0,3).map((course) => (
                                    <div key={course._id}>
                                        <img
                                            src={course.thumbnail}
                                        />
                                        <div>
                                            <p>
                                                {course.courseName}
                                            </p>
                                            <div>
                                                <p>
                                                    {course.studentsEnrolled.length} Students
                                                </p>
                                                <p> | </p>
                                                <p>
                                                    Rs. {course.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )
            : (
                <div>
                    <p>
                        You have not created any courses yet
                    </p>
                    <Link to={'/dashboard/addCourse'} />
                </div>
            )
        )
      }
      
    </div>
  )
}

export default Instructor