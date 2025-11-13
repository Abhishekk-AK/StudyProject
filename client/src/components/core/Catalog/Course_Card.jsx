import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import GetAverageRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"

const Course_Card = ({course, Height}) => {

    const [averageReviewCount, setAverageReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAverageRating(course.ratingAndReviews)
        setAverageReviewCount(count)
    }, [course])


  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div>
            <div>
                <img 
                    src={course?.thumbnail}
                    alt={course.name}
                    className={`${Height} w-full rounded-xl object-cover`}
                />
            </div>
            <div>
                <p>
                    {course?.courseName}  
                </p>
                <p>
                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                </p>
            </div>
            <div>
                <span>
                    {averageReviewCount || 0}
                </span>
                <RatingStars Review_Count={averageReviewCount} />
                <span>
                    {course?.ratingAndReviews?.length} Ratings
                </span>
            </div>
            <p>
                {course?.price}
            </p>
        </div>
      </Link>
    </>
  )
}

export default Course_Card