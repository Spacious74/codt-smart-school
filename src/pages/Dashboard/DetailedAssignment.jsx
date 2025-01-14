import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Paper, Box, Button, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const DetailedAssignment = () => {
  const location = useLocation();
  const assignmentId = location.state?.id || null;  // Fetch assignmentId from Link
  
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`https://codtsmartschool.strangeweb.in/studentapi/deatiledassignment.php?id=${assignmentId}`);
        
        if (!response.ok) {
          throw new Error('Assignment not found');
        }

        const data = await response.json();
        setAssignment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchAssignment();
    }
  }, [assignmentId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  if (!assignment) return null; // If assignment is null, don't render anything

  return (
    <Container component={Paper} elevation={3} sx={{ padding: 4, mt: 3 }}>
        <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#503dff' }}>
                {assignment.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Created on: {assignment.created_at}
            </Typography>
            <Divider />
        </Box>

        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                Subject: <span style={{ fontWeight: 'normal' }}>{assignment.subject}</span>
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                Total Marks: <span style={{ fontWeight: 'normal' }}>{assignment.total_marks}</span>
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                Submission Date: <span style={{ fontWeight: 'normal' }}>{assignment.submission_date}</span>
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                Applicable Class: <span style={{ fontWeight: 'normal' }}>{assignment.applicable_class}</span>
            </Typography>
        </Box>

        <Box mt={2} mb={3}>
            <Typography variant="h6" gutterBottom sx={{ color: '#503dff' }}>
                Questions
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7 }}>
                {assignment.questions || 'No questions provided'}
            </Typography>
        </Box>

        {assignment.notes && (
            <Box mt={2} mb={3}>
                <Typography variant="h6" gutterBottom sx={{ color: '#503dff' }}>
                    Notes
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7 }}>
                    {assignment.notes}
                </Typography>
            </Box>
        )}

        <Box mt={3} textAlign="right">
           <Link to='/app/assignment/submit'>
           <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#503dff', color: 'white', borderRadius: '20px', px: 4 }}
            >
                Submit
            </Button></Link>
        </Box>
    </Container>
);
};

export default DetailedAssignment;
