import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    schoolName: '',
    grade: '',
    address: '',
    city: '',
    pinCode: '',
    state: '',
    subjects: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      fetchStudentData(storedEmail);
    }
  }, []);

  const fetchStudentData = async (email) => {
    try {
      const response = await fetch(`https://codtsmartschool.strangeweb.in/studentapi/studentsdata.php?email=${email}`);
      const data = await response.json();
      if (data.success) {
        setFormData({
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          phoneNumber: data.data.phone_number,
          email: data.data.email,
          schoolName: data.data.school_name,
          grade: data.data.grade,
          address: data.data.address,
          city: data.data.city,
          pinCode: data.data.pin_code,
          state: data.data.state,
          subjects: data.data.subjects,
          password: '', // Keep password empty for security
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred while fetching data. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      grade: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/edistudprofile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        navigate('/app/home');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <Container maxWidth="sm" sx={{ marginTop: "50px", marginBottom: "50px" }}>
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#4338CA", marginBottom: "20px" }}>
            Edit Student Profile
          </Typography>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success" align="center" gutterBottom>
              {success}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  type="tel"
                  inputProps={{
                    pattern: "[0-9]{10}",
                    onKeyPress: (e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    },
                  }}
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="School Name"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}>
                  <InputLabel>Grade</InputLabel>
                  <Select
                    name="grade"
                    value={formData.grade}
                    onChange={handleSelectChange}
                    required
                    sx={{ height: "40px" }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                      <MenuItem key={grade} value={grade}>{`${grade}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Pin Code"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                  type="text"
                  inputProps={{ pattern: "[0-9]{6}" }}
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subjects"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type="password"
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
