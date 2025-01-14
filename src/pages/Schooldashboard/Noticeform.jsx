import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';

const NoticeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    notice: '',
    teacher_email: '',
    isForStudents: false,
    isForTeachers: false,
  });

  useEffect(() => {
    const email = sessionStorage.getItem('schoolEmail');

    if (email) {
      setFormData((prevData) => ({
        ...prevData,
        teacher_email: email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, notice, isForStudents, isForTeachers } = formData;

    // Retrieve email from session storage
    const teacher_email = sessionStorage.getItem('schoolEmail');

    if (!title || !notice || (!isForStudents && !isForTeachers)|| !teacher_email ) {
      alert('Please fill in all required fields and select at least one audience.');
      return;
    }

    try {
      const response = await fetch('https://codtschool.strangeweb.info/studentapi/careerform.php/submit_notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          title,
          notice,
          teacher_email,
          isForStudents: isForStudents ? '1' : '0',
          isForTeachers: isForTeachers ? '1' : '0',
        }),
      });

      const result = await response.json();
      if (result.success) {
        // alert(result.message);
        setFormData({
          title: '',
          notice: '',
          teacher_email: teacher_email, // Reset email if needed
          isForStudents: false,
          isForTeachers: false,
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error submitting notice:', error);
      // alert('There was an error submitting the notice.');
    }
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
        Post New Notice
      </Typography>
      <Box sx={{ margin: '20px 0' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isForStudents}
              onChange={handleChange}
              name="isForStudents"
              color="primary"
            />
          }
          label="Notice for Students"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isForTeachers}
              onChange={handleChange}
              name="isForTeachers"
              color="primary"
            />
          }
          label="Notice for Teachers"
        />
      </Box>
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
        label="Notice"
        name="notice"
        value={formData.notice}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
        multiline
        rows={4}
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
        Submit Notice
      </Button>
    </Box>
  );
};

export default NoticeForm;
