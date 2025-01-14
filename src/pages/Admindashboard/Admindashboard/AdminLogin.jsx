import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signupimg from '../../../images/signupimg.png';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch('https://codtsmartschool.strangeweb.in/admin-login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            console.log('Result is ', result);

            if (result.success) {
                localStorage.setItem('adminId', 'admin'); // Use localStorage here
                toast.success('Login successful!', {
                    position: 'bottom-left',
                    autoClose: 3000,
                });
                navigate('/admin/home'); // Redirect to admin dashboard
            } else {
                toast.error(result.error || 'Login failed. Please try again.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error('An error occurred while connecting to the server.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <div className="flex flex-col-reverse xl:flex-row items-center justify-center min-h-screen bg-gray-50">
                {/* Left Section */}
                <div className="hidden xl:flex flex-col items-center w-full xl:w-1/2 bg-indigo-50 px-10 py-16">
                    <Link className="mb-6" to="/">
                        <img
                            src="https://codt.in/assets22/img/img1.png"
                            alt="Logo"
                            className="w-48"
                        />
                    </Link>
                    <p className="text-lg text-indigo-600 font-semibold text-center mb-10">
                        We create Smart Schools with our Technology
                    </p>
                    <img src={signupimg} alt="Signup" className="w-80 h-auto" />
                </div>

                {/* Right Section */}
                <div className="w-full xl:w-1/2 px-6 sm:px-12 lg:px-24 py-10">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                            Admin Login
                        </h2>
                        <form
                            onSubmit={handleLogin}
                            className="bg-white shadow-md rounded-lg px-8 py-10"
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    UserName
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
