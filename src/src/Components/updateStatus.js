import React, { useState } from 'react';
import { fetchData, updateUserStatus } from '../Service/apiService'; // Ensure the path is correct

const UpdateUserStatus = () => {
    const [userId, setUserId] = useState('');
    const [status, setStatus] = useState('active'); // Default status
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await updateUserStatus(userId, status);
            if (data.success) {
                setMessage(data.success); // Assuming 'success' is a string message
            } else {
                setMessage(data.error); // Assuming 'error' is a string message
            }
        } catch (error) {
            setMessage(error.message); // Display error message if any
        }
    };

    return (
        <div>
            <h1>Update User Status</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>
                <button type="submit">Update Status</button>
            </form>
            {message && <p>{message}</p>} {/* Display message if exists */}
        </div>
    );
};

export default UpdateUserStatus;
