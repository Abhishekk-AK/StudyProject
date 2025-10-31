import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/TimelineLogo/Logo1.svg'
import { NavbarLinks } from '../../data/navbar-links'

const Navbar = () => {

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
                        link.title === 'Catalog' ? (<div></div>) : (
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

        </div>

      </div>
    </div>
  )
}

export default Navbar