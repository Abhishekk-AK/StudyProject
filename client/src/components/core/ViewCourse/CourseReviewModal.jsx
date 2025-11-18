import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import ReactStars from "react-rating-stars-component"
import IconBtn from "../../common/IconBtn"


const CourseReviewModal = ({setReviewModal}) => {

  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const {courseEntireData} = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm()


  useEffect(() => {
    setValue('courseExperience', '')
    setValue('courseRating', 0)
  },[])

  const ratingChanged = () => {
    setValue('courseRating', newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        course: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <>
      <div>
        <div>
          <p>
            Add Review
          </p>
          <button
            onClick={setReviewModal(false)}
          >
            Close
          </button>
        </div>

        <div>
          <img
            src={user?.image}
            alt={`${user?.firstName}' 'image`}
            className="aspect-square w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <p>
              Posting Publicly
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />

            <div>
              <label htmlFor="courseExperience">
                Add Your Experience
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add your Experience here"
                {...register('courseExperience', {required:true})}
                className="w-full min-h-[130px]"
              />
              {
                errors.courseExperience && (
                  <span>
                    Please add your Experience
                  </span>
                )
              }
            </div>

            <div>
              <button
                onClick={() => setReviewModal(false)}
              >
                Cancel
              </button>
              <IconBtn
                text={'Save'}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CourseReviewModal