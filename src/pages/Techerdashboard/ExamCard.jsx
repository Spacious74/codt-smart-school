import { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const ExamCard = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const teacherEmail = sessionStorage.getItem('teacherEmail');
        const response =
          await fetch(`https://codtsmartschool.strangeweb.in/teacherapi/examdatatecaher.php?teacher_email=${teacherEmail}`);
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              backgroundColor: '#eb6a18',
              padding: '12px', // Adjust padding as needed
              '&:hover': { backgroundColor: '#d35e16' }, // Optional hover effect
            }}
          >
            <AddIcon fontSize="large" />
          </Button>
        </Box>
        <Typography variant="h6">Post New Exam</Typography>

      </Link>

      {/* Exam List Section */}
      <Typography variant="h6" sx={{ mb: 2, mt: 5, fontWeight: 'bold' }}>
        Exams Posted By You
      </Typography>

      <Paper elevation={0} sx={{ p: 3, border: 'solid 1px #cecece', borderRadius: '12px' }}>
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

const AssignmentItem = (exam) => {
  console.log(exam.exam.subject);
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
    <div className='exam_card'>

      <div >
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }} >{exam.exam.subject}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
          <Typography variant="caption" sx={{ fontWeight: 'bold' }} >Posted By</Typography>
          <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#503dff' }} >{exam.exam.teacheremail}</Typography>
        </Box>
      </div>

      <div  id='bold' >
        {exam.exam.title}
      </div>


      <div  >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
            Start Date: {new Date(exam.exam.exam_date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
            End Date: {new Date(exam.exam.exam_end_date)?.toLocaleDateString() || ''}
          </Typography>
        </Box>
      </div>


      <div  >
        <Button
          variant="contained"
          href={exam.exam.timetable_path}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mb: 1,
            backgroundColor: '#503dff',
            color: '#fff',
            borderRadius: 2,
            '&:hover': { backgroundColor: '#4030cc' },
            width: '100%'
          }}
        >
          View TimeTable
        </Button><br></br>
        <Button
          variant="contained"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: '#503dff',
            color: '#fff',
            width: '100%',
            borderRadius: 2,
            '&:hover': { backgroundColor: '#4030cc' },
          }}
        >
          Instructions
        </Button>
      </div>

      <div >

        <Button
          variant="contained"
          sx={{
            minWidth: 120,
            bgcolor: '#eb6a18',
            color: '#fff',
            borderRadius: 2,
            '&:hover': { bgcolor: '#d35e16' },
          }}
        >
          Add Result
        </Button>

        <br></br>

        <Button variant="contained" color="error"
          sx={{
            minWidth: 120,
            bgcolor: '#eb6a18',
            color: '#fff',
            borderRadius: 2,
            '&:hover': { bgcolor: '#d35e16' },
            marginTop: '10px'
          }}
        >
          Delete
        </Button>

      </div>

    </div>
  );
};

export default ExamCard;
