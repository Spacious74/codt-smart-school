import React, { useState } from 'react';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Check if username and new password are provided
        if (!username || !newPassword) {
            setMessage('Username and new password are required.');
            setLoading(false);
            return;
        }

        // Prepare the request body
        const requestData = {
            username,
            new_password: newPassword
        };

        try {
            // Send POST request to PHP API
            const response = await fetch('https://codtsmartschool.strangeweb.in/admin-forgot-passwrod.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('Password updated successfully.');
            } else {
                setMessage(data.message || 'An error occurred. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div>
                    <label htmlFor="new-password">New Password</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Reset Password'}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
