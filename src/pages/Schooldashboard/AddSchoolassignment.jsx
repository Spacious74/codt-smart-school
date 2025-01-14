import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const AddSchoolassignment = () => {


  const [editorHtml, setEditorHtml] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    total_marks: "",
    submission_date: "",
    applicable_class: "",
    divi: "",
    questions: "",
    notes: "",
    teacheremail: "",
    schoolcode: localStorage.getItem("schoolCode"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const requestData = { ...formData };
    
    try {
      const response = await fetch(
        "https://codtsmartschool.strangeweb.in/studentapi/save_assinment.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Data submitted successfully:", data);
        // Optionally reset the form or show success message
        setFormData({
          title: "",
          subject: "",
          total_marks: "",
          submission_date: "",
          applicable_class: "",
          divi: "",
          questions: "",
          notes: "",
          teacheremail: "",
          schoolcode: "",
        });
        alert("Form submitted successfully!");
      } else {
        console.error("Failed to submit data:", response.statusText);
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while submitting data:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
<Box
  component="form"
  onSubmit={handleSubmit}
  sx={{
    padding: "20px",
    borderRadius: "8px",
    margin: "20px auto",
  }}
>


  <Typography variant="h6" sx={{ marginBottom: "20px", color: "#000" }}>
    Post new assignment
  </Typography>

  {/* Title */}
  <Box sx={{ marginBottom: "20px", display: "flex" }}>
    <Typography
      variant="body1"
      sx={{
        color: "#503dff",
        fontWeight: "bold",
        paddingTop: "30px",
        paddingRight: "10px",
        whiteSpace: 'nowrap',  // Prevent label from wrapping
        minWidth: "120px",  // Set a minimum width for the label
      }}
    >
      Title
    </Typography>
    <TextField
      name="title"
      value={formData.title}
      onChange={handleChange}
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#503dff',
          },
          '&:hover fieldset': {
            borderColor: '#503dff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#503dff',
          },
          '& input': {
            padding: "6px 10px", // Reduced padding inside the input
          },
        },
      }}
    />
  </Box>

  {/* Subject */}
  <Box sx={{ marginBottom: "20px", display: "flex" }}>
    <Typography
      variant="body1"
      sx={{
        color: "#503dff",
        fontWeight: "bold",
        paddingTop: "30px",
        paddingRight: "10px",
        whiteSpace: 'nowrap',  // Prevent label from wrapping
        minWidth: "120px",  // Set a minimum width for the label
      }}
    >
      Subject
    </Typography>
    <TextField
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#503dff',
          },
          '&:hover fieldset': {
            borderColor: '#503dff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#503dff',
          },
          '& input': {
            padding: "6px 10px", // Reduced padding inside the input
          },
        },
      }}
    />
  </Box>

  {/* Total Marks & Last Date to Submit in a single line */}
  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
    <Box sx={{ flex: 1, marginRight: "10px" }}>
      <Typography
        variant="body1"
        sx={{
          color: "#503dff",
          fontWeight: "bold",
          paddingTop: "30px",
          whiteSpace: 'nowrap',  // Prevent label from wrapping
          minWidth: "120px",  // Set a minimum width for the label
        }}
      >
        Total Marks
      </Typography>
      <TextField
        name="total_marks"
        type="number"
        value={formData.total_marks}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#503dff',
            },
            '&:hover fieldset': {
              borderColor: '#503dff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#503dff',
            },
            '& input': {
              padding: "6px 10px", // Reduced padding inside the input
            },
          },
        }}
      />
    </Box>

    <Box sx={{ flex: 1 }}>
      <Typography
        variant="body1"
        sx={{
          color: "#503dff",
          fontWeight: "bold",
          paddingTop: "30px",
          whiteSpace: 'nowrap',  // Prevent label from wrapping
          minWidth: "120px",  // Set a minimum width for the label
        }}
      >
        Last date to submit
      </Typography>
      <TextField
        name="submission_date"
        type="date"
        value={formData.submission_date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#503dff',
            },
            '&:hover fieldset': {
              borderColor: '#503dff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#503dff',
            },
            '& input': {
              padding: "6px 10px", // Reduced padding inside the input
            },
          },
        }}
      />
    </Box>
  </Box>

  {/* Applicable Class */}

  <Box sx={{ marginBottom: "20px"}}>
    <Typography
      variant="body1"
      sx={{
        color: "#503dff",
        fontWeight: "bold",
        paddingTop: "30px",
        paddingRight: "10px",
        whiteSpace: 'nowrap',  // Prevent label from wrapping
        minWidth: "120px",  // Set a minimum width for the label
      }}
    >
      Applicable Class
    </Typography>
    <TextField
      name="applicable_class"
      value={formData.applicable_class}
      onChange={handleChange}
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#503dff',
          },
          '&:hover fieldset': {
            borderColor: '#503dff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#503dff',
          },
          '& input': {
            padding: "6px 10px", // Reduced padding inside the input
          },
        },
      }}
    />
  </Box>

  {/* Division */}
  <Box sx={{ marginBottom: "20px", display: "flex" }}>
    <Typography
      variant="body1"
      sx={{
        color: "#503dff",
        fontWeight: "bold",
        paddingTop: "30px",
        paddingRight: "10px",
        whiteSpace: 'nowrap',  // Prevent label from wrapping
        minWidth: "120px",  // Set a minimum width for the label
      }}
    >
      Division
    </Typography>
    <TextField
      name="divi"
      value={formData.divi}
      onChange={handleChange}
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#503dff',
          },
          '&:hover fieldset': {
            borderColor: '#503dff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#503dff',
          },
          '& input': {
            padding: "6px 10px", // Reduced padding inside the input
          },
        },
      }}
    />
  </Box>

  {/* Add Questions */}
  <Box sx={{ marginBottom: "20px", display: "flex" }}>

    <Typography
      variant="body1"
      sx={{
        color: "#503dff",
        fontWeight: "bold",
        paddingTop: "30px",
        paddingRight: "10px",
        whiteSpace: 'nowrap',  // Prevent label from wrapping
        minWidth: "120px",  // Set a minimum width for the label
      }}
    >
      Add questions
    </Typography>

    
    <TextField
      name="questions"
      value={formData.questions}
      onChange={handleChange}
      fullWidth
      margin="normal"
      multiline
      rows={4}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#503dff',
          },
          '&:hover fieldset': {
            borderColor: '#503dff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#503dff',
          },
          '& input': {
            padding: "6px 10px", // Reduced padding inside the input
          },
        },
      }}
    />
  </Box>

  {/* Add Notes */}
  <Box sx={{ marginBottom: "20px", display: "flex" }}>
    <Typography
      variant="body1"
      sx={{
        color: "#503dff",
        fontWeight: "bold",
        paddingTop: "30px",
        paddingRight: "10px",
        whiteSpace: 'nowrap',  // Prevent label from wrapping
        minWidth: "120px",  // Set a minimum width for the label
      }}
    >
      Add Notes
    </Typography>
    <TextField
      name="notes"
      value={formData.notes}
      onChange={handleChange}
      fullWidth
      margin="normal"
      multiline
      rows={2}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#503dff',
          },
          '&:hover fieldset': {
            borderColor: '#503dff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#503dff',
          },
          '& input': {
            padding: "6px 10px", // Reduced padding inside the input
          },
        },
      }}
    />
  </Box>

  <Button
    type="submit"
    variant="contained"
    sx={{
      backgroundColor: "#503dff",
      color: "#fff",
      marginTop: "20px",
      "&:hover": { backgroundColor: "#3b2cb3" },
      maxWidth: "300px",
    }}
    fullWidth
  >
    Submit Assignment
  </Button>

    



</Box>
  
  );
};

export default AddSchoolassignment;
