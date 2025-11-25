import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import RequirementsField from "./RequirementsField"
import { setCourse, setStep } from "../../../../../slices/CourseSlice"
import IconBtn from "../../../../common/IconBtn"
import { MdCurrencyRupee, MdNavigateNext } from "react-icons/md"
import ChipInput from "./ChipInput"
import Upload from "../Upload"
import toast from "react-hot-toast"
import { COURSE_STATUS } from '../../../../../utils/constants'
import { 
    addCourseDetails, 
    editCourseDetails, 
    fetchCourseCategories 
} from "../../../../../services/operations/courseApi"


const CourseInfoForm = () => {

    const {
        register, handleSubmit, getValues, setValue, formState:{errors}
    } = useForm()

    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(null)
    const [courseCategories, setCourseCategories] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories()

            if(categories.length > 0) {
                setCourseCategories(categories)
            }
            setLoading(false)
        }

        //if form is in edit mode
        if(editCourse) {
            setValue('courseTitle', course.courseName)
            setValue('courseDesc', course.courseDescription)
            setValue('coursePrice', course.price)
            setValue('courseTags', course.tag)
            setValue('courseBenefits', course.whatYouWillLearn)
            setValue('courseCategory', course.category)
            setValue('courseRequirements', course.instructions)
            setValue('courseImage', course.thumbnail)
        }

        getCategories()
        
    },[])

    //check whether form is updaed or not
    const isFormUpdated = () => {
        const currentValues = getValues()
        if(
            currentValues.courseTitle !== course.courseName 
            || currentValues.courseDesc !== course.courseDescription
            || currentValues.coursePrice !== course.price
            || currentValues.courseTags.toString() !== course.tag.toString()
            || currentValues.courseBenefits !== course.whatYouWillLearn
            || currentValues.courseCategory._id !== course.category._id
            || currentValues.courseRequirements.toString() !== course.instructions.toString()
            || currentValues.courseImage !== course.thumbnail
        ) {
            return true
        }
        return false
    }

    //handle next button
    const onSubmit = async (data) => {
        
        if(editCourse) {

            if(isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()

                formData.append('courseId', course._id)
                if(currentValues.courseTitle !== course.courseName)
                    formData.append('courseName', data.courseTitle)

                if(currentValues.courseDesc !== course.courseDescription)
                    formData.append('courseDescription', data.courseDesc)

                if(currentValues.coursePrice !== course.price)
                    formData.append('price', data.coursePrice)

                if(currentValues.courseTags.toString() !== course.tag.toString())
                    formData.append('tag', JSON.stringify(data.courseTags))

                if(currentValues.courseBenefits !== course.whatYouWillLearn)
                    formData.append('whatYouWillLearn', data.courseBenefits)

                if(currentValues.courseCategory._id !== course.category._id)
                    formData.append('category', data.courseCategory)

                if(currentValues.courseRequirements.toString() !== course.instructions.toString())
                    formData.append('instructions', JSON.stringify(data.courseRequirements))

                if(currentValues.courseImage !== course.thumbnail)
                    formData.append('thumbnailImage', data.courseImage)

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)

                if(result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            } else {
                toast.error('No changes made to the form')
            }
            return
        }

        const formData = new FormData()

        formData.append('courseName', data.courseTitle)
        formData.append('courseDescription', data.courseDesc)
        formData.append('price', data.coursePrice)
        formData.append('tag', JSON.stringify(data.courseTags))
        formData.append('whatYouWillLearn', data.courseBenefits)
        formData.append('category', data.courseCategory)
        formData.append('status', COURSE_STATUS.DRAFT)
        formData.append('instructions', JSON.stringify(data.courseRequirements))
        formData.append('thumbnailImage', data.courseImage)
        
        setLoading(true)
        const result = await addCourseDetails(formData, token)
        
        if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
        }
        setLoading(false)
    }

  return (
    <div className="text-white">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <div>
            <label htmlFor="courseTitle">
                Course Title<sup>*</sup>
            </label>
            <input
                id="courseTitle"
                placeholder="Enter Course Title"
                {...register("courseTitle", {required:true})}
                className="w-full"
            />
            {
                errors.courseTitle && (
                    <span>
                        Course title is required
                    </span>
                )
            }
        </div>

        <div>
            <label htmlFor="courseDesc">
                Course Description<sup>*</sup>
            </label>
            <textarea
                id="courseDesc"
                placeholder="Enter Course Description"
                {...register("courseDesc", {required:true})}
                className="w-full"
            />
            {
                errors.courseDesc && (
                    <span>
                        Course description is required
                    </span>
                )
            }
        </div>

        <div>
            <label htmlFor="coursePrice">
                Course Price<sup>*</sup>
            </label>
            <div>
                <input
                    id="coursePrice"
                    placeholder="Enter Course Price"
                    {...register("coursePrice", {required:true})}
                    className="w-full"
                />
                <MdCurrencyRupee/>
            </div>
            {
                errors.coursePrice && (
                    <span>
                        Course price is required
                    </span>
                )
            }
        </div>

        <div>
            <label htmlFor="courseCategory">
                Course Category<sup>*</sup>
            </label>
            <select
                id="courseCategory"
                defaultValue=""
                {...register("courseCategory", {required:true})}
                className="w-full"
            >
                <option>
                    Choose a Category
                </option>
                {
                    !loading && 
                        courseCategories.map((category, index) => (
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                }
            </select>
            {
                errors.courseCategory && (
                    <span>
                        Course Category is required
                    </span>
                )
            }
        </div>

        <div>
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press ENTER"
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />
        </div>

        <div>
            <Upload
                label="CourseThumbnail"
                name="courseImage"
                placeholder="Drag and drop an image"
                register={register}
                setValue={setValue}
                errors={errors} 
                editData={editCourse ? course?.thumbnail : null}
            />
        </div>

        <div>
            <label htmlFor="courseBenefits">
                Course Benefits<sup>*</sup>
            </label>
            <textarea
                id="courseBenefits"
                placeholder="Enter Benefits of the Course"
                {...register("courseBenefits", {required:true})}
                className="w-full"
            />
            {
                errors.courseBenefits && (
                    <span>
                        Benefits of the course are required
                    </span>
                )
            }
        </div>

        <div>
            <RequirementsField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />
        </div>

        <div>
            {
                editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className={`w-full`}
                    >
                        Continue Without Saving
                    </button>
                )
            }
            <IconBtn
                disabled={loading}
                text={!editCourse ? "Next" : "Save Changes"}
            >
                <MdNavigateNext/>
            </IconBtn>
        </div>

      </form>
    </div>
  )
}

export default CourseInfoForm