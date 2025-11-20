import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "../../services/apiConnector";
import { ratingEndpoints } from "../../services/apis";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import RatingStars from "./RatingStars";

const ReviewSlider = () => {

  const [reviews, setReviews] = useState([])
  const truncateWords = 35

  useEffect(() => {
    const fetchAllReviews = async () => {
      const {data} = await apiConnector('GET', ratingEndpoints.ALL_RATING_REVIEWS_API)
      console.log('All rating review API response:', data)

      if(data?.success) {
        setReviews(data?.data)
      }

      console.log('reviews', reviews)
    }
    fetchAllReviews()
  },[])

  return (
    <div className="text-richblack-5">
      <div className="h-[190px] max-w-max-content">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay:2500,
            //disableOnInteraction:false
          }}
          freeMode={true}
          pagination={{
            clickable: true
          }}
          modules={[Autoplay, FreeMode, Pagination]}
          breakpoints={{
            1024:{slidesPerView:3}
          }}
          className="mySwiper w-full"
        >
          {
            reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <img
                  src={
                    review?.user?.image 
                    ? review?.user?.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`
                  }
                  alt={'Profile Pic'}
                  className="h-3 w-3 object-cover rounded-full"
                />
                <p>
                  {review?.user?.firstName} {review?.user?.lastName}
                </p>
                <p>
                  {review?.user?.courseName}
                </p>
                <p>
                  {review?.review}
                </p>
                <div>
                  {review?.rating.toFixed(1)}
                  <RatingStars Review_Count={review?.rating} />
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider