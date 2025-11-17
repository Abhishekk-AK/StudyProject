import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { markLectureAsComplete } from "../../../services/operations/courseApi"
import { updateCompletedLectures } from "../../../slices/ViewCourseSlice"
import ReactPlayer from 'react-player'
import { AiFillPlayCircle } from "react-icons/ai"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const playerRef = useRef()
  const [videoData, setVideoData] = useState([])
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const {courseId, sectionId, subSectionId} = useParams()
  const {token} = useSelector((state) => state.auth)
  
  const {
    courseSectionData,
    courseEntireData,
    completedLectures
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if(!courseSectionData.length)
        return

      if(!courseId && !sectionId && subSectionId) {
        navigate('/dashboard/enrolled-courses')

      } else {
        //let's assume k all 3 fields are present

        const filteredSectionData = courseSectionData.filter(
          (section) => section._id === sectionId
        )

        const filteredVideoData = filteredSectionData?.[0].subSection.filter(
          (data) => data._id === subSectionId
        )

        setVideoData(filteredVideoData[0])
        setVideoEnded(false)
      }
    }
    setVideoSpecificDetails()
  },[courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0)
      return true
    else
      return false
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length -1 && 
      currentSubSectionIndex === noOfSubSections - 1)
      return true
    else
      return false 
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSections - 1) {
      //next video in same section
      const nextSubSectionId = courseSectionData[currentSectionIndex]
                                ?.subSection[currentSubSectionIndex + 1]._id
      
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    
    } else {
      //next video in differnt section -> first video in new section
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1]
                                ?.subSection[0]._id
      
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== 0) {
      //previous video in same section
      const prevSubSectionId = courseSectionData[currentSectionIndex]
                                ?.subSection[currentSubSectionIndex - 1]._id
      
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    
    } else {
      //previous video in differnt section -> last video in previous section
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id

      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.subSection.length
      
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1]
                                ?.subSection[prevSubSectionLength - 1]._id
      
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)

    const result = await markLectureAsComplete({courseId:courseId, subSectionId:subSectionId}, token)
    //update state
    if(result) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <>
      {
        !videoData 
        ? (
          <div>
            No Video Found
          </div>
        )
        : (
          <ReactPlayer
            ref={playerRef}
            aspect-ratio='16:9'
            playsInline
            width="80%" 
            height="50%"  
            src={videoData?.videoUrl}
            onEnded={() => setVideoEnded(true)}
            className="aspect-video object-cover" 
          >
            <AiFillPlayCircle/>

            {
              videoEnded && (
                <div>
                  {
                    !completedLectures.includes(subSectionId) && (
                      <IconBtn
                        disabled={loading}
                        onclick={() => handleLectureCompletion()}
                        text={!loading ? 'Mark As Complete': 'Loading...'}
                      />
                    )
                  }

                  <IconBtn
                    disabled={loading}
                    onclick={() => {
                      if(playerRef?.current) {
                        playerRef?.current.seek(0)
                        setVideoEnded(false)
                      }
                    }}
                    text={'Rewatch'}
                    customClasses={'text-xl'}
                  />

                  <div>
                    {
                      !isFirstVideo() && (
                        <button
                          disabled={loading}
                          onclick={goToPreviousVideo}
                          className="blackButton"
                        >
                          Prev
                        </button>
                      )
                    }
                    {
                      !isLastVideo() && (
                        <button
                          disabled={loading}
                          onclick={goToNextVideo}
                          className="blackButton"
                        >
                          Next
                        </button>
                      )
                    }
                  </div>
                </div>
              )
            }

          </ReactPlayer>
        )
      }
      <h1>
        {videoData?.title}
      </h1>
      <p>
        {videoData?.description}
      </p>
    </>
  )
}

export default VideoDetails