import { useDispatch, useSelector } from "react-redux"
import { MdOutlineFileUpload } from "react-icons/md";
import IconBtn from "../../../common/IconBtn";
import { useRef, useState } from "react";
import { updateProfilePicture } from "../../../../services/operations/settingsApi";

const EditProfilePic = () => {

  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)


  const handleSelect = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if(file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('profilePicture', imageFile)

      dispatch(updateProfilePicture(formData, token))
      .then(() => {setLoading(false)})

    } catch (err) {
      console.error('Profile pic upload error:', err.message)
    }
  }
    
  return (
    <>
      <div>
        <div className="flex">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="h-14 w-14 rounded-full object-cover aspect-square"
          />
          <div className="flex flex-col gap-2">
            <p>
              Change Profile Picture
            </p>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                disabled={loading}
                onClick={handleSelect}
                className="bg-richblack-700 cursor-pointer rounded-md text-richblack-50 "
              >
                Select
              </button>
              <IconBtn
                text={loading ? 'Uploading...' : 'Upload'}
                onclick={handleFileUpload}
              >
                {
                  !loading && (
                    <MdOutlineFileUpload className="text-lg text-richblack-900"/>
                  )
                }
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfilePic