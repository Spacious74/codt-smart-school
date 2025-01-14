import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MdCloudUpload } from 'react-icons/md';

const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    schoolName: '',
    grade: '',
    division: '',
    role: '',
    schoolCode: '',
    profileImage: '',
    address: '',
    city: '',
    pinCode: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/resgister.php', {
        method: 'POST',
        body: formDataToSubmit,
      });

      const data = await response.json();


      if (data.success) {
         
        localStorage.setItem('stud', JSON.stringify(data));
        console.log("id-1 " , data.data.id)
        window.location.href = `https://codt.in/pricingportal.php?email=${data.data.id}`;
        console.log("id-2 " , data.data.id)


        setSuccess(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (

    <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
    <div className="flex flex-wrap items-center">
      <div className="hidden w-full xl:block xl:w-1/2">
        <div className="py-17.5 px-26 text-center">
          <Link className="mb-5.5 inline-block" to="/">
            <img
              className="hidden dark:block"
              src='../../src/assets/logo.png'
              alt="Logo"
              style={{ width: '200px' }}
            />
            <img
              className="dark:hidden"
              src='../../src/assets/logo.png'
              alt="Logo"
              style={{ width: '200px' }}
            />
          </Link>
          <p className="2xl:px-20">We create Smart Schools with our Technology</p>
        </div>
      </div>

      <Container maxWidth="sm" sx={{ marginTop: "50px", marginBottom: "50px" , height: "80vh" , overflowY: "scroll" }}>
        <Paper
          elevation={0}
          sx={{
            padding: "30px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)"
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#4338CA", marginBottom: "20px" }}
          >
            Register as Student
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
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Upload Profile Image
                </Typography>
                <div
                  style={{
                    border: '2px dashed #4338CA',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    position: 'relative',
                  }}
                >
                  {formData.profileImage ? (
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile Preview"
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                        marginBottom: '10px',
                      }}
                    />
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      No image uploaded
                    </Typography>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      opacity: 0, // Hide the default file input
                      cursor: 'pointer',
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '10px', backgroundColor: '#503dff' }}
                    onClick={() => document.querySelector('input[type="file"]').click()}
                    startIcon={<MdCloudUpload />} // Use React Icons here
                  >
                    Choose Image
                  </Button>
                </div>
              </Grid>
              
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
                  label="Division"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Role no."
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="School Code"
                  name="schoolCode"
                  value={formData.schoolCode}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                  InputProps={{ sx: { height: "40px" } }}
                />
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
                  type="number"
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

              {/* <Grid item xs={12}>
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
              </Grid> */}

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

              {/* New Confirm Password Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
  </div>

  
  );
};

export default SignUp;
