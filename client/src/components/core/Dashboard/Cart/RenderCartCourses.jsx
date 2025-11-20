import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/CartSlice'
import RatingStars from '../../../common/RatingStars'

const RenderCartCourses = () => {

  const dispatch = useDispatch()
  const {cart} = useSelector((state) => state.cart)

  return (
    <>
      {
        cart.map((course, index) => (
          <div>
            <div>
              <img src={course?.thumbnail}/>
              <div>
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                <div className='flex gap-2'>
                  <span>{course?.rating}</span>
                  <RatingStars
                    Review_Count={course?.rating}
                  />

                  <span>
                    {course?.ratingAndReviews?.length} Ratings
                  </span>

                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
              >
                <RiDeleteBin6Line/>
                <span>Remove</span>
              </button>
              <p>
                Rs.{course.price}
              </p>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default RenderCartCourses