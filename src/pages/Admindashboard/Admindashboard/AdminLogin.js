import React, { useState } from 'react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

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

            if (result.success) {
                setMessage('Login successful!');
                // You can redirect or store authentication tokens here
                // Example: localStorage.setItem('admin_token', result.token);
            } else {
                setMessage(result.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred while connecting to the server.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}
        </div>
    );
};

export default AdminLogin;
