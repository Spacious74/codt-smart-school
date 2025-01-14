import React, { useState } from 'react';
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
    schoolcode: localStorage.getItem("schoolCode"),
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
    <div className="post_eaxm_container">

    <Box component="form" onSubmit={handleSubmit}>

      <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000', marginTop: '50px' }}>
        Post New Exam
      </Typography>

      {/* Exam Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Typography sx={{ width: '100px', marginRight: '10px', color: '#503dff' }}>Exam Title</Typography>
        <TextField
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              borderRadius: '8px',
              padding: '0px',
              borderColor: '#503dff',
              borderWidth: 1,
            },
          }}
          InputLabelProps={{
            style: {
              color: '#503dff',
              width: '100%', // Ensuring the label takes full width
            },
          }}
          variant="outlined"
        />
      </Box>
      {/* Subject */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Typography sx={{ marginRight: '10px', color: '#503dff' }}>Subject</Typography>
        <TextField
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              borderRadius: '8px',
              padding: '0px',
              borderColor: '#503dff',
              borderWidth: 1,
            },
          }}
          InputLabelProps={{
            style: {
              color: '#503dff',
              width: '100%',
            },
          }}
          variant="outlined"
        />
      </Box>

      {/* Exam Date */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Typography sx={{ marginRight: '10px', color: '#503dff', width: '100px' }}>Exam Date</Typography>
        <TextField
          name="exam_date"
          required
          type="date"
          value={formData.exam_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              borderRadius: '8px',
              padding: '0px',
              borderColor: '#503dff',
              borderWidth: 1,
            },
          }}
          InputLabelProps={{
            shrink: true,
            style: {
              color: '#503dff',
              width: '100%',
            },
          }}
          variant="outlined"
        />
      </Box>

      {/* Total Marks */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Typography sx={{ marginRight: '10px', color: '#503dff', width: '200px' }}>Total Marks</Typography>
        <TextField
          name="total_marks"
          required
          type="number"
          value={formData.total_marks}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              borderRadius: '8px',
              padding: '0px',
              borderColor: '#503dff',
              borderWidth: 1,
            },
          }}
          InputLabelProps={{
            style: {
              color: '#503dff',
              width: '100%',
            },
          }}
          variant="outlined"
        />
      </Box>
      {/* Applicable Class */}
      <Box sx={{ marginBottom: '10px' }}>
        <Typography sx={{ marginRight: '10px', color: '#503dff' }}>For which class the exam is applicable?</Typography>
        <TextField
          name="applicable_class"
          required
          value={formData.applicable_class}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              borderRadius: '8px',
              padding: '0px',
              borderColor: '#503dff',
              borderWidth: 1,
            },
          }}
          InputLabelProps={{
            style: {
              color: '#503dff',
              width: '100%',
            },
          }}
          variant="outlined"
        />
      </Box>

      {/* Teacher Email */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Typography sx={{ marginRight: '10px', color: '#503dff', width: '200px' }}>Teacher Email</Typography>
        <TextField
          name="teacheremail"
          type="email"
          value={formData.teacheremail}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              borderRadius: '8px',
              padding: '0px',
              borderColor: '#503dff',
              borderWidth: 1,
            },
          }}
          InputLabelProps={{
            style: {
              color: '#503dff',
              width: '100%',
            },
          }}
          variant="outlined"
        />
      </Box>

      {/* Notes */}
      <Box sx={{ marginBottom: '10px' }}>
        <Typography sx={{ marginRight: '10px', color: '#503dff' }}>Add Notes</Typography>
        <TextField
          name="notes"
          required
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            sx: {
              borderRadius: '8px',
              padding: '0px',
              borderColor: '#503dff',
              borderWidth: 1,
            },
          }}
          InputLabelProps={{
            style: {
              color: '#503dff',
              width: '100%',
            },
          }}
          variant="outlined"
        />
      </Box>
      {/* URL */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Typography sx={{ marginRight: '10px', color: '#503dff', width: '100px' }}>Add URL</Typography>
        <TextField
          name="timetable_path"
          required
          value={formData.timetable_path}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              borderRadius: '8px',
              padding: '0px',
              borderColor: '#503dff',
              borderWidth: 1,
            },
          }}
          InputLabelProps={{
            style: {
              color: '#503dff',
              width: '100%',
            },
          }}
          variant="outlined"
        />
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#503dff',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          marginTop: '20px',
          '&:hover': {
            backgroundColor: '#3a2db6', // Darker shade for hover effect
          },
        }}
      >
        Submit Exam
      </Button>
      
      {/* Message Display */}
      {message && (
        <Typography sx={{ marginTop: '20px', color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </Typography>
      )}
    </Box>
  </div>
    
  );
};

export default ExamForm;
