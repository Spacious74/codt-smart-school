import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchData } from '../../src/Service/apiService';

// TeacherCard component to display individual teacher information
const TeacherCard = ({ teacherId, name, image, route }) => {
  return (
    <Link to={route}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #503dff',
          borderRadius: '8px',
          padding: '8px',
          mb: 2,
          width: '100%',
        }}
      >
        <Avatar src={image} sx={{ width: 56, height: 56, mr: 2 }} />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {name}
        </Typography>
      </Box>
    </Link>
  );
};

// Main ReviewsList component
const ReviewsList = () => {
  const [teachers, setTeachers] = useState([]); // State to hold teachers data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [uid, setUid] = useState(''); // User ID state
  const [schoolCode, setSchoolCode] = useState(''); // School code state

  // Fetch teachers and reviews data from API
  const fetchTeachersData = async () => {
    try {
      const query = `SELECT * FROM reviews WHERE sid = ${uid};`;
      const { data, error: fetchError } = await fetchData(query);

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      if (data) {
        setTeachers(data); // Store fetched teachers in the state
      } else {
        setError('No data found');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve user data from localStorage and set state for uid and schoolCode
  useEffect(() => {
    const storedStud = localStorage.getItem('stud');
    if (storedStud) {
      const stud = JSON.parse(storedStud);
      const { user_id, schoolcode } = stud.data;
      setUid(user_id);
      setSchoolCode(schoolcode);
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  // Fetch teachers data when uid is available
  useEffect(() => {
    if (uid) {
      fetchTeachersData();
    }
  }, [uid]); // Only fetch data when `uid` changes

  // Loading and error handling
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        What teachers think about you
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1rem' },
            color: '#503dff',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Filter
        </Typography>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderColor: '#503dff',
            color: '#503dff',
            '&:hover': {
              backgroundColor: '#f2f2ff',
            },
          }}
        >
          All
        </Button>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1rem' },
            color: '#503dff',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Subjects
        </Typography>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderColor: '#503dff',
            color: '#503dff',
            '&:hover': {
              backgroundColor: '#f2f2ff',
            },
          }}
        >
          All
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textAlign: { xs: 'center', md: 'left' },
            color: '#503dff',
          }}
        >
          Teachers
        </Typography>
        <Grid container spacing={2}>
          {teachers.map((teacher) => (
            <Grid item xs={6} sm={4} md={3} key={teacher.id}>
              <TeacherCard
                teacherId={teacher.id}
                name={teacher.teachername}
                image="https://via.placeholder.com/56"
                route={`/app/academics/review/${teacher.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ReviewsList;
