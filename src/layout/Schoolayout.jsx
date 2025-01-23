import React, { useState, useEffect } from "react";
import Header from "../components/Header/index";
import TeacherSidebar from "../components/SchoolSide/index"; // Fixed the spelling of 'Teacher'
import { useNavigate } from "react-router-dom";
const SchoolLayout = ({ children }) => {


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const email = sessionStorage.getItem("schoolEmail"); // Retrieve email from sessionStorage
    if (!email) {
      navigate("/auth/schoolLogin");
    } else {
      console.log(email);
    }
  }, []);


  
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark" >
      <div className="flex h-screen overflow-hidden">

        <TeacherSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />


        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden" style={{scrollBehavior: "smooth"}}>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div style={{ backgroundColor: '#f9f9f9' }} className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>

        
      </div>

    </div>
  );
};

export default SchoolLayout;
