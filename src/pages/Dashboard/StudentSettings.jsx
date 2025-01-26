import { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const StudentSettings= () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  // Retrieve schoolEmail from sessionStorage
  const userEmail = sessionStorage.getItem('userEmail'); // This will be "mlm@gmail.com" if stored in sessionStorage

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (!password) {
      setMessage('Please enter a new password.');
      setOpen(true);
      return;
    }

    // Prepare data for the API request
    const data = {
      email_id: userEmail,  // Get user email from sessionStorage
      new_password: password,
    };

    try {
      // Send POST request to update password
      const response = await axios.post('https://codtsmartschool.strangeweb.in/teacherapi/updatepass.php', data);

      if (response.data.status === 'success') {
        setMessage('Password updated successfully!');
      } else {
        setMessage('Error updating password. Please try again.');
      }
      setOpen(true);
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Something went wrong. Please try again later.');
      setOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>Update Password</h2>
      <Box sx={{ maxWidth: 400, margin: 'auto' }}>
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#503dff',
            '&:hover': {
              backgroundColor: '#402bbf',
            },
            width: '100%',
          }}
        >
          Update Password
        </Button>
      </Box>

      {/* Snackbar for showing feedback messages */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={message.includes('success') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StudentSettings;
