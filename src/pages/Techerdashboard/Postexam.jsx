import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ExamForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    exam_date: '',
    total_marks: '',
    applicable_class: '',
    notes: '',
  });
  const [timetableFile, setTimetableFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setTimetableFile(file);
      setFileName(file.name);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem('teacherEmail');

    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('teacher_email', email); // Add email
    if (timetableFile) {
      formDataToSend.append('timetable', timetableFile); // Append the timetable file
    }

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/teacherapi/postexam.php', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        setFormData({ title: '', subject: '', exam_date: '', total_marks: '', applicable_class: '', notes: '' });
        setFileName('');
        setTimetableFile(null);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('There was an error submitting the exam.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: '2px solid #503dff',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px auto',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000' }}>
        Post new exam
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
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="For which class the exam is applicable?"
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
        variant="outlined"
        component="label"
        fullWidth
        sx={{
          margin: 'normal',
          borderColor: '#503dff',
          color: '#503dff',
          '&:hover': { borderColor: '#3b2cb3' },
        }}
      >
        Upload Time Table Excel Sheet
        <input
          type="file"
          accept=".xlsx, .xls"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {fileName && (
        <Typography variant="body2" sx={{ marginTop: '10px', color: '#000' }}>
          Selected File: {fileName}
        </Typography>
      )}
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
