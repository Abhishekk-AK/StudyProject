import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import MyProfile from '../components/core/Dashboard/MyProfile';

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );

    if(authLoading || profileLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

  return (
    <div className='relative flex '>
        <Sidebar/>
        <div className='mx-auto overflow-auto'>
            <div className='w-11/12 max-w-[1000px] py-10 mx-auto'>
                <Outlet/>
            </div>
        </div>
      
    </div>
  )
}

export default Dashboard