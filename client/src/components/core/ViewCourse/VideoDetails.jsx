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
  const playerRef = useRef(null)
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

      if(!courseId && !sectionId && !subSectionId) {
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

  const replayVideo = () => {
    console.log('first')
    playerRef.current.seekTo(0, 0);   // Go to start
    console.log('second')
  };


  return (
    <div className="text-richblack-5 relative">
      {
        !videoData 
        ? (
          <div className="h-full w-full rounded-md object-cover">
            No Video Found
          </div>
        )
        : (
          <>
            <ReactPlayer
              ref={playerRef}
              playsInline={false}
              controls
              style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
              onReady={() => console.log("Player ready", playerRef.current)}
              playing={false}
              src={videoData?.videoUrl}
              onEnded={() => setVideoEnded(true)}
              className="full absolute inset-0 grid h-full place-content-center font-inter"
            />

            <AiFillPlayCircle position="center" className="bg-yellow-50 text-red-500"/>
            {
              videoEnded && (
                <div
                  className="full absolute text-amber-400 inset-0 z-100 grid h-[80vh] place-content-center font-inter"
                >
                
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
                    // onclick={() => { replayVideo
                    //   // if(playerRef?.current) {
                    //   //   playerRef?.current.seek(0)
                    //   //   setVideoEnded(false)
                    //   // }
                    // }}
                    //
                    onclick={replayVideo}
                    text={'Rewatch'}
                    customClasses={'text-xl'}
                  />

                  <div>
                    {
                      !isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPreviousVideo}
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
                          onClick={goToNextVideo}
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
          </>
        )
      }
      <h1>
        {videoData?.title}
      </h1>
      <p>
        {videoData?.description}
      </p>
    </div>
  )
}

export default VideoDetails