import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, Grid, Paper, Card, CardContent, Tabs, Tab } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { fetchData } from '../../src/Service/apiService'; // Ensure this is the correct path for your API service
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom"; // for navigation

ChartJS.register(ArcElement, Tooltip, Legend);

import {
  School,
  Person,
  LiveTv,
  AttachMoney,
  Receipt,
  Report,
  Campaign,
  Laptop,
  Search,
  Public,
} from "@mui/icons-material";

const data = [
  {
    icon: <Person sx={{ fontSize: "48px", color: "blue" }} />,
    label: "Exams",
    route: "/app/academics/exams/examdetail",
  },
  {
    icon: <LiveTv sx={{ fontSize: "48px", color: "orange" }} />,
    label: "Assignments",
    route: "/app/academics/assignment",
  },
  {
    icon: <Receipt sx={{ fontSize: "48px", color: "brown" }} />,
    label: "Syllabus",
    route: "/app/academics/syllabus",
  },
  {
    icon: <Report sx={{ fontSize: "48px", color: "teal" }} />,
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
      <Grid container spacing={2} mt={4} ml={2} mb={5} display="flex">
        {data.map((item, idx) => (
          <Grid item xs={4} sm={2.5} md={3} lg={1.5} key={idx}>
            <Link to={item.route}>
              <Box
                sx={{
                  border: "2px solid #503dff",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                  width: { xs: "80%", lg: "100%" },
                  height: "120px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                {item.label}
              </Typography>
            </Link>
          </Grid>
        ))}
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={1}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Box mt={2} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography variant="h6" fontWeight="bold">
                      Attendance
                    </Typography>
                    <Typography variant="h3" color="primary" fontWeight="bold">
                      {totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0}%
                    </Typography>
                    <Typography>
                      You were present for <strong>{presentDays}</strong> out of <strong>{totalDays}</strong> days
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{ width: { xs: 100, md: 150 }, height: { xs: 100, md: 150 } }}>
                      <Doughnut data={attendanceChartData} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

     

      </Grid>
    </>
  );
};

export default Academics;
