import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, CircularProgress, Box } from '@mui/material';

const SubmitReview = () => {
  const tid = localStorage.getItem('sid'); // Teacher ID (sid) from localStorage

  const [uid, setUid] = useState('');
  const [sid, setSid] = useState(tid); // Student ID (sid)
  const [review, setReview] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [role, setRole] = useState('Teacher'); // Default role is student
  const [rating, setRating] = useState(0);
  const [teacherTid, setTeacherTid] = useState(tid); // Teacher's ID (tid)
  const [teachername, setTeachername] = useState(''); // Teacher's Name
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Retrieving the teacher data from localStorage
  const storedStud = localStorage.getItem('teacherData');

  useEffect(() => {
    if (storedStud) {
      const stud = JSON.parse(storedStud);
      const { id, schoolcode, firstName, lastName } = stud;
      setSchoolCode(schoolcode);
      setUid(id);
      setTeachername(firstName + ' ' + lastName);
    } else {
      console.log('No user data found in localStorage.');
    }
  }, [storedStud]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    if (!uid || !review || !schoolCode || !role || !rating || !sid || !teachername) {
      setMessage('Please fill in all fields including the rating.');
      return;
    }

    setLoading(true);

    try {
      // Sending the review data via a POST request to the API
      const response = await fetch('https://codtsmartschool.strangeweb.in/teacherapi/submit_review.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          review,
          school_code: schoolCode,
          role,
          rating, // Rating value
          sid: teacherTid, // Teacher's ID (tid)
          teachername, // Teacher's name
        }),
      });

      const data = await response.json();

      // Handle success and error based on the API response
      if (data.success) {
        setMessage('Review submitted successfully!');
      } else {
        setMessage(data.message || 'Failed to submit the review.');
      }
    } catch (error) {
      setMessage('Error occurred while submitting the review.');
    }

    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Submit Your Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="UID"
          variant="outlined"
          type="number"
          fullWidth
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          
          sx={{ marginBottom: 2, display: 'none' }} // Hide the field
          disabled
        />
        <TextField
          label="Review"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="School Code"
          variant="outlined"
          fullWidth
          value={schoolCode}
          onChange={(e) => setSchoolCode(e.target.value)}
          required
          sx={{ marginBottom: 2, display: 'none' }} // Hide the field
          disabled
        />
        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          sx={{ marginBottom: 2, display: 'none' }} // Hide the field
          disabled
        />
        <TextField
          label="Rating (1-5)"
          variant="outlined"
          type="number"
          fullWidth
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Student ID (sid)"
          variant="outlined"
          type="number"
          fullWidth
          value={teacherTid}
          onChange={(e) => setTeacherTid(e.target.value)}
          required
          sx={{ marginBottom: 2, display: 'none' }} // Hide the field
          disabled
        />
        <TextField
          label="Teacher Name"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={teachername}
          onChange={(e) => setTeachername(e.target.value)}
          required
          sx={{ marginBottom: 2, display: 'none' }} // Hide the field
          disabled
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#503dff',
              '&:hover': {
                backgroundColor: '#402bc1',
              },
              padding: '10px 20px',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Review'}
          </Button>
        </Box>
      </form>
      {message && (
        <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default SubmitReview;
