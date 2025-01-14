import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FaClipboardList, FaTasks, FaPencilAlt, FaQuestionCircle } from 'react-icons/fa';
import Examlist from './Examlist';
import AssignmentList from './Assignmentlist';

const Dashboard = () => {
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('userEmail');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setInfo(parsedData);

        // Log the data after setting it
        console.log('ID:', parsedData.data.id);
        console.log('Data:', parsedData.data);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        navigate('/auth/teacherlogin'); // Redirect if parsing fails
      }
    } else {
      navigate('/auth/teacherlogin');
    }
  }, [navigate]);

  // Quick Action Button Data
  const quickActions = [
    { title: 'Topic Record', icon: <FaClipboardList />, path: '/topic-record' },
    { title: 'Post new Assignment', icon: <FaPencilAlt />, path: '/teacher/addassignment' },
    { title: 'Manage Exams', icon: <FaTasks />, path: '/teacher/addexam' },
  ];

  // Manage Section Data
  const manageItems = [
    { title: 'Assignments' },
    { title: 'Exams' },
    { title: 'Syllabus Status' }
  ];

  return (
    <Box p={4}>
      {/* Quick Actions */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Quick Actions
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <Link to={action.path} style={{ textDecoration: 'none' }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  height: '70px',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  color: '#503dff',
                }}
                startIcon={action.icon}
              >
                {action.title}
              </Button>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Manage Section */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Manage
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {manageItems.map((item, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: '8px',
                color: 'black',
                borderColor: '#6a67ce',
                height: '60px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(106, 103, 206, 0.1)',
                },
              }}
            >
              {item.title}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Quick View */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Quick View
      </Typography>
      <AssignmentList />
      <Examlist />

      <Paper elevation={3} sx={{ padding: '20px', marginTop: '30px' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Exam Performance
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3].map((item, index) => (
            <Grid
              container
              key={index}
              sx={{
                borderBottom: '1px solid black',
                padding: { xs: '10px 20px', sm: '10px 40px' },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <Grid item xs={12} sm={8} textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography>Unit {item} Test Series</Typography>
              </Grid>
              <Grid item xs={12} sm={4} textAlign="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#503dff',
                    color: 'white',
                    textTransform: 'none',
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>

        {/* See More Button */}
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#503dff',
              color: 'white',
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            See More
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
