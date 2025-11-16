import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import copy from 'copy-to-clipboard'
import toast from "react-hot-toast"
import { addToCart } from "../../../slices/CartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

const CourseDetailsCard = (
    {course, setConfirmationModal, handleBuyCourse}
) => {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        thumbnail: thumbnailImage,
        price: currentPrice
    } = course


    const handleAddToCart = () => {
        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error(`You are an instructor, you can't buy a course.`)
            return
        }
        if(token) {
            dispatch(addToCart(course))
            return
        }
        setConfirmationModal({
            text1:'You are not logged in.',
            text2:'Please login to add to cart',
            btn1Text:'Login',
            btn2Text:'Cancel',
            btn1Handler:() => navigate('/login'),
            btn2Handler:() => setConfirmationModal(null)
        })
    }

    const handleShare = () => {
        copy(window.location.href)
        toast.success('Share Link copied to Clipboard')
    }

  return (
    <>
        <img
            src={thumbnailImage}
            alt="Thumbnail Image"
            className="max-h-[300px] max-w-[400px] rounded-xl"
        />
        <div>
            Rs. {currentPrice}
        </div>
        <div className="flex flex-col">
            <button
                onClick={
                    user && course?.studentsEnrolled.includes(user?._id)
                    ? () => navigate('/dashboard/enrolled-courses')
                    : handleBuyCourse
                }
                className="bg-yellow-50 text-richblack-900"
            >
                {
                    user && 
                    course?.studentsEnrolled.includes(user?._id) 
                    ? 'Go to Course'
                    : 'Buy Now'
                }
            </button>

            {
                (!user || !course?.studentsEnrolled.includes(user?._id)) && (
                    <button
                        onClick={handleAddToCart}
                        className="bg-yellow-50 text-richblack-900"
                    >
                        Add to Cart
                    </button>
                )
            }
        </div>
        <div>
            <p>
                30-Day Money-Back Guarantee
            </p>
            <p>
                This Course Includes:
            </p>
            <div>
                {
                    course?.instructions.map((item, index) => (
                        <p key={index} className="flex flex-col gap-2">
                            <span>
                                {item}
                            </span>
                        </p>
                    ))
                }
            </div>
            <div>
                <button
                    onClick={handleShare}
                    className="mx-auto text-yellow-50"
                >
                    Share
                </button>
            </div>
        </div>
    </>
  )
}

export default CourseDetailsCard