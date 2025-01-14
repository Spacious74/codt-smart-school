import React, { useEffect, useState } from 'react';
import { fetchData } from '../../src/Service/apiService'; // Assuming you have this utility for fetching data

const Allattendence = () => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10); // Show 10 rows per page

    // Step 1: Fetch all attendance data when the component mounts
    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                // Your SQL query to fetch all attendance data
                const query = `SELECT * FROM attendance_table`;
                const { data, error: fetchError } = await fetchData(query);

                if (fetchError) {
                    console.error('Error fetching data:', fetchError);
                    setError(fetchError);
                    setLoading(false);
                    return;
                }

                if (data && data.length > 0) {
                    setAttendanceData(data); // Set all attendance data
                } else {
                    setError('No attendance data found');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceData(); // Fetch all attendance data when component mounts
    }, []); // Empty dependency array to only run on mount

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = attendanceData?.slice(indexOfFirstRow, indexOfLastRow);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers for pagination
    const pageNumbers = [];
    if (attendanceData) {
        for (let i = 1; i <= Math.ceil(attendanceData.length / rowsPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    // Loading and error handling
    if (loading) {
        return <div style={loadingStyle}>Loading...</div>;
    }

    if (error) {
        return <div style={errorStyle}>Error: {error}</div>;
    }

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Attendance Data</h1>

            {/* Display attendance data in a table */}
            {attendanceData && attendanceData.length > 0 ? (
                <table style={tableStyle}>
                    <thead style={theadStyle}>
                        <tr>
                            <th>ID</th>
                            <th>Attendance</th>
                            <th>School Code</th>
                            <th>Created At</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody style={tbodyStyle}>
                        {currentRows?.map((attendance) => (
                            <tr key={attendance.id} style={rowStyle}>
                                <td>{attendance.id}</td>
                                <td>{attendance.attendance}</td>
                                <td>{attendance.school_code}</td>
                                <td>{attendance.created_at}</td>
                                <td>{attendance.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No attendance data available.</div>
            )}

            {/* Pagination Buttons */}
            <div style={paginationStyle}>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        style={paginationButtonStyle}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Styles for the component
const containerStyle = {
    padding: '20px',
    backgroundColor: '#f4f4f9',
};

const headerStyle = {
    textAlign: 'center',
    color: '#503dff',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const theadStyle = {
    backgroundColor: '#503dff',
    color: 'white',
    textAlign: 'left',
    padding: '15px',
    fontSize: '18px',
};

const tbodyStyle = {
    backgroundColor: 'white',
    color: 'black',
};

const rowStyle = {
    borderBottom: '1px solid #ddd',
    padding: '12px',
    textAlign: 'center',
};

const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
};

const paginationButtonStyle = {
    backgroundColor: '#503dff',
    color: 'white',
    border: 'none',
    padding: '12px 18px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
};

paginationButtonStyle[':hover'] = {
    backgroundColor: '#3a2d99', // Darker shade on hover
};

const loadingStyle = {
    textAlign: 'center',
    fontSize: '20px',
    color: '#503dff',
};

const errorStyle = {
    textAlign: 'center',
    fontSize: '20px',
    color: 'red',
};

export default Allattendence;
