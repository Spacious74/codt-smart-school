import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Container, Grid } from '@mui/material';
import Teacherdata from './Teacherdata';

const AttendanceForm = () => {

    const [uid, setUid] = useState('');  // To store user ID
    const [attendance, setAttendance] = useState('present');  // Set default attendance as "present"
    const [schoolCode, setSchoolCode] = useState('');  // To store school code
    const [message, setMessage] = useState('');  // To display success/error messages
    const [role, setRole] = useState('teacher');  // Default role is "teacher"


    // Step 1: Retrieve the object from localStorage
    const storedTeacherData = localStorage.getItem('teacherData');

    // Step 2: Parse the JSON string into an object if it exists and set default values for the form
    useEffect(() => {
        if (storedTeacherData) {
            try {
                // Parse the data from localStorage
                const teacher = JSON.parse(storedTeacherData);
                // Directly extract id and schoolcode from the parsed object
                const { id, schoolcode } = teacher;
                setUid(id);  // Set the UID state with the id from localStorage
                setSchoolCode(schoolcode);  // Set the schoolCode state with schoolcode from localStorage
            } catch (error) {
                console.log("Error parsing teacher data:", error);
            }
        } else {
            console.log("No teacher data found in localStorage.");
        }
    }, [storedTeacherData]);  // Only run once when component mounts

    // Handle form submission
    const handleSubmit = async (event) => {
        
        event.preventDefault();

        // Prepare data to send to the API
        const data = {
            uid: uid,
            attendance: attendance,  // Attendance is always "present"
            school_code: schoolCode,
            role: role  // Include the role in the data payload
        };

        try {
            // Make POST request to your PHP API
            const response = await axios.post('https://codtsmartschool.strangeweb.in/attendance.php', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setMessage('Attendance recorded successfully!');
            } else {
                setMessage('Error: ' + response.data.message);
            }
        } catch (error) {
            setMessage('Error: Unable to record attendance.');
        }
    };

    return (
        <Container sx={{ paddingTop: 4 }}>


            <Box sx={{ bgcolor: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: 'black' }}>
                    Mark Attendance
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        {/* UID Field (Hidden) */}
                        <Grid item xs={3} sx={{ display: 'none' }}>
                            <TextField
                                label="UID"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                                required
                                sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                disabled
                            />
                        </Grid>

                        {/* Attendance Field (Hidden, Always "Present") */}
                        <Grid item xs={3} sx={{ display: 'none' }}>
                            <TextField
                                label="Attendance"
                                variant="outlined"
                                fullWidth
                                value="present"
                                sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                disabled
                            />
                        </Grid>

                        {/* School Code Field (Hidden) */}
                        <Grid item xs={3} sx={{ display: 'none' }}>
                            <TextField
                                label="School Code"
                                variant="outlined"
                                fullWidth
                                value={schoolCode}
                                onChange={(e) => setSchoolCode(e.target.value)}
                                required
                                sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                disabled
                            />
                        </Grid>

                        {/* Role Field (Hidden) */}
                        <Grid item xs={3} sx={{ display: 'none' }}>
                            <TextField
                                label="Role"
                                variant="outlined"
                                fullWidth
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={1}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#503dff',
                                        '&:hover': {
                                            backgroundColor: '#402cc0',
                                        },
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Mark
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>

                {/* Message Display (Optional) */}
                {message && (
                    <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center', color: message.includes('Error') ? 'red' : 'green' }}>
                        {message}
                    </Typography>
                )}
            </Box>


            <Teacherdata />


        </Container>
    );
};

export default AttendanceForm;
