import { Box, Button, Typography, Grid, Divider } from '@mui/material';
import Allstudents from './AllStudents.jsx';

const Studentsdata = () => {
  const classes = ['Class 12', 'Class 11', 'Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6', 'Class 5'];

  return (
    <>
      <Box textAlign="start">

        <Typography variant="h5" color="black" mb={4}>
          Manage Students
        </Typography>


        <Grid container spacing={2} justifyContent="start" sx={{ mb: 2 }}>
          {classes.map((className) => (
            <Grid item key={className}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: '8px',
                  px: 3,
                  py: 1,
                  fontSize: '0.85rem',
                }}
              >
                {className}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ height: 1, backgroundColor: '#c9c9c9', my: 3 }} />
        
      </Box>

      <Allstudents />
    </>
  );
};

export default Studentsdata;
