import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Course_Card from './Course_Card';

const CourseSlider = ({courses}) => {
  return (
    <>
      {
        courses?.length 
        ? (
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay:2500,
                    disableOnInteraction:false
                }}
                freeMode={true}
                pagination={{
                    clickable: true
                }}
                Navigation={true}
                modules={[Autoplay, FreeMode, Pagination, Navigation]}
                breakpoints={{
                    1024:{slidesPerView:3}
                }}
                className="mySwiper"
            >
                {
                    courses?.map((course, index) => (
                        <SwiperSlide key={index}>
                            <Course_Card course={course} Height={'h-[250px]'} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        ) 
        : (
            <p>
                No Courses Found
            </p>
        )
      }
    </>
  )
}

export default CourseSlider