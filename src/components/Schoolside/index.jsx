import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MdPayment, MdHelp } from 'react-icons/md';
import SidebarLinkGroup from './SidebarLinkGroup.jsx';

const menuItems = [
  { to: "/school/home", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 18c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 14 4.46 14 6 14s2.31 0 2.876.347c.317.194.583.46.777.777C10 15.689 10 16.46 10 18s0 2.31-.347 2.877c-.194.316-.46.582-.777.776C8.311 22 7.54 22 6 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C2 20.31 2 19.54 2 18m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 14 16.46 14 18 14s2.31 0 2.877.347c.316.194.582.46.776.777C22 15.689 22 16.46 22 18s0 2.31-.347 2.877a2.36 2.36 0 0 1-.776.776C20.31 22 19.54 22 18 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C14 20.31 14 19.54 14 18M2 6c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 2 4.46 2 6 2s2.31 0 2.876.347c.317.194.583.46.777.777C10 3.689 10 4.46 10 6s0 2.31-.347 2.876c-.194.317-.46.583-.777.777C8.311 10 7.54 10 6 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C2 8.311 2 7.54 2 6m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 2 16.46 2 18 2s2.31 0 2.877.347c.316.194.582.46.776.777C22 3.689 22 4.46 22 6s0 2.31-.347 2.876c-.194.317-.46.583-.776.777C20.31 10 19.54 10 18 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C14 8.311 14 7.54 14 6" color="currentColor"/></svg>, 
  label: "Home" },
  { to: "/school/academicschool", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2v2M6 2v2m5.996 9h.008m-.008 4h.008m3.987-4H16m-8 0h.009M8 17h.009M3.5 8h17m-18 4.243c0-4.357 0-6.536 1.252-7.89C5.004 3 7.02 3 11.05 3h1.9c4.03 0 6.046 0 7.298 1.354C21.5 5.707 21.5 7.886 21.5 12.244v.513c0 4.357 0 6.536-1.252 7.89C18.996 22 16.98 22 12.95 22h-1.9c-4.03 0-6.046 0-7.298-1.354C2.5 19.293 2.5 17.114 2.5 12.756zM3 8h18" color="currentColor"/></svg>, 
  label: "Academic" },
  { to: "/school/Techerdata", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="M20 22v-5c0-1.886 0-2.828-.586-3.414S17.886 13 16 13l-4 9l-4-9c-1.886 0-2.828 0-3.414.586S4 15.114 4 17v5"/><path d="m12 15l-.5 4l.5 1.5l.5-1.5zm0 0l-1-2h2zm3.5-8.5v-1a3.5 3.5 0 1 0-7 0v1a3.5 3.5 0 1 0 7 0"/></g></svg>, 
  label: "Teachers" },
  // { to: "/school/allattendenec", icon: <FaUser size={20} />, label: "Attendance" },
  { to: "/school/studentsdata", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 5l-7-3l-7 3l3.5 1.5v2S9.667 8 12 8s3.5.5 3.5.5v-2zm0 0v4m-3.5-.5v1a3.5 3.5 0 1 1-7 0v-1m-.717 8.203c-1.1.685-3.986 2.082-2.229 3.831C6.413 21.39 7.37 22 8.571 22h6.858c1.202 0 2.158-.611 3.017-1.466c1.757-1.749-1.128-3.146-2.229-3.83a7.99 7.99 0 0 0-8.434 0" color="currentColor"/></svg>, 
    label: "Students" },
  { to: "https://codt.in/", 
  icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.583 7.238c3.007.53 4.799 1.639 5.417 2.276c.618-.637 2.41-1.746 5.418-2.276c1.523-.269 2.285-.403 2.933.112C21 7.864 21 8.7 21 10.372v6.007c0 1.529 0 2.293-.416 2.77c-.417.477-1.333.639-3.166.962c-1.635.288-2.91.747-3.833 1.208c-.909.454-1.363.681-1.585.681s-.677-.227-1.585-.68c-.923-.462-2.198-.921-3.832-1.21c-1.834-.322-2.75-.484-3.167-.961S3 17.908 3 16.379v-6.007C3 8.7 3 7.864 3.649 7.35c.648-.515 1.41-.38 2.933-.112M12 9v13M8.5 3.059a6.29 6.29 0 0 1 7 .01M13.622 5.5a3.14 3.14 0 0 0-3.244-.01" color="currentColor"/></svg>, 
  label: "Online Courses" },
  { to: "/school/career", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M10.927 7.67a3.25 3.25 0 0 1 2.147 0L19.73 10l-6.656 2.33a3.25 3.25 0 0 1-2.147 0l-3.473-1.216a77 77 0 0 1 1.563-.315a141 141 0 0 1 2.85-.516l.19-.032l.066-.011a.75.75 0 1 0-.246-1.48l-.07.012l-.193.033a146 146 0 0 0-2.88.521c-.817.157-1.672.331-2.389.498c-.541.127-1.068.263-1.434.4L4.27 10zm-7.348 3.677l-.748-.262c-1.027-.359-1.027-1.811 0-2.17l7.6-2.66a4.75 4.75 0 0 1 3.138 0l7.6 2.66c1.027.359 1.027 1.811 0 2.17l-3.38 1.183l.402 3.215a1.5 1.5 0 0 1-.564 1.381A9.25 9.25 0 0 1 12 18.75c-2.447 0-4.384-1.035-5.563-1.866a1.52 1.52 0 0 1-.624-1.431l.398-3.185l-1.154-.404a1 1 0 0 0-.283.502a1 1 0 0 1-.192 1.447l.004.018l.875 3.939a.6.6 0 0 1-.585.73H3.125a.6.6 0 0 1-.586-.73l.875-3.94l.005-.017a1 1 0 0 1-.158-1.486q.005-.048.014-.105a2.6 2.6 0 0 1 .304-.875m4.08 1.428l-.358 2.864q-.001.016.002.02c1.044.736 2.678 1.591 4.697 1.591c2.063 0 3.68-.784 4.703-1.568v-.013l-.362-2.894l-2.772.97a4.75 4.75 0 0 1-3.138 0z" clipRule="evenodd"/></svg>, 
    label: "Career Research" },
  { to: "/abroad", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.498 5c-1.303-.022-1.928.234-2.275 1.142C2.013 6.693 2 7.296 2 7.886V18c.108.634.288 1.055.742 1.4c.741.56 1.725.637 2.64.803c2.004.363 3.747.978 6.612 1.797m7.495-17c.577-.05 1.01-.023 1.354.13c1.372.615 1.144 2.632 1.144 4.136V17c.007.597-.031 1.061-.115 1.432c-.32 1.41-2.129 1.587-3.55 1.85c-1.778.328-3.675.897-6.328 1.718m0 0v-7m-.001-3a5 5 0 0 0 4.997-5c0-2.762-2.237-5-4.997-5m0 10a5 5 0 0 1-4.997-5c0-2.762 2.237-5 4.997-5m0 10c1.104 0 1.999-2.24 1.999-5c0-2.762-.895-5-2-5m0 10c-1.103 0-1.998-2.24-1.998-5c0-2.762.895-5 1.999-5" color="currentColor"/></svg>, 
  label: "Education Abroad" },
  { to: "/school/notice", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="M12.5 3h-1C7.022 3 4.782 3 3.391 4.391S2 8.021 2 12.5c0 4.478 0 6.718 1.391 8.109S7.021 22 11.5 22c4.478 0 6.718 0 8.109-1.391S21 16.979 21 12.5v-1"/><path d="M22 5.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0M7 11h4m-4 5h8"/></g></svg>, 
    label: "Notice" },
  { to: "/settings", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="m21.318 7.141l-.494-.856c-.373-.648-.56-.972-.878-1.101c-.317-.13-.676-.027-1.395.176l-1.22.344c-.459.106-.94.046-1.358-.17l-.337-.194a2 2 0 0 1-.788-.967l-.334-.998c-.22-.66-.33-.99-.591-1.178c-.261-.19-.609-.19-1.303-.19h-1.115c-.694 0-1.041 0-1.303.19c-.261.188-.37.518-.59 1.178l-.334.998a2 2 0 0 1-.789.967l-.337.195c-.418.215-.9.275-1.358.17l-1.22-.345c-.719-.203-1.078-.305-1.395-.176c-.318.129-.505.453-.878 1.1l-.493.857c-.35.608-.525.911-.491 1.234c.034.324.268.584.736 1.105l1.031 1.153c.252.319.431.875.431 1.375s-.179 1.056-.43 1.375l-1.032 1.152c-.468.521-.702.782-.736 1.105s.14.627.49 1.234l.494.857c.373.647.56.971.878 1.1s.676.028 1.395-.176l1.22-.344a2 2 0 0 1 1.359.17l.336.194c.36.23.636.57.788.968l.334.997c.22.66.33.99.591 1.18c.262.188.609.188 1.303.188h1.115c.694 0 1.042 0 1.303-.189s.371-.519.59-1.179l.335-.997c.152-.399.428-.738.788-.968l.336-.194c.42-.215.9-.276 1.36-.17l1.22.344c.718.204 1.077.306 1.394.177c.318-.13.505-.454.878-1.101l.493-.857c.35-.607.525-.91.491-1.234s-.268-.584-.736-1.105l-1.031-1.152c-.252-.32-.431-.875-.431-1.375s.179-1.056.43-1.375l1.032-1.153c.468-.52.702-.781.736-1.105s-.14-.626-.49-1.234"/><path d="M15.52 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"/></g></svg>, 
    label: "Settings" },
  { to: "/school/traning", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15V7c0-1.886 0-2.828.586-3.414S6.114 3 8 3h1m11 12v-3.5M3.498 16.015L4.02 15h15.932l.55 1.015c1.443 2.662 1.803 3.993 1.254 4.989s-2.002.996-4.91.996H7.154c-2.909 0-4.363 0-4.911-.996c-.549-.996-.19-2.327 1.254-4.989M19.5 4.146l.063-.045c1.058-.764 1.587-1.146 2.012-.961S22 3.935 22 5.158v.684c0 1.223 0 1.834-.425 2.018c-.425.185-.954-.197-2.012-.96l-.063-.046M15.5 9h.5c1.65 0 2.475 0 2.987-.448c.513-.449.513-1.17.513-2.614v-.875c0-1.444 0-2.166-.513-2.615C18.475 2 17.65 2 16 2h-.5c-1.65 0-2.475 0-2.987.448C12 2.897 12 3.618 12 5.063v.875c0 1.443 0 2.165.513 2.614C13.025 9 13.85 9 15.5 9" color="currentColor"/></svg>, 
    label: "Training" },
  { to: "/logout", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17.625c-.074 1.852-1.617 3.424-3.684 3.374c-.481-.012-1.076-.18-2.265-.515c-2.861-.807-5.345-2.164-5.941-5.203C3 14.724 3 14.095 3 12.837v-1.674c0-1.257 0-1.886.11-2.445c.596-3.038 3.08-4.395 5.941-5.202c1.19-.335 1.784-.503 2.265-.515c2.067-.05 3.61 1.522 3.684 3.374M21 12H10m11 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5" color="currentColor"/></svg>, 
    label: "Sign Out", isLogout: true },
  { to: "/school/help", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><circle cx="12" cy="12" r="10"/><path d="M10 9a2 2 0 1 1 3.683 1.08C13.085 11.01 12 11.896 12 13v.5m-.008 3.5h.009"/></g></svg>, 
    label: "Help" },
];

const SchoolSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === 'true');

  // Close sidebar on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (sidebarOpen && !sidebar.current.contains(target) && !trigger.current.contains(target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close sidebar on ESC key press
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (sidebarOpen && keyCode === 27) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Persist sidebar state in localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    document.body.classList.toggle('sidebar-expanded', sidebarExpanded);
  }, [sidebarExpanded]);

  // Logout handler with confirmation
  const handleLogout = (e) => {
    e.preventDefault();
    
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to sign out?");
    
    if (isConfirmed) {
      // Remove session and local storage items
      localStorage.removeItem('stud');
      sessionStorage.removeItem('schoolEmail');
      
      // Redirect to the login page
      window.location.href = '/auth/school-login';
    } else {
      // If the user cancels, do nothing
      return;
    }
  };

  const isActive = (path) => pathname.includes(path);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 
      z-10 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white text-grayCustom dark:text-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-[#e8e8e8]`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-3.5 mt-1 drop-shadow-1 w-full bg-white dark:bg-boxdark dark:drop-shadow-none border-b border-[#e8e8e8]">
        <img src="../src/assets/logo.png" alt="Logo" style={{ width: '200px' }} />
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill="" />
          </svg>
        </button>
      </div>

      {/* Sidebar Heading with color #503dff */}
      <div className="px-4 py-6 bg-gray-100 dark:bg-boxdark pt-7 ">
        <h2 className="text-xl font-semibold" style={{ color: '#503dff' }}>
          School Profile
        </h2>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear ">
        {/* Sidebar Menu */}
        <nav className="pr-3">
          <ul className="mb-6 flex flex-col gap-1.5">
            {menuItems.map(({ to, icon, label, isLogout }, index) => (
              <li key={index}>
                <NavLink
                  to={to}
                  onClick={isLogout ? handleLogout : undefined}
                  className={`radius-10 group relative text-grayCustom flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white duration-300 ease-in-out dark:hover:bg-meta-4 
                    ${isActive(to) ? 'bg-blueshade text-white dark:bg-meta-4 rounded-[10px]' : ''}`}
                >
                  {icon}
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SchoolSidebar;
