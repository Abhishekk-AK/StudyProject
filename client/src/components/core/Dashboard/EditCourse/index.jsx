import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getFullDetailsCourse } from "../../../../services/operations/courseApi";
import { setCourse, setEditCourse } from "../../../../slices/CourseSlice";
import RenderSteps from "../AddCourse/RenderSteps";

const EditCourse = () => {

    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {token} = useSelector((state) => state.auth)
    const {course} = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;( async () => {
            setLoading(true)
            const result = await getFullDetailsCourse(courseId, token)
            if(result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        })()
    },[])

    if(loading) {
        return (
            <div>
                <div className="spinner"/>
            </div>
        )
    }

  return (
    <div className="text-richblack-5">
      <h1>
        Edit Course
      </h1>
      <div>
        {
            course
            ? (
                <RenderSteps/>
            )
            : (
                <p>
                    Course not Found
                </p>
            )
        }
      </div>
    </div>
  )
}

export default EditCourse