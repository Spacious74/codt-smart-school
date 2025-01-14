import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup.jsx';
import { FaTh, FaGraduationCap, FaCalendarAlt, FaUser, FaSignOutAlt, FaCog, FaChalkboardTeacher, FaBook, FaGlobe, FaBell, FaCreditCard } from 'react-icons/fa';
import { MdGridOn, MdPayment, MdHelp } from 'react-icons/md';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close if the ESC key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white text-grayCustom dark:text-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-3.5 mt-1 drop-shadow-1 w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <NavLink to="/app">
          <img
            src="../../src/assets/logo.png"
            alt="Logo"
            style={{ width: '200px' }}
          />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* Menu Group */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Menu Item Dashboard */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('app')
                }
              >
                {(handleClick, open) => (
                  <NavLink
                    to="/app/home"
                    className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                      pathname.includes('home') && 'bg-blueshade text-white dark:bg-meta-4 rounded-[10px]'
                    }`}
                  >
                    <FaTh size={20} />
                    Home
                  </NavLink>
                )}
              </SidebarLinkGroup>

              {/* Menu Item Academic */}
              <li>
                <NavLink
                  to="/app/academics"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('academics') && 'bg-blueshade text-white dark:bg-meta-4 rounded-[10px]'
                  }`}
                >
                  <FaGraduationCap  size={20} />
                  Academic
                </NavLink>
              </li>
 {/* Menu Item Attendence */}
 <li>
                <NavLink
                  to="/app/studettendence"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('studettendence') && 'bg-blueshade text-white dark:bg-meta-4 rounded-[10px]'
                  }`}
                >
                  <FaCalendarAlt size={20} />
                  Attendence
                </NavLink>
              </li>
              {/* Menu Item Online Courses */}
              <li>
                <NavLink
                  to="https://codt.in/"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('courses') && 'bg-blueshade text-white dark:bg-meta-4'
                  }`}
                >
                  <FaChalkboardTeacher size={20} />
                  Online Courses
                </NavLink>
              </li>

              {/* Menu Item Career Research */}
              <li>
                <NavLink
                  to="career"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('career') && 'bg-blueshade text-white dark:bg-meta-4'
                  }`}
                >
                  <FaBook size={20} />
                  Career Research
                </NavLink>
              </li>
  {/* Menu Item Career Research */}
  {/* <li>
                <NavLink
                  to="reviewteacher"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('reviewteacher') && 'bg-blueshade text-white dark:bg-meta-4'
                  }`}
                >
                  <FaBook size={20} />
                  Career Research
                </NavLink>
              </li>
              {/* Menu Item Education Abroad */}
              <li> 
                <NavLink
                  to="/abroad"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out border-radis:2px dark:hover:bg-meta-4 ${
                    pathname.includes('abroad') && 'bg-blueshade text-white dark:bg-meta-4'
                  }`}
                >
                  <FaGlobe size={20} />
                  Education Abroad
                </NavLink>
              </li>

              {/* Menu Item Notice */}
              <li>
                <NavLink
                  to="notice"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('notice') && 'bg-blueshade text-white dark:bg-meta-4'
                  }`}
                >
                  <FaBell size={20} />
                  Notice
                </NavLink>
              </li>

              {/* Menu Item Settings */}
              <li>
                <NavLink
                  to="/settings"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('settings') && 'bg-blueshade text-white dark:bg-meta-4'
                  }`}
                >
                  <FaCog size={20} />
                  Settings
                </NavLink>
              </li>

              {/* Menu Item Subscription & Payment */}
              <li>
                <NavLink
                  to="pricing"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('pricing') && 'bg-blueshade text-white dark:bg-meta-4'
                  }`}
                >
                  <MdPayment size={20} />
                  Subscription & Payment
                </NavLink>
              </li>

              {/* Menu Item Logout */}
              <li>
  <NavLink
    to="/logout"
    onClick={(e) => {
      // Prevent the default navigation behavior
      e.preventDefault();

      // Remove 'stud' from localStorage and 'schoolEmail' from sessionStorage
      localStorage.removeItem('stud');

      // Optionally, redirect the user to another page after logout
      window.location.href = '/auth/signin';    }}
    className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
      pathname.includes('logout') && 'bg-blueshade text-white dark:bg-meta-4'
    }`}
  >
    <FaSignOutAlt size={20} />
    Logout
  </NavLink>
</li>

              {/* Menu Item Help */}
              <li>
                <NavLink
                  to="/help"
                  className={`group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes('help') && 'bg-blueshade text-white dark:bg-meta-4'
                  }`}
                >
                  <MdHelp size={20} />
                  Help
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
