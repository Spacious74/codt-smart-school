import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchData } from '../../src/Service/apiService'; // Ensure this is the correct path for your API service
import SyllabusForm from './addSlabers';  // Import the component


const Syllabus = () => {
  const [subjects, setSubjects] = useState([]);  // State to store fetched subjects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedStud = localStorage.getItem('stud');
  const [schoolCode, setSchoolCode] = useState('');

  // Get school code from localStorage
  useEffect(() => {
    if (storedStud) {
      const stud = JSON.parse(storedStud);
      const { schoolcode } = stud.data;  // Assuming `school_code` is in the `stud` data
      setSchoolCode(schoolcode);
    }
  }, [storedStud]);

  // Function to fetch syllabus subjects from the API
  const fetchSyllabus = async () => {
    if (!schoolCode) return;  // Wait until the school code is available

    try {
      // Define your query to get the syllabus data based on the school code
      const query = `SELECT id, subject FROM syllabus WHERE schoolcode = '${schoolCode}'`;
      const { data, error: fetchError } = await fetchData(query);

      if (fetchError) {
        console.error('Error fetching syllabus data:', fetchError);
        setError(fetchError);
      } else {
        setSubjects(data || []); // Store fetched subjects
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch syllabus data when the component mounts or schoolCode changes
  useEffect(() => {
    fetchSyllabus();
  }, [schoolCode]); // Trigger fetch whenever the school code changes

  if (loading) {
    return <Typography>Loading syllabus data...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <>

{/* <SyllabusForm/> */}

    <Box >
      <Typography variant="h5" gutterBottom sx={{mb:3}}>Syllabus</Typography>

      {/* Filter Section */}
      <Box display="flex" alignItems="center" gap={2} marginBottom="2rem">
        <Typography variant="body1">Filter</Typography>
        <Button variant="outlined">All</Button>
        <Typography variant="body1">Subjects</Typography>
        <Button variant="outlined">All</Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Subjects
      </Typography>

      {/* Subjects Grid */}
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={6} sm={4} md={3} key={subject.id}>
            <Link to={`/app/academics/syllabus/${subject.id}`}>
              <Button
                variant="outlined"
                sx={{
                  width: '100%',
                  height: '80px',
                  borderColor: '#4b56d2',
                  color: 'black',
                  textTransform: 'capitalize',
                  fontSize: '1.1rem',
                }}
              >
                {subject.subject} {/* Displaying subject name */}
              </Button>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default Syllabus;
