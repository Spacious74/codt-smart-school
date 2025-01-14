import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

const examData = [
  {
    subject: 'Exam Series',
    title: 'Unit Test',
    startDate: '24 March 2024',
    endDate: '24 March 2024',
    postedBy: 'Nipa Singh'
  },
  {
    subject: 'Science',
    title: 'Chemical Bonds and Reactions',
    startDate: '24 March 2024',
    endDate: '24 March 2024',
    postedBy: 'Nipa Singh'
  }
];

const ExamCard = () => {
  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Upcoming Exams
      </Typography>
      {examData.map((exam, index) => (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          key={index}
          sx={{
            borderBottom: '1px solid #eee',
            paddingBottom: 2,
            marginBottom: 2
          }}
        >
          <Grid item xs={4}>
            <Typography variant="h6">{exam.subject}</Typography>
            <Typography variant="body2">{exam.title}</Typography>
            <Typography variant="caption" color="textSecondary">
              Posted by{' '}
              <a href="#" style={{ color: '#2f58cd' }}>
                {exam.postedBy}
              </a>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              Start Date -{' '}
              <span style={{ color: '#2f58cd' }}>{exam.startDate}</span>
            </Typography>
            <Typography variant="body2">
              End Date -{' '}
              <span style={{ color: '#2f58cd' }}>{exam.endDate}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2f58cd',
                color: '#fff',
                marginRight: 2,
                '&:hover': { backgroundColor: '#3e71f7' }
              }}
            >
              View Time Table
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2f58cd',
                color: '#fff',
                '&:hover': { backgroundColor: '#3e71f7' }
              }}
            >
              Exam Instructions
            </Button>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ExamCard;
