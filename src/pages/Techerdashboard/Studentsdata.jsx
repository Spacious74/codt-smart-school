import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import Allstudents from './AllStudents.jsx';

const Studentsdata = () => {
  const classes = ['Class 12', 'Class 11', 'Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6', 'Class 5'];

  return (
    <>
    <Box textAlign="start" p={4}>
      
      <Typography variant="h5" color="black" mb={4}>
        Manage Students
      </Typography>


      <Grid container spacing={2} justifyContent="center">
        {classes.map((className) => (
          <Grid item key={className}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: '8px',
                px: 3,
                py: 1.5,
                fontSize: '1rem',
              }}
            >
              {className}
            </Button>
          </Grid>
        ))}
      </Grid>

    </Box>
<Allstudents/>
    </>
  );
};

export default Studentsdata;
