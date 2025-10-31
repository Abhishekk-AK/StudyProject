import { useState } from "react"
import { homepageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsname = [
    'Free',
    'New to Coding',
    'Most Popular',
    'Skill Paths',
    'Career Paths'
]

const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(tabsname[0]);
  const [courses, setCourses] = useState(homepageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(homepageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomepageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading)
  }

  return (
    <>
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={'Power of code'}/>
      </div>
      <p className="text-center text-sm text-richblack-300 mt-3">
        Learn to build anything you can imagine
      </p>

      <div className="flex bg-richblue-800 rounded-full border-richblack-100 mb-5 mt-5 p-1">
        {
          tabsname.map((element, index) => {
            return (
              <div 
              className={`text-[16px] flex items-center gap-2 rounded-full px-7 py-2
                              ${currentTab === element 
                              ?'bg-richblack-900 text-richblack-5 font-medium'
                              :'text-richblack-200'}
                              transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 
                            `}
              key={index}
              onClick={() => setMyCards(element)}
              >
                {element}
              </div>
            )
          })
        }
      </div>

      <div className="lg:h-[150px]">
        <div className="absolute flex gap-10 justify-between w-full">
          {/* {
            courses.map((element, index) => {
              return (
                <CourseCard
                  key={index}
                  cardData={element}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                />
              )
            })
          } */}
        </div>
      </div>

    </>
  )
}

export default ExploreMore