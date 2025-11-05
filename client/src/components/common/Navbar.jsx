import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/TimelineLogo/Logo1.svg'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { useEffect, useState } from 'react'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from 'react-icons/io'


const Navbar = () => {

    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart );

    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
        try {
          const result = await apiConnector('GET', categories.CATEGORIES_API);
          console.log('Printing sublinks result:', result);
          setSubLinks(result.data.allCategorys);
          console.log(result.data.allCategorys);
        } catch (err) {
          console.log('Could not fetch the catalog list.')
        }
      }

    useEffect( () => {
      fetchSubLinks();
    },[])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className="flex items-center justify-center border-b border-b-richblack-700 ">
      <div className="flex w-11/12 max-w-max-content items-center justify-between">

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
                            <div className='flex items-center gap-2 group relative hover:cursor-pointer'>
                              <p>{link.title}</p>
                              <IoIosArrowDropdownCircle/>

                              <div className='invisible z-10 absolute left-[50%] top-[0%] translate-x-[-51%] translate-y-[25%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 transition-all duration-200 group-hover:visible lg:w-[300px]'>
                                
                                <div className='absolute left-[50%] translate-x-[80%] translate-y-[-45%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                  subLinks.length
                                  ? (
                                    subLinks.map( (subLink, index) => (
                                      <Link to={`${subLink.link}`} key={index}>
                                        <p>{subLink.name}</p>
                                      </Link>
                                    ))
                                  )
                                  : (
                                    <></>
                                  )
                                }
                              </div>
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
        <div className='flex gap-x-4 items-center  text-richblack-25'>
          {
            user && user?.accountType !== 'Instructor' && (
              <Link to='/dashboard/cart' className='relative text-richblack-25'>
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