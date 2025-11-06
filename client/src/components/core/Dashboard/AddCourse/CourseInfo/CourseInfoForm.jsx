import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import RequirementsField from "./RequirementsField"
import { setStep } from "../../../../../slices/CourseSlice"
import IconBtn from "../../../../common/IconBtn"
import { MdCurrencyRupee, MdNavigateNext } from "react-icons/md"
import ChipInput from "./ChipInput"
import Upload from "../Upload"

const CourseInfoForm = () => {

    const {
        register, handleSubmit, getValues, setValue, formState:{errors}
    } = useForm()

    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(null)
    const [courseCategories, setCourseCategories] = useState([])
    const dispatch = useDispatch()

  return (
    <>
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
                label="Course Thumbnail"
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
    </>
  )
}

export default CourseInfoForm