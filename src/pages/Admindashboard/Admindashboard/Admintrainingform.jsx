import React, { useState , useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const TrainingProgramForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    trainerName: "",
    trainerDescription: "",
    body: "",
    posterId: "", // Added posterId field
});
const [programs, setPrograms] = useState([]);
const [editId, setEditId] = useState(null);

useEffect(() => {
    fetchPrograms();
}, []);

const fetchPrograms = async () => {
    const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/trainingProgram.php");
    const data = await response.json();
    setPrograms(data);
};

const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId
        ? `https://codtsmartschool.strangeweb.in/studentapi/trainingProgram.php?id=${editId}`
        : "https://codtsmartschool.strangeweb.in/studentapi/trainingProgram.php";

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...formData,
            id: editId,
        }),
    });

    if (response.ok) {
        fetchPrograms();
        resetForm();
    } else {
        console.error("Error during the request", response);
    }
};

const handleEdit = (program) => {
    setFormData({
        title: program.title,
        shortDescription: program.short_description,
        trainerName: program.trainer_name,
        trainerDescription: program.trainer_description,
        body: program.body,
        posterId: program.poster_id, // Populate posterId
    });
    setEditId(program.id);
};

const handleDelete = async (id) => {
    const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/trainingProgram.php", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ id: id }),
    });

    if (response.ok) {
        fetchPrograms();
    } else {
        const errorMessage = await response.json();
        console.error("Error deleting program:", errorMessage);
    }
};

const resetForm = () => {
    setFormData({
        title: "",
        shortDescription: "",
        trainerName: "",
        trainerDescription: "",
        body: "",
        posterId: "", // Reset posterId
    });
    setEditId(null);
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
        boxShadow: 2 // Adjust this value for different shadow intensities
      }}
    >
      <Typography variant="h6" color="#6B50FF">
        Training Program
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
        label="Trainer Name"
        variant="outlined"
        name="trainerName"
        value={formData.trainerName}
        onChange={handleInputChange}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Trainer Description"
        variant="outlined"
        name="trainerDescription"
        value={formData.trainerDescription}
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
        minRows={3}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />
   <TextField label="Poster ID" variant="outlined" name="posterId" value={formData.posterId} onChange={handleInputChange} fullWidth /> {/* New field for posterId */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#6B50FF",
          color: "#FFF",
          alignSelf: "flex-end",
          ":hover": {
            backgroundColor: "#5638D6"
          }
        }}
      >
         {editId ? "UPDATE" : "POST"}
      </Button>
    </Box>
  );
};

export default TrainingProgramForm;
