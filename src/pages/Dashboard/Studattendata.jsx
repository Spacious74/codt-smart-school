import React, { useEffect, useState } from 'react';
import { fetchData } from '../../src/Service/apiService';

const Studattendata = () => {
    const [attendanceData, setAttendanceData] = useState(null);  
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(25); 
    const [filteredData, setFilteredData] = useState(null);  // To hold filtered data
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const storedStud = localStorage.getItem('stud');
    const [uid, setUid] = useState('');
    const [schoolCode, setSchoolCode] = useState('');

    useEffect(() => {
        if (storedStud) {
            const stud = JSON.parse(storedStud);
            const { user_id, schoolcode } = stud.data;
            setUid(user_id);
            setSchoolCode(schoolcode);
        } else {
            console.log("No user data found in localStorage.");
        }
    }, [storedStud]);

    const fetchAttendanceData = async () => {
        try {
            const query = `SELECT * FROM attendance_table WHERE uid = ${uid};`;
            const { data, error: fetchError } = await fetchData(query);

            if (fetchError) {
                console.error('Error fetching data:', fetchError);
                setError(fetchError);
                setLoading(false);
                return;
            }

            if (data && data.length > 0) {
                setAttendanceData(data);
                setFilteredData(data); // Initially set filtered data to all fetched data
            } else {
                setError('No attendance data found');
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (uid) {
            fetchAttendanceData();
        }
    }, [uid]);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDateFilter = () => {
        if (startDate && endDate) {
            const filtered = attendanceData.filter((item) => {
                const date = new Date(item.created_at);
                return date >= new Date(startDate) && date <= new Date(endDate);
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(attendanceData);  // Show all if no filter
        }
    };

    const pageNumbers = [];
    if (filteredData) {
        for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Attendance History</h1>
            
            {/* Date Filter */}
            <div style={filterStyle}>
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    style={inputStyle} 
                />
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    style={inputStyle} 
                />
                <button onClick={handleDateFilter} style={buttonStyle}>Filter</button>
            </div>

            {filteredData ? (
                <table style={tableStyle}>
                    <thead style={theadStyle} >
                        <tr   >
                        <th style={{ textAlign: 'center' }}>Attendance</th>

                        <th style={{ textAlign: 'center' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody style={tbodyStyle}>
                        {currentRows?.map((attendance) => (
                            <tr key={attendance.id} style={rowStyle}>
                                <td>{attendance.attendance}</td>
                                <td>{attendance.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No attendance data available.</div>
            )}

            <div style={paginationStyle}>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        style={buttonStyle}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

const containerStyle = {
    padding: '20px',
    backgroundColor: '#f4f4f9',
};

const headerStyle = {
    textAlign: 'center',
    color: '#503dff',
    marginBottom: '20px',
    fontSize: '28px', // Increased font size
    fontWeight: 'bold',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding:'20px'
};

const theadStyle = {
    backgroundColor: '#503dff',
    color: 'white',
    textAlign: 'left',
    padding: '25px', // Increased padding for better alignment
    fontSize: '18px', // Increased font size
};

const tbodyStyle = {
    backgroundColor: 'white',
    color: 'black',
};

const rowStyle = {
    borderBottom: '1px solid #ddd',
    padding: '12px', // Increased padding for better look
    textAlign: 'center',
};

const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
};

const buttonStyle = {
    backgroundColor: '#503dff',
    color: 'white',
    border: 'none',
    padding: '12px 18px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
};

const filterStyle = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
};

const inputStyle = {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
};

export default Studattendata;
