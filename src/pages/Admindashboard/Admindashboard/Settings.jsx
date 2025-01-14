import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Settings = () => {
    const [username, setUsername] = useState('admin');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!username || !newPassword) {
            setMessage('Username and new password are required.');
            setLoading(false);
            return;
        }

        const requestData = { username, new_password: newPassword };

        try {
            const response = await fetch(
                'https://codtsmartschool.strangeweb.in/admin-forgot-passwrod.php',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData),
                }
            );

            const data = await response.json();

            if (data.success) {
                setMessage('Password updated successfully.');
                toast.success("Password updated successfully");
            } else {
                // toast.success(result.error);
                setMessage(data.message || 'An error occurred. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 ">
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mt-10 mx-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                    type="hidden"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                >
                    New Password
                </label>
                <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow-sm ${
                    loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                }`}
            >
                {loading ? 'Updating...' : 'Reset Password'}
            </button>
        </form>
        {message && (
            <p
                className={`mt-4 text-sm text-center ${
                    message.includes('successfully')
                        ? 'text-green-600'
                        : 'text-red-600'
                }`}
            >
                {message}
            </p>
        )}
    </div>
    <ToastContainer />
</div>

    );
};

export default Settings;
