import React, { useEffect, useState } from 'react';
import { fetchData } from '../Service/apiService'; // Adjust the path as necessary

const DataFetcher = () => {
    
    const [data, setData] = useState([]);
    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDataAsync = async () => {
            const { data: fetchedData, error: fetchError } = await fetchData('SELECT * FROM students'); // Replace with your actual SQL query
            if (fetchedData) {
                setData(fetchedData);
                countStatuses(fetchedData); // Count active and inactive statuses
            } else {
                setError(fetchError);
            }
            setLoading(false);
        };

        fetchDataAsync();
    }, []);

    const countStatuses = (students) => {
        let active = 0;
        let inactive = 0;

        students.forEach((student) => {
            if (student.status.toLowerCase() === 'active') {
                active++;
            } else if (student.status.toLowerCase() === 'inactive') {
                inactive++;
            }
        });

        setActiveCount(active);
        setInactiveCount(inactive);
    };

    const filteredData = data.filter((item) =>
        `${item.first_name} ${item.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.grade.toString().includes(searchTerm)
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Student Data</h1>
            <h2>Active Users: {activeCount}</h2>
            <h2>Inactive Users: {inactiveCount}</h2>

            <input
                type="text"
                placeholder="Search by name or grade"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <ul>
                {filteredData.map((item) => (
                    <li key={item.id}>
                        ID: {item.id}, Name: {item.first_name} {item.last_name}, Status: {item.status}
                        <br />
                        Phone: {item.phone_number}, Email: {item.email}, School: {item.school_name}, Grade: {item.grade}
                        <br />
                        Address: {item.address}, City: {item.city}, State: {item.state}, Pin: {item.pin_code}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataFetcher;
