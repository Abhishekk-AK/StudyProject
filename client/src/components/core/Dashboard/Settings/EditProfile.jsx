import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../common/IconBtn"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)
  const {register, handleSubmit, formState:{errors}} = useForm()

  const genders = ['Select', 'Male', 'Female', 'Others']
  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(data, token))
    } catch (err) {
      console.error('Update proile error:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="flex flex-col gap-3">
        <div>
          Profile Information
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className=""
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              {...register('firstName', {required:true})}
              defaultValue={user?.firstName}
            />
            {
              errors.firstName && (
                <span>
                  <span>*</span>
                  Please enter your First name
                </span>
              )
            }
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className=""
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              {...register('lastName', {required:false})}
              defaultValue={user?.lastName}
            />
            {
              errors.firstName && (
                <span>
                  <span>*</span>
                  Please enter your Last name
                </span>
              )
            }
          </div>
          
          <div className="flex flex-col">
            <label
              htmlFor="dateOfBirth"
              className=""
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              //placeholder="dd/mm/yy"
              {...register('dateOfBirth', {
                required:{
                  value:false,
                  message:'Please Enter your date of Birth'
                },
                max:{
                  value: new Date().toISOString().split('T')[0],
                  message: 'Date of Birth cannot be in the futrure.'
                }
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {
              errors.dateOfBirth && (
                <span>
                  {errors.dateOfBirth.message}
                </span>
              )
            }
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="gender"
              className=""
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              type="text"
              {...register('gender', {required:false})}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            >
              {
                genders.map((ele, i) => (
                  <option key={i} value={ele} >
                    {ele}
                  </option>
                ))
              }
            </select>
            {
              errors.gender && (
                <span>
                  Select Gender
                </span>
              )
            }
          </div>
          
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="contactNumber"
              className=""
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              placeholder="Enter Contact Number"
              {...register('contactNumber', {
                required:{
                  value:false,
                  message:'Please enter your contact number.'
                },
                maxLength:{ value:12, message:'Invalid contact number.' },
                minLength:{ value:10, message:'Invalid contact number.' }
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {
              errors.contactNumber && (
                <span>
                  <span>*</span>
                  {errors.contactNumber.message}
                </span>
              )
            }
          </div>

          <div className="flex flex-col col-span-2">
            <label
              htmlFor="about"
              className=""
            >
              About
            </label>
            <input
              id="about"
              name="about"
              type="text"
              placeholder="Enter About Yourself"
              {...register('about', {required:false})}
              defaultValue={user?.additionalDetails?.about}
            />
            {
              errors.about && (
                <span>
                  <span>*</span>
                  Please enter About Yourself
                </span>
              )
            }
          </div>

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
          text={'Save'}
          type={'submit'}
        />
      </div>
    </form>
  )
}

export default EditProfile