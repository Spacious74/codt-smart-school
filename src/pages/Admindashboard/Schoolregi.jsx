
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
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

const AdminSchoolRegistration = () => {
  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    schoolName: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    educationalBoard: "",
    principalName: "",
    contactNumber: "",
    emailId: "",
    whatsappNumber: "",
    numberOfStudents: "",
    numberOfTeachers: "",
    logo: null,
    password: "",
    confirmPassword: "", // Added confirm password field
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validateFields = () => {
    const { emailId, contactNumber, whatsappNumber, password, confirmPassword } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(emailId)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!phonePattern.test(contactNumber) || !phonePattern.test(whatsappNumber)) {
      alert("Contact numbers must be 10 digits.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return; // Validate fields before sending data

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/schoolapi/registerapi.php', {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json();
      
      if (data.success) {
        alert(data.message);
        navigate('/admin/schools'); // Navigate to school login
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
   
  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#4338CA", marginBottom: "20px" }}
      >
        Register Your School
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
            {/* Logo Upload Field */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Upload School Logo</Typography>
              <input
                type="file"
                accept="image/*"
                name="logo"
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                }}
              />
              {formData.logo && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Selected: {formData.logo.name}
                </Typography>
              )}
            </Grid>
            {/* School Full Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="School Full Name"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
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
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
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
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
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
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
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
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>
            {/* Educational Board */}
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}>
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
            {/* Principal Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Principal / Director Name"
                name="principalName"
                value={formData.principalName}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>
            {/* Contact Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>
            {/* Email ID */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email ID"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>
            {/* WhatsApp Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>
            {/* Number of Students */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Students"
                name="numberOfStudents"
                type="number"
                value={formData.numberOfStudents}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>
            {/* Number of Teachers */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Teachers"
                name="numberOfTeachers"
                type="number"
                value={formData.numberOfTeachers}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>
            {/* Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
                InputProps={{ sx: { height: "40px" } }}
              />
            </Grid>
            {/* Confirm Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "10px" }}
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
                Register School
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminSchoolRegistration;
