import { useDispatch, useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authApi'
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {

    const {user, loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(authLoading || profileLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

  return (
    <>
      <div className='flex min-w-[222px] flex-col border-r-[1] text-richblack-5 border-richblack-700 h-[calc(100vh-3.5rem)] py-10 bg-richblue-800'>
        
        <div>
            {
                sidebarLinks.map( (link) => {
                    if(link.type && user?.accountType !== link.type) 
                        return null;
                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icons}  />
                    )
                })
            }
        </div>

        <div className='mt-6 w-11/12 mx-auto mb-6 h-[1] bg-richblack-600' />

        <div>
            <SidebarLink
                link={{name:'Settings', path:'dashboard/settings'}}
                iconName="VscSettingsGear"
            />

            <button
                onClick={ () => setConfirmationModal({
                    text1: 'Are you sure?',
                    text2: 'You will be logged out of your account.',
                    btn1Text: 'Logout',
                    btn2Text: 'Cancel',
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null)
                })}

                className='text-sm font-medium text-richblack-400'
            >
            <div className='flex items-center gap-x-2 text-lg text-richblack-5'>
                <VscSignOut/>
                <span>Logout</span>
            </div>

            </button>
        </div>

      </div>
      {/* modal Visible/ Invisible */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default Sidebar