import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useDropzone } from "react-dropzone"
import { useEffect } from "react"
import ReactPlayer from "react-player"
import { FiUploadCloud } from "react-icons/fi";

const Upload = (
  {
    name, label, register, setValue, errors, video = false, viewData = null, editData = null
  }
  ) => {

    const {course} = useSelector((state) => state.course)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(viewData ? viewData : editData ? editData : '')
    const inputRef = useRef(null)

    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0]

      if(file) {
        previewFile(file)
        setSelectedFile(file)
      }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone(
      {
        accept: !video
        ? { 'image/*': ['.jpg', '.jpeg', '.png'] }
        : { 'video/*': ['.mp4'] },
        onDrop
      }
    )

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }

    useEffect(() => {
      register(name, {required:true})
    },[register])

    useEffect(() => {
      setValue(name, selectedFile)
    },[setValue, selectedFile])


  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label} {!viewData && <sup>*</sup>}
      </label>
      <div
      className={`
                  ${isDragActive ? 'bg-richblack-600' : 'bg-richblack-700'}
                  flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500
                `}
      >
        {
          previewSource 
          ? (
            <div>
              {
                !video 
                ? (
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="max-w-[500px] aspect-video object-cover rounded-md"
                  />
                )
                : (
                  <ReactPlayer playsInline width={16} height={9} src={previewSource} />
                )
              }
              {
                !viewData && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewSource('')
                      setSelectedFile(null)
                      setValue(name, null)
                    }}
                    className="mt-3 text-richblack-400 underline"
                  >
                    Cancel
                  </button>
                )
              }
            </div>
          )
          : (
            <div
              className="flex flex-col items-center w-full"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="grid aspect-square w-14">
                <FiUploadCloud className="text-2xl text-yellow-50" />
              </div>
              <p className="">
                Drag and drop an {!video ? 'image' : 'video'}, or click to {' '}
                <span className="font-semibold text-yellow-50">
                  Browse {''}
                </span> 
                a file
              </p>
              <ul className="">
                <li>Aspect ratio: 16:9</li>
                <li>Recommended size: 1024*576</li>
              </ul>
            </div>
          )
        }  
      </div>
      {
        errors[name] && (
          <span className="">
            {label} is required
          </span>
        )
      }
    </div>
  )
}

export default Upload