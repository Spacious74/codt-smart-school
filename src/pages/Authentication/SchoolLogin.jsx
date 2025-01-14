import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signupimg from '../../images/signupimg.png';

import logo from '../../assets/logo.png';



const SchoolLogin = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://codtsmartschool.strangeweb.in/schoolapi/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem('schoolEmail', email);
        navigate('/school/home');
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">


      <div className="w-full max-w-4xl rounded-lg bg-white flex">


        <div className="hidden xl:flex xl:w-1/2 items-center justify-center p-10">
          <div className="text-center" >

            <Link to="/" className="fx_center" >
            <img src={logo} alt="Logo" className="w-40" />
            </Link>

            <p className="mb-6 text-gray-600 mt-2">
              We create Smart Schools with our Technology
            </p>

            <img
              src={signupimg}
              alt="Signup Illustration"
              className="mx-auto w-90 mt-10"
            />


          </div>
        </div>

        <div className="w-full xl:w-1/2 p-10 sm:p-15">
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
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
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 ">
            <p className="text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link to="/auth/role" className="text-indigo-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>


      </div>
      <ToastContainer />
    </div>
  );
};

export default SchoolLogin;
