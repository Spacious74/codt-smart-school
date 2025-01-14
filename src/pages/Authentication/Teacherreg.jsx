import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormdata, submitForm } from "../../redux/features/formSlice";
import {
  TextField,
  Grid,
  Container,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    schoolName: "",
    educationalBoard: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    subjects: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const dispatch = useDispatch();
  const Formdata = useSelector((state) => state.form);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    dispatch(setFormdata(formData));
  }, [formData, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(submitForm(Formdata))
      .then(() => {
        // Navigate to the login page after successful registration
        navigate("/auth/teacherlogin");
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Registration error:", error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#4338CA", marginBottom: "20px" }}
      >
        Register as Teacher
      </Typography>

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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Image Upload */}
            <Grid item xs={12}>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                }}
              />
            </Grid>

            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* School Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="School Name"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Educational Board */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
              >
                <InputLabel>Educational Board</InputLabel>
                <Select
                  name="educationalBoard"
                  value={formData.educationalBoard}
                  onChange={handleChange}
                  required
                  sx={{ height: "40px" }}
                >
                  <MenuItem value="CBSE">CBSE</MenuItem>
                  <MenuItem value="ICSE">ICSE</MenuItem>
                  <MenuItem value="State Board">State Board</MenuItem>
                  <MenuItem value="IB">IB</MenuItem>
                  <MenuItem value="Cambridge">Cambridge</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* City */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Pin Code */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pin Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* State */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Subjects Taught */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="What Subjects Do You Teach?"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "40px", backgroundColor: "#4338CA" }}
              >
                Register as Teacher
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default TeacherRegistration;
