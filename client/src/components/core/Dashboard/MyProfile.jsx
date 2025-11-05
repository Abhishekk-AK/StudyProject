import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className="text-white">
      <h1>
        My Profile
      </h1>

      <div>
        <div>
            <img
                src={`${user?.image}`}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div>
                <p>{user?.firstName + ' ' + user?.lastName}</p>
                <p>{user?.email}</p>
            </div>
        </div>
        <IconBtn
            text='Edit'
            onclick={() => {
                navigate('/dashboard/settings')
            }}
        >
        </IconBtn>
      </div>

      <div>
            <div>
                <p>About</p>
                <IconBtn
                    text='Edit'
                    onclick={() => {
                        navigate('/dashboard/settings')
                    }}
                />
            </div>
            <p>
                {user?.additionalDetails?.about ?? 'Write something about yourdelf.'}
            </p>
      </div>

      <div>
            <div>
                <p>Personal Details</p>
                <IconBtn
                    text='Edit'
                    onclick={() => {
                        navigate('/dashboard/settings')
                    }}
                />
            </div>
            <div>
                <div>
                    <p>First Name</p>
                    <p>{user?.firstName}</p>
                </div>
                <div>
                    <p>Email</p>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <p>Gender</p>
                    <p>{user?.additionalDetails?.gender ?? 'M/F/O'}</p>
                </div>
                <div>
                    <p>Last Name</p>
                    <p>{user?.lastName}</p>
                </div>
                <div>
                    <p>Contact Number</p>
                    <p>{user?.additionalDetails?.contactNumber ?? '12345 67890'}</p>
                </div>
                <div>
                    <p>Date of Birth</p>
                    <p>{user?.additionalDetails?.dateOfBirth ?? 'DD/MM/YYYY'}</p>
                </div>
            </div>
      </div>
    </div>
  )
}

export default MyProfile