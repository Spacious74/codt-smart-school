import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box } from '@mui/material';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const teacherEmail = sessionStorage.getItem('userEmail'); // Retrieve teacher's email from session storage

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`https://codtsmartschool.strangeweb.in/teacherapi/examdatatecaher.php?teacher_email=${teacherEmail}`);
        const data = await response.json();

        if (data.success) {
          setExams(data.data); // Assuming the API returns an object with 'data' as an array of exams
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    if (teacherEmail) {
      fetchExams();
    }
  }, [teacherEmail]);

  return (
    <Card variant="outlined" sx={{ borderColor: '#6a67ce', marginTop: '2rem' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Exams posted by you
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Subject</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam, index) => (
                <TableRow key={index}>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#6a67ce',
                        color: '#fff',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#5a57be'
                        }
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Box textAlign="center" p={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#6a67ce',
            color: '#fff',
            borderRadius: '8px',
            px: 4,
            '&:hover': {
              backgroundColor: '#5a57be'
            }
          }}
        >
          See All
        </Button>
      </Box>
    </Card>
  );
};

export default ExamList;
