import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";


const Noticeform = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    body: "",
    isSchool: false,
    isStudents: false,
    isTeachers: false,
    posterId: "",  // New field
  });

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
        // Optionally, reset the form
        setFormData({
          title: "",
          shortDescription: "",
          body: "",
          isSchool: false,
          isStudents: false,
          isTeachers: false,
          posterId: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        maxWidth: 1200,
        margin: "0 auto",
        backgroundColor: "#ffff",
        borderRadius: "10px",
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" color="#6B50FF">
        Notice
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Short Description"
        variant="outlined"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleInputChange}
        multiline
        minRows={2}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Body"
        variant="outlined"
        name="body"
        value={formData.body}
        onChange={handleInputChange}
        multiline
        minRows={10}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Poster ID"
        variant="outlined"
        name="posterId"
        value={formData.posterId}
        onChange={handleInputChange}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <Typography variant="body1">Target Audience:</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              name="isSchool"
              checked={formData.isSchool}
              onChange={handleInputChange}
              color="primary"
            />
          }
          label="School"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isStudents"
              checked={formData.isStudents}
              onChange={handleInputChange}
              color="primary"
            />
          }
          label="Students"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isTeachers"
              checked={formData.isTeachers}
              onChange={handleInputChange}
              color="primary"
            />
          }
          label="Teachers"
        />
      </Box>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#6B50FF",
          color: "#FFF",
          alignSelf: "flex-end",
          ":hover": {
            backgroundColor: "#5638D6",
          },
        }}
      >
        POST
      </Button>
    </Box>
  );
};

export default Noticeform;
