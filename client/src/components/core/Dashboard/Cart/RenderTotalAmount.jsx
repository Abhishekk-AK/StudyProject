import { useDispatch, useSelector } from "react-redux"
import IconBtn from '../../../common/IconBtn'
import { buyCourse } from "../../../../services/operations/studentFeaturesApi"
import { useNavigate } from "react-router-dom"

const RenderTotalAmount = () => {

  const {total, cart} = useSelector((state) => state.cart)
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <>
      <p>
        Total:
      </p>
      <p>Rs{total}</p>

      <IconBtn
        text='Buy Now'
        onclick={handleBuyCourse}
        customClasses={'w-full justify-center'}
      />
    </>
  )
}

export default RenderTotalAmount