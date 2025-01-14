import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Container, Grid } from '@mui/material';
import Studattendata from './Studattendata';



const AttendanceForm = () => {

    const [uid, setUid] = useState('');
    const [attendance, setAttendance] = useState('present');  // Default attendance is "present"
    const [schoolCode, setSchoolCode] = useState('');
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('student');  // Default role is "student"

    // Step 1: Retrieve the object from localStorage
    const storedStud = localStorage.getItem('stud');


    

    // Step 2: Parse the JSON string into an object if it exists and set default values for the form
    useEffect(() => {
        if (storedStud) {
            const stud = JSON.parse(storedStud);
            // Extract user_id and schoolcode from stud.data
            const { user_id, schoolcode } = stud.data;
            setUid(user_id); // Set the UID state with the user_id from localStorage
            setSchoolCode(schoolcode); // Set the schoolCode state with schoolcode from localStorage
        } else {
            console.log("No user data found in localStorage.");
        }
    }, [storedStud]); // Empty dependency array ensures this runs once on mount

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare data to send to the API
        const data = {
            uid: uid,
            attendance: attendance,
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
                {/* <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: 'black' }}>
                    Mark Attendance
                </Typography> */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        {/* UID Field */}
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

                        {/* School Code Field */}
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

                        {/* Role Field (Hidden by Default) */}
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

                {/* Optional message display */}
                {message && (
                    <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center', color: message.includes('Error') ? 'red' : 'green' }}>
                        {message}
                    </Typography>
                )}
            </Box>
            <Studattendata />
        </Container>
    );
};

export default AttendanceForm;
