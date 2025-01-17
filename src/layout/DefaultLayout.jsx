import React, { useState , useEffect} from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useNavigate } from 'react-router-dom'; 

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null); // Initialize data as null to hold the fetched data
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('stud');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setInfo(parsedData);
        
        // Fetch data based on the ID
        const response = await fetch(`https://codtsmartschool.strangeweb.in/studentapi/studplan.php?sid=${parsedData.data.id}`);
        const result = await response.json();
        
        if (result.length > 0) {
          const dateStr = result[0].Date; // e.g., '2024-10-27 19:34:43'
          const daysToExpire = result[0].Expiri; // e.g., 20

          // Parse the date string into a Date object
          const initialDate = new Date(dateStr);

          // Calculate the expiry date
          const expiryDate = new Date(initialDate);
          expiryDate.setDate(initialDate.getDate() + daysToExpire);

          // Log the results
          console.log('Date:', initialDate);
          console.log('Days to expire:', daysToExpire);
          console.log('Expiry Date:', expiryDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD

          // Check if the expiry date is in the past
          const currentDate = new Date();
          if (expiryDate < currentDate) {
            // Redirect to /app/pricing
            window.location.href = `https://codt.in/pricingportal.php?email=${parsedData.data.id}`;
          }
        }
      }
    };

    fetchData();
  }, [navigate]);


  return (

    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* Page Wrapper Start */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Start */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Sidebar End */}

        {/* Content Area Start */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header Start */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Header End */}

          {/* Main Content Start */}
          <main>
            <div style={{ backgroundColor: '#f9f9f9' }} className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* Main Content End */}
        </div>
        {/* Content Area End */}
      </div>
      {/* Page Wrapper End */}
    </div>
  );
};

export default DefaultLayout;
