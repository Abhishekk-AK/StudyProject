import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiConnector } from "../services/apiConnector"
import { categoryEndpoints } from "../services/apis"
import { getCatalogPageData } from "../services/operations/categoryApi"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import Course_Card from "../components/core/Catalog/Course_Card"

const Catalog = () => {

    const {catalogName} = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState('')
    
    useEffect(() => {
        const getCategories = async () => {
            const response = await apiConnector('GET', categoryEndpoints.CATEGORIES_API)

            //get selected category._id
            const category_id = response?.data?.allCategorys
                                .filter((cat) => cat.name.split(' ').join('-').toLowerCase() === catalogName)
                                [0]._id

            setCategoryId(category_id)
        }

        getCategories()
    },[catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const response = await getCatalogPageData(categoryId)
                console.log(response)
                setCatalogPageData(response)

            } catch (err) {
                console.log(err)
            }
        }

        if(categoryId) {
            getCategoryDetails()
        }
    },[categoryId])


  return (
    <div className="text-richblack-5 max-w-max-content mx-auto">
      <div>
        <p>
            {`Home / Catalog /`}
            <span>
                {catalogPageData?.selectedCategory?.name}
            </span>
        </p>
        <p>
            {catalogPageData?.selectedCategory?.name}
        </p>
        <p>
            {catalogPageData?.selectedCategory?.description}
        </p>
      </div>

      <div>
        {/* section1 */}
        <div>
            <div>
                Courses to get you started
            </div>
            <div className="flex gap-x-3">
                <p>
                    Most Popular
                </p>
                <p>
                    New
                </p>
            </div>
            {/* Course Slider */}
            <div>
                <CourseSlider
                    courses={catalogPageData?.selectedCategory?.courses} 
                />
            </div>
        </div>

        {/* section2 */}
        <div>
            <div>
                <div>
                    Top Courses in {catalogPageData?.selectedCategory?.name}
                </div>
                <div>
                    <CourseSlider courses={catalogPageData?.mostSellingCoursesInCategory} />
                </div>
            </div>
        </div>

        {/* section3 */}
        <div>
            <div>
                Frequently Bought
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        catalogPageData?.mostSellingCoursesInCategory?.slice(0,6)
                        .map((course, index) => (
                            <Course_Card course={course} key={index} Height={'h-[300px]'}/>
                        ))
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog