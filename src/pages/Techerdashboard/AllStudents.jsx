import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const TeacherReview = ({ name, image, studentId }) => {
  const handleClick = () => {
    // Save the studentId to localStorage
    localStorage.setItem('sid', studentId);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        mb: 2,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: '12px' },
        }}
      >
        <Avatar src={image} sx={{ width: 56, height: 56, mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }} />
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
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '0.875rem', md: '1rem' },
              mb: { xs: 1, sm: 0 },
            }}
          >
            {name}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ width: { xs: '100%', sm: 'auto' }, px: 2, pb: 2 }}>
        <Link component={RouterLink} to={`/teacher/managestud/${studentId}`} style={{ width: '100%' }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#503dff',
              color: 'white',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#4030cc',
              },
            }}
            onClick={handleClick} // Attach the click handler
          >
            Manage
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const email = sessionStorage.getItem('teacherEmail');
      if (!email) {
        console.error('No email found in session storage.');
        return;
      }

      try {
        const response = await axios.get(`https://codtsmartschool.strangeweb.in/teacherapi/allstudents.php?email=${email}`);
        if (response.data.success) {
          setStudents(response.data.data);
        } else {
          console.error('Error fetching students:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);
  console.log("students " , students)

  return (
 <Box>

  {/* Grid container for reviews */}
  <Grid container direction="column">
    {students.map((student) => (
      <Grid item key={student.id}>
        <TeacherReview
          name={`${student.first_name} ${student.last_name}`}
          image={student.image || ''} // Use placeholder if no image
          studentId={student.id} // Pass student ID to the component
        />
      </Grid>
    ))}
  </Grid>

  {/* Button to see all reviews */}
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#503dff',
      color: '#fff',
      borderRadius: '8px',
      textTransform: 'none',
      mt: 2,
      width: '100%',
      maxWidth: '120px',
      display: 'block',
      mx: 'auto',
      '&:hover': {
        backgroundColor: '#4030cc',
      },
    }}
  >
    See All
  </Button>
</Box>

  );
};

export default AllStudents;
