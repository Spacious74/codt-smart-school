import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExamForm = () => {

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    exam_date: '',
    total_marks: '',
    applicable_class: '',
    notes: '',
    timetable_path: '',
    schoolcode: localStorage.getItem("schoolCode") ?? '',
    teacheremail: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    setMessage("")
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const requestData = { ...formData };

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/save_exam.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setMessage('Exam data saved successfully!');
        setFormData({
          title: '',
          subject: '',
          exam_date: '',
          total_marks: '',
          applicable_class: '',
          notes: '',
          timetable_path: '',
          schoolcode: '',
          teacheremail: ''
        })

        navigate('/school/academicschool/exam');  // Replace '/some-other-page' with the desired route

      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error submitting form. Please try again later.');
      console.error('Error:', error);
    }
  };



  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: '2px solid #503dff',
        padding: '20px',
        borderRadius: '10px',
        margin: '20px auto',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Post new exam
      </Typography>
      <TextField
        label="Exam Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Exam Date"
        name="exam_date"
        type="date"
        value={formData.exam_date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true, style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Total Marks"
        name="total_marks"
        type="number"
        value={formData.total_marks}
        onChange={handleChange}
        margin="normal"
        fullWidth
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="For class"
        name="applicable_class"
        value={formData.applicable_class}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Add Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#503dff',
          color: '#fff',
          marginTop: '20px',
          '&:hover': { backgroundColor: '#3b2cb3' },
          maxWidth: '300px',
        }}
        fullWidth
      >
        Submit Exam
      </Button>
    </Box>

  );
};

export default ExamForm;
