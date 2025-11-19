import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VscAdd } from "react-icons/vsc"
import { fetchInstructorCourses } from "../../../services/operations/courseApi"
import IconBtn from "../../common/IconBtn"
import InstCoursesTable from "./InstructorCourses/InstCoursesTable"

const MyCourses = () => {

  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if(result)
        setCourses(result?.courses)
    }
    fetchCourses()
  }, [])

  return (
    <div className="text-richblack-5">
      <div>
        <h1>
          My Courses
        </h1>
        <IconBtn
          text={'Add Course'}
          onclick={() => navigate('/dashboard/add-courses')}
        >
          <VscAdd/>
        </IconBtn>
      </div>
      {
        courses && <InstCoursesTable courses={courses} setCourses={setCourses} />
      }
    </div>
  )
}

export default MyCourses