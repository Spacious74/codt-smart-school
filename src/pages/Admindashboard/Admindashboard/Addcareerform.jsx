import React, { useState , useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Add, PhotoCamera , Remove, Edit} from "@mui/icons-material";
import axios from "axios";
const API_URL = "https://codtsmartschool.strangeweb.in/studentapi/careerform.php";


const CareerForm = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState(['', '', '']);
  const [thumbnail, setThumbnail] = useState(null);
  const [body, setBody] = useState('');
  const [careers, setCareers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentCareerId, setCurrentCareerId] = useState(null);

  // Fetch careers when component mounts
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/careerform.php');
        const data = await response.json();
        if (data.success) {
          setCareers(data.careers);
        } else {
          console.error("Error fetching careers:", data.message);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchCareers();
  }, []);


  const handleEditCareer = (career) => {
    setEditMode(true);
    setCurrentCareerId(career.id);
    setTitle(career.title);
    setDescription(career.description);
    setCategories(career.categories.split(','));
    setBody(career.body);
    setThumbnail(career.thumbnail); // Note: You'll need to handle the thumbnail separately
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for empty required fields (Frontend Validation)
    if (!title || !description || !body || categories.some(category => category.trim() === '')) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categories", JSON.stringify(categories)); // Categories as JSON string
    formData.append("body", body);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    // Include the career ID in the request if we're editing
    if (editMode && currentCareerId) {
      formData.append("id", currentCareerId); // Include the ID of the career we're editing
    }

    const method = editMode ? "POST" : "POST"; // Both POST for create and edit
    const url = `https://codtsmartschool.strangeweb.in/studentapi/careerform.php`;

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert(editMode ? 'Career updated successfully!' : 'Career added successfully!');
        
        // Reset form fields after success
        setTitle('');
        setDescription('');
        setCategories(['', '', '']);
        setThumbnail(null);
        setBody('');

        // Reset edit mode
        setEditMode(false);
        setCurrentCareerId(null);

        // Refresh careers list
        const fetchCareers = async () => {
          const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/careerform.php');
          const data = await response.json();
          if (data.success) {
            setCareers(data.careers);
          }
        };

        fetchCareers(); // Re-fetch careers after adding or updating a career
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Failed to submit form');
    }
  };


  
  // Handle Delete career
const handleDeleteCareer = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this career?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`https://codtsmartschool.strangeweb.in/studentapi/careerform.php?id=${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    if (data.success) {
      alert('Career deleted successfully!');
      setCareers(careers.filter(career => career.id !== id)); // Update the careers list
    } else {
      alert('Failed to delete career');
    }
  } catch (error) {
    console.error('Error during delete operation:', error);
    alert('Failed to delete career');
  }
};







  return (
    <Paper
    component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 4,
        bgcolor: "white",
        maxWidth: 1200,
        mx: "auto",
        borderRadius: 2,
        elevation: 0
      }}
    >
      <Typography variant="h6" sx={{ color: "#503dff", mb: 2 }}>
        Add new Careers
      </Typography>

      <TextField
        label="Title"
        name="title"
        fullWidth
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#503dff" }
          }
        }}
      />

      <TextField
        label="Short description"
        name="short_description"
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Typography variant="body1" sx={{ color: "#503dff", mb: 1 }}>
        Categories
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {categories.map((category, index) => (
          <Grid item xs={4} key={index}>
            <TextField
              fullWidth
              variant="outlined"
              value={category}
              onChange={(e) => {
                const newCategories = [...categories];
                newCategories[index] = e.target.value;
                setCategories(newCategories);
              }}
            />
            {/* <IconButton onClick={() => removeCategory(index)}>
              <Remove sx={{ color: "#ff3d3d" }} />
            </IconButton> */}
            
          </Grid>
        ))}
         <Grid item xs={3}>
         <IconButton onClick={() => setCategories([...categories, ''])}>
              <Add sx={{ color: "#503dff" }} />
            </IconButton>
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ color: "#503dff", mb: 1 }}>
        Add thumbnail
      </Typography>
      <Box
        sx={{
          width: 120,
          height: 120,
          border: "2px dashed #503dff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3
        }}
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
          <PhotoCamera sx={{ fontSize: 50, color: "#503dff" }} />
        </IconButton>
      </Box>

      <TextField
        label="Body"
        name="body"
        fullWidth
        multiline
        rows={5}
        variant="outlined"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#503dff" }
          }
        }}
      />

<Button type="submit" variant="contained" sx={{ bgcolor: "#503dff", color: "white" }}>
          {editMode ? 'Update' : 'Post'}
        </Button>
    </Paper>
  );
};

export default CareerForm;
