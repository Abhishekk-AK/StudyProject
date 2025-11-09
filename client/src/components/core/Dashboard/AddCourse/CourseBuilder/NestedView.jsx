import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RxDropdownMenu } from "react-icons/rx"

const NestedView = ({handleChangeEditSectionName}) => {

  const dispatch = useDispatch()
  const {course} = useSelector((state) => state.course)
  const {token} = useSelector((state) => state.auth)

  const [addSubsection, setAddSubsection] = useState(null)
  const [viewSubsection, setViewSubsection] = useState(null)
  const [editSubsection, setEditSubsection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  return (
    <>
      <div className="text-richblack-5">
        {
          course?.courseContent?.map((section) => (
            <details key={section._id} open>

              <summary>
                <div>
                  <RxDropdownMenu/>
                  <p>{section?.sectionName}</p>
                </div>
              </summary>

            </details>
          ))
        }
      </div>
    </>
  )
}

export default NestedView