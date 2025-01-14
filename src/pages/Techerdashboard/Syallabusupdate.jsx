import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Container } from "@mui/material";

const API_URL = "https://codtsmartschool.strangeweb.in/sallaybers.php";

const SyllabusUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [syllabus, setSyllabus] = useState({
    subject: "",
    syllabus: "",
    chapters: [{ name: "", status: "active" }],
  });
  const [schoolCode, setSchoolCode] = useState("");

  useEffect(() => {
    const storedStud = localStorage.getItem("teacherData");
    if (storedStud) {
      const stud = JSON.parse(storedStud);
      setSchoolCode(stud.schoolcode || "");
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchSyllabusData = async () => {
        try {
          const response = await fetch(`${API_URL}?id=${id}`);
          if (response.ok) {
            const data = await response.json();
            setSyllabus({
              subject: data.subject || "",
              syllabus: data.syllabus || "",
              chapters: Array.isArray(data.chapters) ? data.chapters : [{ name: "", status: "active" }],
            });
          } else {
            alert("Error loading syllabus data.");
          }
        } catch (error) {
          console.error("Error fetching syllabus data:", error);
          alert("Failed to load syllabus data.");
        }
      };
      fetchSyllabusData();
    }
  }, [id]);

  const handleChapterChange = (index, field, value) => {
    setSyllabus((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) =>
        i === index ? { ...chapter, [field]: value } : chapter
      ),
    }));
  };

  const addChapter = () => {
    setSyllabus((prev) => ({
      ...prev,
      chapters: [...prev.chapters, { name: "", status: "active" }],
    }));
  };

  const removeChapter = (index) => {
    setSyllabus((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!syllabus.subject.trim() || !syllabus.syllabus.trim() || !schoolCode.trim()) {
      alert("Subject, Syllabus, and School Code are required.");
      return;
    }
    const payload = {
      id: id || 0,
      subject: syllabus.subject,
      syllabus: syllabus.syllabus,
      chapters: syllabus.chapters,
      schoolcode: schoolCode,
    };

    try {
      const response = await fetch(API_URL, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Syllabus saved successfully.");
        navigate("/teacher/academics/syllabus");
      } else {
        alert("Failed to save syllabus.");
      }
    } catch (error) {
      console.error("Error saving syllabus:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {id ? "Update" : "Create"} Syllabus
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Subject"
            value={syllabus.subject}
            onChange={(e) => setSyllabus({ ...syllabus, subject: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Syllabus"
            value={syllabus.syllabus}
            onChange={(e) => setSyllabus({ ...syllabus, syllabus: e.target.value })}
            margin="normal"
          />
          <Typography variant="h6">Chapters</Typography>
          {syllabus.chapters.map((chapter, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label={`Chapter ${index + 1}`}
                  value={chapter.name}
                  onChange={(e) => handleChapterChange(index, "name", e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Status"
                  value={chapter.status}
                  onChange={(e) => handleChapterChange(index, "status", e.target.value)}
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
            {id ? "Update" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SyllabusUpdate;
