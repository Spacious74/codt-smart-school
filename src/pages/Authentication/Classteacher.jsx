import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFormdata } from '../../redux/features/formSlice';

const Classteacher = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = [
    'Class 12', 'Class 11', 'Class 10', 'Class 9', 'Class 8', 
    'Class 7', 'Class 6', 'Class 5', 'Class 4', 'Class 3', 
    'Class 2', 'Class 1', 'Kindergarten', 'Nursery', 'Pre-Nursery'
  ];
  const divisions = ['Division A', 'Division B', 'Division C', 'Division D', 'Division E', 'Division F', 'Division G'];

  const handleClassClick = (className) => {
    setSelectedClass(className);
    setSelectedDivision(''); // Reset division selection when class changes
  };

  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
  };

  const handleNext = () => {
    if (selectedClass && selectedDivision) {
      dispatch(setFormdata({ selectedClass }));
      dispatch(setFormdata({ selectedDivision }));
      navigate("/auth/teacher"); // Navigate to the next route
    }
  };

  return (
    <Box textAlign="center" p={4}>
      {/* Logo */}
      <Box mb={3} display="flex" justifyContent="center" alignItems="center">
        <Link className="mb-5.5 inline-block" to="/">
          <img className="hidden dark:block" src='../../src/assets/logo.png' alt="Logo" style={{ width: '200px' }} />
          <img className="dark:hidden" src='../../src/assets/logo.png' alt="Logo" style={{ width: '200px' }} />
        </Link>
      </Box>

      {/* Heading */}
      <Typography variant="h5" mb={4} color="textSecondary">
        Select the classes you teach
      </Typography>

      {/* Class Selection Buttons */}
      <Grid container spacing={2} justifyContent="center" mb={4}>
        {classes.map((className) => (
          <Grid item key={className}>
            <Button
              variant={selectedClass === className ? 'contained' : 'outlined'}
              onClick={() => handleClassClick(className)}
              sx={{
                borderRadius: '8px',
                px: 3,
                py: 1.5,
                fontSize: '1.2rem',
                color: selectedClass === className ? '#fff' : '#6a67ce',
                borderColor: '#6a67ce',
                backgroundColor: selectedClass === className ? '#6a67ce' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedClass === className ? '#6a67ce' : 'rgba(106, 103, 206, 0.1)',
                },
              }}
            >
              {className}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Division Selection Buttons */}
      <Grid container spacing={2} justifyContent="center">
        {divisions.map((division) => (
          <Grid item key={division}>
            <Button
              variant={selectedDivision === division ? 'contained' : 'outlined'}
              onClick={() => handleDivisionClick(division)}
              disabled={!selectedClass} // Disable until a class is selected
              sx={{
                borderRadius: '8px',
                px: 3,
                py: 1.5,
                fontSize: '1.2rem',
                color: selectedDivision === division ? '#fff' : '#6a67ce',
                borderColor: '#6a67ce',
                backgroundColor: selectedDivision === division ? '#6a67ce' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedDivision === division ? '#6a67ce' : 'rgba(106, 103, 206, 0.1)',
                },
              }}
            >
              {division}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Next Button */}
      <Box mt={4}>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!selectedClass || !selectedDivision} // Disable until both selections are made
          sx={{
            borderRadius: '8px',
            px: 3,
            py: 1.5,
            fontSize: '1.2rem',
            backgroundColor: '#6a67ce',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#5a57b6',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Classteacher;