import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import EditProfilePic from "./EditProfilePic"
import UpdatePassword from "./UpdatePassword"

const Settings = () => {
  return (
    <div className="text-richblack-5">
      <h1>
        Settings
      </h1>
      <h2>
        Edit Profile
      </h2>
      <EditProfilePic/>
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings