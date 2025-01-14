import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signupimg from '../../images/signupimg.png';
import logo from '../../assets/logo.png';

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/login.php', {
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

      if (data.success) {
        localStorage.setItem('stud', JSON.stringify(data));
        sessionStorage.setItem('userEmail', username);
        navigate('/app/home');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while logging in. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl rounded-lg bg-white shadow-lg flex">
        <div className="hidden xl:flex xl:w-1/2 items-center justify-center bg-indigo-100 p-10">
          <div className="text-center">
            <Link to="/" className="text-center">
              <img src={logo} alt="Logo" className="w-40" />
            </Link>
            <p className="mb-6 text-gray-600 mt-2">
              We create Smart Schools with our Technology
            </p>
            <img
              src={signupimg}
              alt="Signup Illustration"
              className="mx-auto w-72"
            />
          </div>
        </div>

        <div className="w-full xl:w-1/2 p-8 sm:p-12">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            Student Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link to="/auth/role" className="text-indigo-600 hover:underline">
                Sign Up
              </Link>
            </p>
            {/* <p className="text-sm text-gray-600 mt-4">
              <Link to="/forgot-password" className="text-indigo-600 hover:underline">
                Forgot your password?
              </Link>
            </p> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
