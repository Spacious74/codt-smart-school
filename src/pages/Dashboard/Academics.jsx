import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, Grid, Paper, Card, CardContent, Tabs, Tab } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { fetchData } from '../../src/Service/apiService'; // Ensure this is the correct path for your API service
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom"; // for navigation

ChartJS.register(ArcElement, Tooltip, Legend);

import { School, Person, LiveTv, AttachMoney, Receipt, Report, Campaign, Laptop, Search, Public } from "@mui/icons-material";

const data = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="M16.613 16.085C13.98 17.568 12.477 20.64 12 21.5V8c.415-.746 1.602-2.884 3.632-4.336c.855-.612 1.282-.918 1.825-.64c.543.28.543.896.543 2.127v8.84c0 .666 0 .999-.137 1.232c-.136.234-.508.443-1.25.862" /><path d="M12 7.806c-.687-.722-2.678-2.436-6.02-3.036c-1.692-.305-2.538-.457-3.26.126C2 5.48 2 6.426 2 8.321v6.809c0 1.732 0 2.598.463 3.139c.462.54 1.48.724 3.518 1.09c1.815.326 3.232.847 4.258 1.37c1.01.514 1.514.771 1.761.771s.752-.257 1.76-.771c1.027-.523 2.444-1.044 4.26-1.37c2.036-.366 3.055-.55 3.517-1.09c.463-.541.463-1.407.463-3.14V8.322c0-1.894 0-2.841-.72-3.425C20.557 4.313 19 4.77 18 5.5" /></g></svg>,
    label: "Exams",
    route: "/app/academics/exams/examdetail",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="M15 2.5V4c0 1.414 0 2.121.44 2.56C15.878 7 16.585 7 18 7h1.5" /><path d="M4 16V8c0-2.828 0-4.243.879-5.121C5.757 2 7.172 2 10 2h4.172c.408 0 .613 0 .797.076c.183.076.328.22.617.51l3.828 3.828c.29.29.434.434.51.618c.076.183.076.388.076.796V16c0 2.828 0 4.243-.879 5.121C18.243 22 16.828 22 14 22h-4c-2.828 0-4.243 0-5.121-.879C4 20.243 4 18.828 4 16m4-5h8m-8 3h8m-8 3h4.17" /></g></svg>,
    label: "Assignments",
    route: "/app/academics/assignment",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="M21 11v-1c0-3.771 0-5.657-1.24-6.828C18.519 2 16.522 2 12.53 2h-1.06C7.479 2 5.482 2 4.24 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.24 6.828C5.481 22 7.478 22 11.47 22H12M8 7h8m-8 5h5" /><path d="M21 20.647V17c0-1.43-1.343-3-3-3s-3 1.57-3 3v3.5c0 .78.733 1.5 1.636 1.5c.904 0 1.637-.72 1.637-1.5v-2.735" /></g></svg>,
    label: "Syllabus",
    route: "/app/academics/syllabus",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="M8.5 15.5h7m-7-5H12M10.5 3q-.337.016-.67.037c-4.184.279-7.516 3.664-7.79 7.914a20 20 0 0 0 0 2.525c.1 1.548.783 2.98 1.588 4.19c.467.848.159 1.906-.328 2.83c-.35.665-.526.998-.385 1.239c.14.24.455.248 1.084.263c1.245.03 2.084-.323 2.75-.815c.377-.279.566-.418.696-.434s.387.09.899.3c.46.19.995.308 1.485.34c1.425.095 2.914.096 4.342 0c4.183-.278 7.515-3.663 7.789-7.913a20 20 0 0 0 0-2.525q-.032-.484-.114-.951M17.5 5h.009" /><path d="M21.795 4.59c.137.183.205.275.205.41s-.068.227-.205.41C21.18 6.23 19.61 8 17.5 8s-3.68-1.77-4.295-2.59C13.068 5.226 13 5.134 13 5s.068-.227.205-.41C13.82 3.77 15.39 2 17.5 2s3.68 1.77 4.295 2.59" /></g></svg>,
    label: "Review By Teacher",
    route: "/app/academics/review",
  }
];

const Academics = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState('');
  const [totalDays, setTotalDays] = useState(0); // Total days in the period
  const [presentDays, setPresentDays] = useState(0); // Number of present days

  const storedStud = localStorage.getItem('stud');

  // Fetch the user info from localStorage
  useEffect(() => {
    if (storedStud) {
      const stud = JSON.parse(storedStud);
      const { user_id } = stud.data;
      setUid(user_id);
    } else {
      console.log("No user data found in localStorage.");
    }
  }, [storedStud]);

  // Function to fetch attendance data
  const fetchAttendanceData = async () => {
    try {
      // Update query to filter by role 'student' and attendance status 'present'
      // Get the current year
      // Get the current year
      const currentYear = new Date().getFullYear();

      // Construct the start and end date-time for the query
      const startDate = `${currentYear}-03-01 00:00:00`;
      const endDate = `${currentYear + 1}-03-01 00:00:00`;

      // Construct the query
      const query = `SELECT * FROM attendance_table 
               WHERE uid = ${uid} 
               AND role = "student" 
               AND attendance = "present" 
               AND created_at BETWEEN '${startDate}' AND '${endDate}';`;

      const { data, error: fetchError } = await fetchData(query);

      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError(fetchError);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setAttendanceData(data);

        // Calculate present days and total days from the fetched data
        const present = data.length; // Since the query already filters for present attendance
        const total = 313; // Total number of "present" days will be equal to length of filtered data

        setPresentDays(present);
        setTotalDays(total);
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

  // Attendance chart data
  const attendanceChartData = {
    datasets: [
      {
        data: [presentDays, totalDays - presentDays],
        backgroundColor: ['#41b8d5', '#6ce5e8'],
        cutout: '70%',
      },
    ],
  };

  // If loading, show a loading message
  if (loading) {
    return <Typography>Loading attendance data...</Typography>;
  }

  // If there's an error, show the error message
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <>
      <Grid container p={2} spacing={2} sx={{alignItems : 'start'}}>

      <Grid xs={12} md={4} sx={{ ml: 3 }} >
          <Paper elevation={0} sx={{ padding: 2,border:"solid 1px #cecece", borderRadius:'12px' }}>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={1}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Box textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography variant="h6" fontWeight="bold">Attendance</Typography>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0}%
                    </Typography>
                    <Typography variant='body2'>
                      Present : <strong>{presentDays}</strong> / <strong>{totalDays}</strong> days
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{ width: { xs: 100, md: 100 }, height: { xs: 100, md: 100 } }}>
                      <Doughnut data={attendanceChartData} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>


        {data.map((item, idx) => {
          const backgroundColors = ["crimson", "#3d8cf2", "#16C47F", "#FF9D23"];
          const backgroundColor = backgroundColors[idx % backgroundColors.length]; // Cycles through the colors
          return (
            <Grid xs={4} sm={2.5} md={3} lg={1.5} key={idx} sx={{pl:2}} >
              <Link to={item.route}  >
                <Box
                  sx={{
                    border: 'solid 1px #cecece',
                    color: backgroundColor,
                    borderRadius: "8px",
                    padding: "16px",
                    textAlign: "center",
                    width: { xs: "80%", lg: "100%" },
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    '&:hover': {
                      border:"solid 2px " + backgroundColor,
                    },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="body2" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </Link>
            </Grid>
          )
        })}

        

      </Grid>
    </>
  );
};

export default Academics;
