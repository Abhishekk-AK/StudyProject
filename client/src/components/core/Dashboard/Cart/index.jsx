import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
import { useSelector } from "react-redux"

const Cart = () => {

    const {total, totalItems} = useSelector((state) => state.cart)

  return (
    <>
        <div className="text-richblack-5">
            <h2>
                Your Cart
            </h2>
            <p>
                {totalItems} Courses in Cart
            </p>
            {
                total > 0
                ? (
                    <>
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </>
                )
                : (
                    <>
                        <p>Your Cart is empty.</p>
                    </>
                )
            }
        </div>
    </>
  )
}

export default Cart