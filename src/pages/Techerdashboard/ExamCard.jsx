import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const ExamCard = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const teacherEmail = sessionStorage.getItem('teacherEmail');
        console.log('Teacher Email:', teacherEmail);
        const response = await fetch(`https://codtsmartschool.strangeweb.in/teacherapi/examdatatecaher.php?teacher_email=${teacherEmail}`);
        const result = await response.json();

        if (result.success) {
          setExams(result.data); // Correctly set exams from the response
        } else {
          console.error('Error fetching exams:', result.message);
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header Section */}
      <Link to="/teacher/academics/exam/create">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button variant="contained" sx={{ mr: 2 }}>
            <AddIcon fontSize="large" />
          </Button>
          <Typography variant="h5">Post New Exam</Typography>
        </Box>
      </Link>

      {/* Exam List Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>Exams posted by you</Typography>
      <Paper elevation={2} sx={{ padding: 2, mb: 2 }}>
        {exams?.length > 0 ? (
          exams.map((exam) => (
            <AssignmentItem key={exam.id} exam={exam} />
          ))
        ) : (
          <Typography>No exams posted yet.</Typography>
        )}
      </Paper>
    </Box>
  );
};

const AssignmentItem = ({ exam }) => {
  const handleDownload = (file) => {
    const fileUrl = `https://codtsmartschool.strangeweb.in/teacherapi/${file}`;
    
    // Open the file in a new tab
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = "_blank";  // This ensures the file opens in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
      {/* Subject and Assignment Info */}
      <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h6">Exam Series</Typography>
        <Typography variant="body1" fontSize="14px" color="#503dff">
          <a href="#" style={{ color: '#503dff', textDecoration: 'none' }}>{exam.title}</a>
        </Typography>
        <Typography variant="body1" fontSize="12px" mt={2}>Posted by</Typography>
        <Typography variant="body1" fontSize="14px" color="#503dff">
          <a href="#" style={{ color: '#503dff', textDecoration: 'none' }}>{exam.teacheremail}</a>
        </Typography>
      </Grid>

      {/* Exam Title */}
      <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="body1">{exam.subject}</Typography>
      </Grid>

      {/* Dates */}
      <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Grid>
          <Typography>Start Date -</Typography>
          <span style={{ color: '#503dff', fontSize: 'small' }}>
            {new Date(exam.exam_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </Grid>
        <Grid>
          <Typography>End Date - </Typography>
          <span style={{ color: '#503dff', fontSize: 'small' }}>
            {new Date(exam.exam_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Grid item xs={12} md={2} sx={{ textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* View Timetable Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#503dff',
            color: 'white',
            fontSize: '0.75rem',
            padding: '6px 12px',
            '&:hover': { backgroundColor: '#3b30cc' }
          }}
          onClick={() => handleDownload(exam.timetable_path)} // Trigger file download
        >
          View TIME TABLE
        </Button>
        {/* Exam Instructions Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#503dff',
            color: 'white',
            fontSize: '0.75rem',
            padding: '6px 12px',
            '&:hover': { backgroundColor: '#3b30cc' }
          }}
        >
          Exam Instructions
        </Button>
      </Grid>

      {/* Edit Button */}
      <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#eb6a18',
            color: 'white',
            fontSize: '0.85rem',
            padding: '6px 12px',
            '&:hover': { backgroundColor: '#d25e15' }
          }}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ExamCard;
