import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const API_URL = "https://codtsmartschool.strangeweb.in/sallaybers.php";

const SyllabusComponent = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [subject, setSubject] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [schoolcode, setSchoolcode] = useState("");
  const [editId, setEditId] = useState(null);
  const [chapters, setChapters] = useState([{ name: "", status: "active" }]);

  // Get school data from localStorage and fetch the syllabus on component mount
  useEffect(() => {
    const schoolData = JSON.parse(localStorage.getItem("schoolData"));
    if (schoolData && schoolData.schoolcode) {
      setSchoolcode(schoolData.schoolcode);
      fetchSyllabus(schoolData.schoolcode);
    }
  }, []);

  // Fetch syllabus data from the API
  const fetchSyllabus = async (schoolcode) => {
    try {
      const response = await fetch(`${API_URL}?schoolcode=${schoolcode}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setSyllabusList(data);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching syllabus:", error);
    }
  };

  // Handle form submission (POST or PUT request)
  const handleSubmit = async () => {
    if (!subject || !syllabus || !schoolcode) {
      alert("Subject, Syllabus, and School Code are required.");
      return;
    }

    // Validate chapters
    for (const chapter of chapters) {
      if (!chapter.name.trim()) {
        alert("All chapters must have a name.");
        return;
      }
    }

    const payload = {
      id: editId || 0,
      subject,
      syllabus,
      schoolcode,
      chapters: JSON.stringify(chapters), // Ensure chapters are sent as a JSON string
    };

    try {
      const method = editId ? "PUT" : "POST";
      const response = await fetch(API_URL, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Check if response is successful
      if (!response.ok) {
        const responseText = await response.text();
        console.error("Error response from API:", responseText);
        alert(responseText || "Error saving syllabus. Please try again.");
        return;
      }

      const result = await response.json(); // Parse the successful response
      alert(result.message);
      fetchSyllabus(schoolcode); // Reload syllabus list after successful submission
      clearForm(); // Clear the form after submission
    } catch (error) {
      // Log the detailed error for debugging
      console.error("Failed to fetch:", error);
      alert("Error saving syllabus. Please try again later.");
    }
  };

  // Handle syllabus deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this syllabus?")) return;

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        fetchSyllabus(schoolcode);
      } else {
        alert(result.message || "Error deleting syllabus.");
      }
    } catch (error) {
      console.error("Error deleting syllabus:", error);
    }
  };

  // Clear form after submission
  const clearForm = () => {
    setSubject("");
    setSyllabus("");
    setEditId(null);
    setChapters([{ name: "", status: "active" }]);
  };

  // Handle chapter field change
  const handleChapterChange = (index, field, value) => {
    setChapters(
      chapters.map((chapter, i) =>
        i === index ? { ...chapter, [field]: value } : chapter
      )
    );
  };

  // Add a new chapter
  const addChapter = () => {
    setChapters([...chapters, { name: "", status: "active" }]);
  };

  // Remove a chapter
  const removeChapter = (index) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  // Edit an existing syllabus
  const handleEdit = (item) => {
    setEditId(item.id);
    setSubject(item.subject);
    setSyllabus(item.syllabus);
    try {
      setChapters(JSON.parse(item.chapters) || [{ name: "", status: "active" }]);
    } catch (error) {
      console.error("Error parsing chapters:", error);
      setChapters([{ name: "", status: "active" }]);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Syllabus Management
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Syllabus"
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            margin="normal"
          />
          <Typography variant="h6">Chapters</Typography>
          {chapters.map((chapter, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label={`Chapter ${index + 1}`}
                  value={chapter.name}
                  onChange={(e) =>
                    handleChapterChange(index, "name", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Status"
                  value={chapter.status}
                  onChange={(e) =>
                    handleChapterChange(index, "status", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeChapter(index)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button variant="contained" color="primary" onClick={addChapter}>
            Add Chapter
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            style={{ marginTop: 20 }}
          >
            {editId ? "Update" : "Create"}
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: 40 }}>
        Syllabus List
      </Typography>
      <List>
        {syllabusList.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.subject} (${item.schoolcode})`}
              secondary={item.syllabus}
            />
            <Button variant="outlined" onClick={() => handleEdit(item)}>
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SyllabusComponent;
