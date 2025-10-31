import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/TimelineLogo/Logo1.svg'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart );

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className="flex h14 items-center justify-center border-b-1px border-b-richblack-700 ">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        <Link to={'/'}>
          <img src={Logo} width={32} height={42} loading='lazy' />
        </Link>

        <nav>
            <ul className='flex gap-6 text-richblack-25'>
              {
                NavbarLinks.map((link, index) => (
                    <li key={index}>
                        {
                        link.title === 'Catalog' 
                        ? (
                            <div>
                              
                            </div>
                          ) 
                        : (
                            <Link to={link?.path}>
                            <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                                {link.title}
                            </p>
                            </Link>
                        )
                        }
                    </li>
                ))
              }
            </ul>
        </nav>

        {/* login, signup, dashboard, cart */}
        <div className='flex gap-x-4 items-center'>
          {
            user && user?.accountType !== 'Instructor' && (
              <Link to='/dashboard/cart' className='relative'>
                <AiOutlineShoppingCart />
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link to='/login'>
                <button className='border border-richblack-700 text-richblack-100 px-2 py-1 rounded-md'>
                  Login
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to='/signup'>
                <button className='border border-richblack-700 text-richblack-100 px-2 py-1 rounded-md'>
                  Sign Up
                </button>
              </Link>
            )
          }
          {
            token !== null && <ProfileDropdown/>
          }
        </div>

      </div>
    </div>
  )
}

export default Navbar