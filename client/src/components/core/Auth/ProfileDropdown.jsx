import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authApi";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const ProfileDropdown = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.profile)

  const logoutHandler = (e) => {
    dispatch(logout(navigate))
  }

  return (
    <>
      <div className="relative hover:cursor-pointer group">
        <div className="flex items-center gap-1">
          <img
            src={`${user?.image}`}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-7 rounded-full object-cover"
          />
          <IoIosArrowDropdownCircle/>
        </div>

        <div className="invisible z-10 absolute left-[20%] top-[60%] translate-x-[-51%] translate-y-[25%] flex flex-col rounded-sm bg-richblack-5 py-1 px-2 text-richblack-900 transition-all duration-200 group-hover:visible lg:w-[90px]">
          <button 
            onClick={() => navigate('dashboard/my-profile')}
          >
            <p className="cursor-pointer">My Profile</p>
          </button>
          <button 
            onClick={logoutHandler}
            className="cursor-pointer"
          >
            Logout
          </button>
        </div>

      </div>
      
      
    </>
  )
}

export default ProfileDropdown