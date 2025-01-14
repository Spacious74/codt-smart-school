// UserStatus.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../Service/apiService'; // Adjust the path as necessary

const UserStatus = () => {
    const [activeUsers, setActiveUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: allUsers, error } = await fetchData(`SELECT * FROM students Where schoolcode=${"KD87"}`); // Fetch all users
            if (allUsers) {
                // Separate users into active and inactive
                const active = allUsers.filter(user => user.status === 'active');
                const inactive = allUsers.filter(user => user.status === 'inactive');

                setActiveUsers(active);
                setInactiveUsers(inactive);
            } else {
                setError(error);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>User Status</h1>

            <div>
                <h2>Active Users ({activeUsers.length})</h2>
                <ul>
                    {activeUsers.map((user, index) => (
                        <li key={index}>{JSON.stringify(user)}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Inactive Users ({inactiveUsers.length})</h2>
                <ul>
                    {inactiveUsers.map((user, index) => (
                        <li key={index}>{JSON.stringify(user)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserStatus;
