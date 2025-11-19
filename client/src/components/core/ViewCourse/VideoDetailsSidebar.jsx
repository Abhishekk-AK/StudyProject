import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import IconBtn from "../../common/IconBtn"

const VideoDetailsSidebar = ({setReviewModal}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const [activeStatus, setActiveStatus] = useState('')
    const [videobarActive, setVideobarActive] = useState('')
    const {sectionId, subSectionId} = useParams()

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse)

    useEffect(() => {
        //set active flags
        ; (() => {
            if(!courseSectionData.length)
                return
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
            //set current section
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
            //set current sub-section
            setVideobarActive(activeSubSectionId)
        })()
    },[courseSectionData, courseEntireData, location.pathname])
    

  return (
    <div className="text-richblack-5 bg-richblack-700 w-[230px]">
        <div>
            <div>
                {/* buttons */}
                <div>
                    <div
                        onClick={() => {
                            navigate('dashboard/enrolled-courses')
                        }}
                    >
                        Back
                    </div>
                    <div>
                        <IconBtn
                            text='Add Review'
                            onclick={() => {
                                setReviewModal(true)
                            }}
                        />
                    </div>
                </div>
                {/* heading and title */}
                <div>
                    <p>
                        {courseEntireData?.courseName}
                    </p>
                    <p>
                        {completedLectures?.length} / {totalNoOfLectures}
                    </p>
                </div>
            </div>

            <div>
                {
                    courseSectionData.map((section) => (
                        <div
                            key={section._id}
                            onClick={() => setActiveStatus(section?._id)}
                            className={` bg-richblack-500
                                ${
                                    activeStatus === section?._id ? 'bg-richblack-200' : ''
                                }
                            `}
                        >
                            <div>
                                {section?.sectionName}
                            </div>
                            <AiOutlineArrowDown/>
                            <AiOutlineArrowUp/>

                            <div>
                                {
                                    section?.subSection.map((topic) => (
                                        <div
                                            key={topic._id}
                                            className={`flex gap-4 p-5
                                                ${
                                                    videobarActive === topic._id
                                                    ? 'bg-yellow-200 text-richblack-900'
                                                    : 'bg-richblack-800 text-richblack-5'
                                                }
                                            `}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                                                )
                                                setVideobarActive(topic._id)
                                            }}
                                        >
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    checked={completedLectures.includes(topic._id)}
                                                    onChange={() => {}}
                                                />
                                                <span>
                                                    {topic.title}
                                                </span>
                                            </div>
                                            <span>
                                                {topic.timeDuration}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default VideoDetailsSidebar