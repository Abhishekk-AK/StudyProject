import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const VideoDetails = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const isFirstVideo = () => {

  }

  const isLastVideo = () => {

  }

  const goToNext = () => {

  }

  const goToPrevious = () => {

  }

  const handleLectureCompletion = () => {

  }

  return (
    <>
      
    </>
  )
}

export default VideoDetails