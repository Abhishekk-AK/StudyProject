import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import IconBtn from "../../../common/IconBtn"
import { useNavigate } from "react-router-dom"

const ChangePassword = () => {

  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)
  const {register, handleSubmit, formState:{errors}} = useForm()
  const [viewCurrentPass, setViewCurrentPass] = useState(false)
  const [viewNewPass, setViewNewPass] = useState(false)

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(data, token)
    } catch (err) {
      console.error('Update password error:', err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="flex flex-col">
        <p>
          Password
        </p>
        <div className="grid grid-cols-2">
          <div>
            <label
              htmlFor="currentPassword"
              className=""
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type={viewCurrentPass ? 'text' : 'password'}
              placeholder="Enter Current Password"
              {...register('currentPassword', {required:true})}
              className=""
            />
            <span
              onClick={() => setViewCurrentPass((prev) => !prev)}
              className=""
            >
              {
                viewCurrentPass
                ? (
                  <AiOutlineEyeInvisible/>
                )
                : (
                  <AiOutlineEye/>
                )
              }
            </span>
            {
              errors.currentPassword && (
                <span>
                  <span>*</span>
                  Current Password is required
                </span>
              )
            }
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className=""
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type={viewNewPass ? 'text' : 'password'}
              placeholder="Enter New Password"
              {...register('newPassword', {required:true})}
              className=""
            />
            <span
              onClick={() => setViewNewPass((prev) => !prev)}
              className=""
            >
              {
                viewNewPass
                ? (
                  <AiOutlineEyeInvisible/>
                )
                : (
                  <AiOutlineEye/>
                )
              }
            </span>
            {
              errors.newPassword && (
                <span>
                  <span>*</span>
                  New Password is required
                </span>
              )
            }
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate('/dashboard/my-profile')}
            className=""
          >
            Cancel
          </button>
          <IconBtn
            type={'submit'}
            text={'Update'}
          />
        </div>
      </div>
    </form>
  )
}

export default ChangePassword