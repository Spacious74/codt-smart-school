import React, { useEffect, useState } from 'react';
import { fetchData } from '../Service/apiService'; // Adjust the path as necessary
const [data, setData] = useState([]);
const [error, setError] = useState('');
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const GetTeachers = () => {
   

    useEffect(() => {
        const fetchDataAsync = async () => {
            const { data: fetchedData, error: fetchError } = await fetchData('SELECT * FROM teachers'); // Adjust SQL query as needed
            if (fetchedData) {
                setData(fetchedData);
            } else {
                setError(fetchError);
            }
            setLoading(false);
        };

        fetchDataAsync();
    }, []);

    const filteredData = data.filter((item) =>
        `${item.first_name} ${item.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.educational_board.toLowerCase().includes(searchTerm.toLowerCase()) // Assuming educational_board is a relevant filter
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Teachers Data</h1>

            <input
                type="text"
                placeholder="Search by name or educational board"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <ul>

                {filteredData.map((item) => (

                    <li key={item.id}>
                        ID: {item.id}, Name: {item.first_name} {item.last_name}
                        <br />
                        Phone: {item.phone_number}, Email: {item.email}, School Code: {item.schoolcode}
                        <br />
                        Address: {item.address}, City: {item.city}, State: {item.state}, Pin: {item.pin_code}
                        <br />
                        Experience: {item.experience}
                    </li>
                    
                ))}

            </ul>
        </div>
    );
};

export default GetTeachers;
export {
    data , error , loading ,searchTerm
}
