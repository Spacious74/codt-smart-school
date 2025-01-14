import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AssignmentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    total_marks: '',
    submission_date: '',
    applicable_class: '',
    division: '', // New field for division
    questions: '',
    notes: '',
    teacher_email: '' // Field for teacher's email
  });

  useEffect(() => {
    // Retrieve the teacher's email from session storage
    const email = sessionStorage.getItem('userEmail');
    if (email) {
      setFormData((prevData) => ({ ...prevData, teacher_email: email }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("form submitted")
    // Validate fields
    // const { title, subject, total_marks, submission_date, applicable_class, division, questions } = formData;
    // if (!title || !subject || !total_marks || !submission_date || !applicable_class || !division || !questions) {
    //   alert('Please fill in all required fields.');
    //   return;
    // }

    // try {
    //   const response = await fetch('https://codtsmartschool.strangeweb.in/teacherapi/addassiunment.php', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: new URLSearchParams(formData)
    //   });

    //   const result = await response.json();
    //   if (result.success) {
    //     alert(result.message);
    //     setFormData({
    //       title: '',
    //       subject: '',
    //       total_marks: '',
    //       submission_date: '',
    //       applicable_class: '',
    //       division: '',
    //       questions: '',
    //       notes: '',
    //       teacher_email: email // Reset email
    //     }); // Reset form
    //   } else {
    //     alert(result.message);
    //   }
    // } catch (error) {
    //   console.error('Error submitting assignment:', error);
    //   alert('There was an error submitting the assignment.');
    // }
  };
    

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: '1px solid #503dff',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px auto',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000' }}>
        Submit Assignment
      </Typography>

      <TextField
        label="Title"
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <TextField
          label="Total Marks"
          name="total_marks"
          type="number"
          value={formData.total_marks}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ style: { color: '#503dff' } }}
          variant="outlined"
          sx={{ flex: 1, marginRight: '10px' }}
        /> */}
        <TextField
          label="Date Of Submission"
          name="submission_date"
          type="date"
          value={formData.submission_date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true, style: { color: '#503dff' } }}
          variant="outlined"
          sx={{ flex: 1 }}
        />
      </Box>
      <TextField
        label="Applicable Class"
        name="applicable_class"
        value={formData.applicable_class}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Division"
        name="division" // New field for division
        value={formData.division}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      {/* <TextField
        label="Add questions"
        name="questions"
        value={formData.questions}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      /> */}
      {/* <TextField
        label="Add Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={2}
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      /> */}
      <Box>
      <Typography variant="h6">Upload PDF</Typography>
      <TextField
        type="file"
        inputProps={{ accept: '.pdf' }}
        // onChange={handleFileChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
     
      <Button
    //   onClick={handleClick}
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
        Submit Assignment
      </Button>
    </Box>
  );
};

export default AssignmentForm;
