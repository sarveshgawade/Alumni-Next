import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import { IoSchoolOutline } from "react-icons/io5";
import { Menu } from '@headlessui/react';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../Redux/Slices/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role } = useSelector(state => state?.auth);

  function handleProfile() {
    navigate('/user/my-profile');
  }

  async function handleSignout() {
    await dispatch(signout());
    navigate('/');
  }

  return (
    <header className="bg-black bg-opacity-50 text-white p-4 flex flex-col md:flex-row justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Left Section: Company Logo */}
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <IoSchoolOutline className="text-2xl" />
        <NavLink to='/' className="text-xl font-bold hover:text-black">Alumni-Next</NavLink>
      </div>

      {/* Middle Section: Options */}
      <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 mb-4 md:mb-0 flex-grow justify-center">
        <NavLink
          to='/jobs'
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-black"
          }
        >
          Jobs & Internships
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-black"
          }
        >
          Events
        </NavLink>
        {(role === 'ADMIN' || role === 'ALUMNI') && (
              <NavLink
                to="/job/add-new-job"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "hover:text-black"
                }
              >
                Add New Job
              </NavLink>
        )}

        { role === 'ALUMNI' && (
              <NavLink
                to="/alumni/donate"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "hover:text-black"
                }
              >
                Donate
              </NavLink>
        )}

        { role === 'ADMIN' && (
              <NavLink
                to="/event/add"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "hover:text-black"
                }
              >
                Add Event
              </NavLink>
        )}

      { role === 'ADMIN' && (
              <NavLink
                to="/send-reunion-invite"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "hover:text-black"
                }
              >
                Reunite
              </NavLink>
        )}


      { role === 'ALUMNI' && (
              <NavLink
                to="/refer"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "hover:text-black"
                }
              >
                Refer-Buddy
              </NavLink>
        )}


      {role === 'ALUMNI' && (
              <NavLink
                to="/referrals"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "hover:text-black"
                }
              >
                Referrals
              </NavLink>
        )}
        {/* ' */}
      </nav>

      {/* Right Section: Hamburger Menu */}
      <div className="relative">
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button className="flex items-center space-x-2">
                <div className={`relative w-8 h-6 flex flex-col justify-between items-center ${open ? 'open' : ''}`}>
                  <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${open ? 'transform translate-y-2 rotate-45' : ''}`}></span>
                  <span className={`block w-full h-0.5 bg-white transition-opacity duration-300 ease-in-out ${open ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${open ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
                </div>
              </Menu.Button>

              <Menu.Items className={`absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg outline-none ${open ? '' : 'hidden'}`}>
                <div className="py-1">
                  {isLoggedIn ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleProfile}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex gap-4 items-center w-full px-4 py-2 text-sm leading-5 text-gray-700`}
                          >
                            <MdOutlineManageAccounts />
                            Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignout}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex gap-4 items-center w-full px-4 py-2 text-sm leading-5 text-gray-700`}
                          >
                            <FaSignOutAlt />
                            Signout
                          </button>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to='/user/signin'
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex gap-4 w-full px-4 py-2 text-sm leading-5 text-gray-700 items-center`}
                          >
                            <FaSignInAlt />
                            Signin
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to='/user/signup'
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex gap-4 items-center w-full px-4 py-2 text-sm leading-5 text-gray-700`}
                          >
                            <CgProfile />
                            Signup
                          </NavLink>
                        )}
                      </Menu.Item>
                    </>
                  )}
                </div>
              </Menu.Items>
            </>
          )}
        </Menu>
      </div>
    </header>
  );
}

export default Header;
