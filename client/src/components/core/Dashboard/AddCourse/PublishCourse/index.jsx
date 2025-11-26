import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../../common/IconBtn"
import { resetCourseState, setPublished, setStep } from "../../../../../slices/CourseSlice"
import { editCourseDetails } from "../../../../../services/operations/courseApi"
import { useNavigate } from "react-router-dom"
import { COURSE_STATUS } from "../../../../../utils/constants"
import toast from "react-hot-toast"

const PublishCourse = () => {

    const {register, handleSubmit, setValue, getValues} = useForm()
    const {course} = useSelector((state) => state.course)
    const {step} = useSelector((state) => state.course)
    const {published} = useSelector((state) => state.course)
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
    
    const addNewCourse = () => {
        dispatch(resetCourseState())
        navigate('/dashboard/add-courses')
    }

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate('/dashboard/my-courses')
    }

    const handleCoursePublish = async () => {
        if(
            (course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true)
            || (course?.status === COURSE_STATUS.DRAFT && getValues('public') === false)
        ) {
            //form hasn't been updated
            toast.error('Course Drafted')
            //return
        }

        //form updated
        const formData = new FormData()
        formData.append('courseId', course._id)

        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT

        formData.append('status', courseStatus)

        setLoading(true)
        const result = await editCourseDetails(formData, token)
        if(result) {

            dispatch(setPublished(result.status === COURSE_STATUS.PUBLISHED))

            dispatch(setStep(4)) 
        }
        setLoading(false)
    } 
    
    const onSubmit = () => {
        handleCoursePublish()
    }

  return (
    <>
      {
        step === 3 
        ? (
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
        )
        :(
            published
            ? (
                <>
                    <div className="flex items-center justify-center">
                        <p className="text-2xl bg-yellow-50 text-richblack-900 font-bold px-4 py-1 rounded-md">
                            Course Published
                        </p>
                    </div>
                    <div className="text-white">
                        <div className="flex justify-between">
                            <IconBtn
                                text='Add New Course'
                                onclick={addNewCourse}
                                className='bg-yellow-50'
                            />
                            <IconBtn
                                text='Go to Courses'
                                onclick={goToCourses}
                            />
                        </div>
                    </div>
                </>
            )
            : (
                <>
                    <div className="flex items-center justify-center">
                        <p className="text-2xl bg-yellow-50 text-richblack-900 font-bold px-4 py-1 rounded-md">
                            Course Drafted
                        </p>
                    </div>
                    <div className="text-white">
                        <div className="flex justify-between">
                            <IconBtn
                                text='Add New Course'
                                onclick={addNewCourse}
                                className='bg-yellow-50'
                            />
                            <IconBtn
                                text='Go to Courses'
                                onclick={goToCourses}
                            />
                        </div>
                    </div>
                </>
            )
        )
      }
    </>
  )
}

export default PublishCourse