import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../../common/IconBtn"
import { resetCourseState, setStep } from "../../../../../slices/CourseSlice"
import { editCourseDetails } from "../../../../../services/operations/courseApi"
import { useNavigate } from "react-router-dom"
import { COURSE_STATUS } from "../../../../../utils/constants"

const PublishCourse = () => {

    const {register, handleSubmit, setValue, getValues} = useForm()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue('public', true)
        }
    },[])

    const goBack = () => {
        dispatch(setStep(2))
    }

    const goToCourses = () => {
        dispatch(resetCourseState)
        navigate('/dashboard/my-courses')
    }

    const handleCoursePublish = async () => {
        if(
            (course?.status === COURSE_STATUS.PUBLISHED && getValues('public' === true))
            || (course?.status === COURSE_STATUS.DRAFT && getValues('public' === false))
        ) {
            //form hasn't been updated
            goToCourses()
            return
        }

        //form updated
        const formData = new FormData()
        formData.append('courseId', course._id)

        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT

        formData.append('status', courseStatus)

        setLoading(true)
        const result = await editCourseDetails(formData, token)
        if(result) {
            goToCourses()
        }
        setLoading(false)
    } 
    
    const onSubmit = () => {
        handleCoursePublish()
    }

  return (
    <>
      <div className="text-richblack-5">
        <p>
            Publish Course
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="checkbox"
                    id="public"
                    {...register('public')}
                    className="rounded h-4 w-4"
                />
                <label>
                    Make this course as public.
                </label>
            </div>
            <div>
                <button
                    disabled={loading}
                    type="button"
                    onClick={goBack}
                    className="flex items-center"
                >
                    Back
                </button>
                <IconBtn 
                    disabled={loading}
                    text="Save Changes"
                />
            </div>
        </form>
      </div>
    </>
  )
}

export default PublishCourse