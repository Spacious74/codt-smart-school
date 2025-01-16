import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from '../../src/Service/apiService';
import { Box, Card, CardContent, CardActions, Avatar, Button, Typography, Grid, Divider } from '@mui/material';

function MarkAttendanceTeacher() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const myschoolCode = localStorage.getItem("schoolCode");
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        const fetchDataAsync = async () => {
            const { data: fetchedData, error: fetchError } = await fetchData(`SELECT * FROM students where schoolcode="${myschoolCode}" `);
            if (fetchedData) {
                setData(fetchedData);
            } else {
                setError(fetchError);
            }

            setLoading(false);
        }
        fetchDataAsync();
    }, []);

    const classes = ['all', 'class 1', 'class 2', 'class 3', 'class 4', 'class 5', 'class 6', 'class 7', 'class 8'];

    return (
        <>
            <Box textAlign="start" >

                <Typography variant="h6" color="#808080" mb={3} fontWeight="bold">
                    Mark attendance of students
                </Typography>

                <Grid container spacing={2} justifyContent="start" sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                    {classes.map((className) => (
                        <Grid item key={className} xs={12} sm="auto">

                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    width: { xs: '100%', sm: 'auto' },
                                    marginBottom: { xs: '10px', sm: '0' },
                                    backgroundColor: selectedClass === className ? '#503dff' : 'transparent',
                                    color: selectedClass === className ? '#fff' : 'inherit', // Adjust text color for selected class
                                    '&:hover': {
                                        backgroundColor: selectedClass === className ? '#503dff' : '#503dff', // Set hover background color to #503DFF
                                        color: '#fff', // Ensure text color stays white when hovered
                                    },
                                }}
                                onClick={() => {
                                    setSelectedClass(className); // Set the clicked class as selected
                                    console.log('Search Term:', className);
                                }}
                            >
                                {className}
                            </Button>

                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Divider sx={{ height: 2, backgroundColor: '#c9c9c9', mt: 2, mb: 3 }} />

            <Box >
                <Grid container direction="column" spacing={2}>
                    {/* Check if filteredData has any content */}
                    {data.length > 0 ? (
                        data.map((teacherDetails, index) => (
                            <Grid item key={index}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        display: 'flex',
                                        borderColor: '#bababa',
                                        alignItems: 'center',
                                        borderRadius: '14px',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        overflow: 'hidden', // Keep rounded corners clean
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexGrow: 1,
                                            flexDirection: { xs: 'column', sm: 'row' },
                                            gap: { xs: 2, sm: '16px' }, // Increase gap for better spacing
                                            padding: '16px',
                                        }}
                                    >
                                        <Avatar
                                            src={teacherDetails.image} // Placeholder image
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                mb: { xs: 2, sm: 0 },
                                                borderRadius: '50%',
                                                border: '2px solid #838383', // Add a border around the avatar
                                                transition: 'transform 0.3s ease', // Avatar hover effect
                                                '&:hover': {
                                                    transform: 'scale(1.1)', // Avatar hover effect
                                                },
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: { xs: 'center', sm: 'flex-start' },
                                                flexDirection: 'column',
                                                flexGrow: 1,
                                                textAlign: { xs: 'center', sm: 'left' },
                                            }}
                                        >
                                            <Typography
                                                variant="h6" // Reduced font size
                                                sx={{
                                                    fontWeight: 600, textTransform: 'capitalize',
                                                    fontSize: { xs: '0.75rem', md: '1rem' }, // Reduced font size
                                                    mb: { xs: 1, sm: 0 },
                                                    color: '#333', // Darker text for better contrast
                                                }}
                                            >
                                                {teacherDetails.first_name} {teacherDetails.last_name} {/* Full name */}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                        <Button fullWidth variant="contained"
                                            sx={{
                                                backgroundColor: '#118B50',
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                width: '120px',
                                                display: 'flex', gap:'7px'
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12.5a2 2 0 0 1 2-2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3a2 2 0 0 1-2-2zm13.479-4.694l-.267.86c-.218.705-.327 1.057-.243 1.336a1 1 0 0 0 .42.547c.251.158.63.158 1.39.158h.404c2.57 0 3.855 0 4.462.76q.104.131.185.277c.467.848-.064 1.991-1.126 4.277c-.974 2.098-1.462 3.147-2.366 3.764q-.132.09-.27.17c-.952.545-2.132.545-4.492.545h-.511c-2.86 0-4.289 0-5.177-.86C7 18.779 7 17.394 7 14.624v-.974c0-1.455 0-2.183.258-2.85c.259-.666.753-1.213 1.743-2.309l4.091-4.53c.103-.114.154-.17.2-.21a1.033 1.033 0 0 1 1.442.091c.04.045.083.108.17.234c.135.196.202.294.261.392c.528.871.687 1.906.446 2.89c-.027.109-.062.222-.132.448" color="currentColor"/></svg>
                                            Present
                                        </Button>

                                        <Button fullWidth variant="contained" sx={{
                                            backgroundColor : '#FB4141',
                                            borderRadius: '8px', width: '120px',
                                            textTransform: 'none',
                                            marginRight: '16px',
                                            display: 'flex', gap:'7px'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 11.5a2 2 0 0 0 2 2a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3a2 2 0 0 0-2 2zm13.479 4.694l-.267-.86c-.218-.705-.327-1.057-.243-1.336a.98.98 0 0 1 .42-.547c.251-.158.63-.158 1.39-.158h.404c2.57 0 3.855 0 4.462-.76q.104-.131.185-.277c.467-.848-.064-1.991-1.126-4.277c-.974-2.098-1.462-3.147-2.366-3.764a4 4 0 0 0-.27-.17c-.952-.545-2.132-.545-4.492-.545h-.511c-2.86 0-4.289 0-5.177.86C7 5.222 7 6.607 7 9.377v.974c0 1.455 0 2.183.258 2.85c.259.666.753 1.213 1.743 2.309l4.091 4.53c.103.114.154.17.2.21a1.033 1.033 0 0 0 1.442-.091c.04-.045.083-.108.17-.234a9 9 0 0 0 .261-.392a3.8 3.8 0 0 0 .446-2.89a8 8 0 0 0-.132-.448" color="currentColor"/></svg>
                                            Absent
                                        </Button>

                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        // Display a message if no data is found
                        <Grid item>
                            <Typography variant="h6" color="textSecondary">
                                No students found for this class.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>

        </>
    )
}

export default MarkAttendanceTeacher
