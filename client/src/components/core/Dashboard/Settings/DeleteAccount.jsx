import { useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { deleteAccount } from "../../../../services/operations/settingsApi"

const DeleteAccount = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)
  const [modalData, setModalData] = useState(null)

  const deleteAccountHandler = () => {
    try {
      dispatch(deleteAccount(token, navigate))
    } catch (err) {
      console.error('Account deletion error:', err)
    }
  }

  return (
    <>
      <div className="flex">
        <div className="flex justify-center items-center rounded-full w-14 h-14">
          <AiOutlineDelete/>
        </div>
        <div className="flex flex-col">
          <p>
            Delete Account
          </p>
          <div>
            <p>
              Would you like to delete Account?
            </p>
            <p>
              This account may contain Paid Courses. 
              Deleting your account is permanent and will remove all the content and permissions associated with it.
            </p>
            <button
              type="button"
              onClick={() => {
                setModalData({
                  text1:'Delete Account',
                  text2:'I want to delete my account.',
                  btn1Text:'Delete',
                  btn2Text:'Cancel',
                  btn1Handler:() => deleteAccountHandler(),
                  btn2Handler:(() => setModalData(null))
                })
              }}
            >
              I want to delete my account
            </button>
          </div>
        </div>
        {
          modalData && <ConfirmationModal modalData={modalData} />
        }
      </div>
    </>
  )
}

export default DeleteAccount