import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signupimg from '../../images/signupimg.png';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if the user is already logged in (check localStorage)
    if (sessionStorage.getItem('teacherEmail')) {
      navigate('/teacher/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/teacherapi/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data && data.success) {
        // Save teacher data in localStorage
        localStorage.setItem('teacherEmail', username);
        sessionStorage.setItem('teacherEmail', username);

        // You can also store additional data like name or userId if necessary
        localStorage.setItem('teacherData', JSON.stringify(data.data));

        navigate('/teacher/home');
        toast.success(data.message);
      } else {
        // Handle login failure
        setError(data?.message || 'Login failed. Redirecting to login page.');
        toast.error(data?.message || 'Login failed. Redirecting to login page.');
        navigate('/auth/teacherlogin');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred while logging in. Please try again later.');
      toast.error('An error occurred while logging in. Please try again later.');
      navigate('/auth/teacherlogin');
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="hidden dark:block"
                  src="https://codt.in/assets22/img/img1.png"
                  alt="Logo"
                  style={{ width: '200px' }}
                />
                <img
                  className="dark:hidden"
                  src="https://codt.in/assets22/img/img1.png"
                  alt="Logo"
                  style={{ width: '200px' }}
                />
              </Link>
              <p className="2xl:px-20">We create Smart Schools with our Technology</p>
              <img src={signupimg} style={{ height: '300px', width: '300px', marginTop: '100px' }} alt="Signup" />
            </div>
          </div>

          <div className="w-full xl:w-1/2 xl:px-24 xl:py-16">
            <div className="p-5 sm:p-12 mt-50">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm text-start font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-start text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-4 text-sm text-gray-600">
                <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700">Forgot your password?</Link>
                <Link to="/auth/role" className="text-indigo-600 hover:text-indigo-700">SignUp</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default TeacherLogin;
