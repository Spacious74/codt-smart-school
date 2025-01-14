import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside.jsx';
import { MdPerson } from 'react-icons/md';
import { FaSignOutAlt, FaUserCircle, FaCog, FaRegAddressBook } from 'react-icons/fa';
// Import Modal
import Modal from '../Models/logout.jsx';
import { fetchData } from '../../src/Service/apiService'; // Make sure this is the correct path

const DropdownUser = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [schoolLogo, setSchoolLogo] = useState(null);
  const [schoolName, setSchoolName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const schoolCode = localStorage.getItem('schoolCode'); // Get school code from localStorage

  // Fetch school data based on the schoolCode
  const fetchSchoolData = async () => {
    if (!schoolCode) return;

    try {
      // Define your query to get school data based on the school code
      const query = `SELECT * FROM schools WHERE schoolcode = '${schoolCode}'`;
      const { data, error: fetchError } = await fetchData(query);

      if (fetchError) {
        console.error('Error fetching school data:', fetchError);
        setError(fetchError);
      } else {
        if (data && data.length > 0) {
          const schoolData = data[0]; // Assuming data returns an array of schools
          setSchoolLogo(schoolData.logo); // Set the school logo
          setSchoolName(schoolData.school_name); // Set the school name
        }
      }
    } catch (err) {
      console.error('Error fetching school data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolData(); // Fetch school data when the component mounts or schoolCode changes
  }, [schoolCode]);

  const handleLogout = () => {
    setIsModalOpen(true); // Show modal when logout is clicked
  };

  const confirmLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken'); // or however you manage your auth

    // Navigate to the sign-in page
    navigate('/auth/signin');
    setIsModalOpen(false); // Close modal after logout
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Close modal if cancellation
  };

  if (loading) {
    return <div>Loading school data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">


      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2"
        to="#"
      >


        <img
          src={`https://codtsmartschool.strangeweb.in/schoolapi/uploads/${schoolLogo}`} // Dynamically load the logo
          alt="school logo" width={80} style={{ paddingRight: '10px', paddingTop: '5px' }} // Add right padding
        />



        <span className="hidden text-left">
          <span className="block text-sm font-medium text-black dark:text-white" style={{ fontSize: '12px' }}>
            {schoolName || 'School Name'}
          </span>
        </span>
      </Link>

      {/* Modal component */}
      {isModalOpen && (
        <Modal
          onClose={cancelLogout}
          onConfirm={confirmLogout}
          title="Confirm Logout"
          message="Are you sure you want to log out?"
        />
      )}

    </ClickOutside>
  );
};

export default DropdownUser;
