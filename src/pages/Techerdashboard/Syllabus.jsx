import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Syllabus = () => {

  
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schoolCode, setSchoolCode] = useState('');
  const [syllabusData, setSyllabusData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [chapters, setChapters] = useState('');
  const [completed, setCompleted] = useState(0);
  const [status, setStatus] = useState('active');

  // Fetch school code from localStorage when the component mountss
  useEffect(() => {
    const schoolCodel = localStorage.getItem('schoolCode');
    setSchoolCode(schoolCodel);
    console.log('School Code:', schoolCodel);
  }, []);

  // Fetch the list of subjects
  const fetchSyllabus = async () => {
    if (!schoolCode) return;

    try {
      const query = `SELECT id, subject FROM syllabus WHERE schoolcode = '${schoolCode}'`;
      const response = await axios.get('https://codtsmartschool.strangeweb.in/sallaybers.php', { params: { query } });

      if (response.data && response.data.length > 0) {
        setSubjects(response.data);
      } else {
        setError('No subjects found');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch syllabus details for a specific subject
  const fetchSubjectSyllabus = async (subjectId) => {
    if (!subjectId) return;

    try {
      const query = `SELECT * FROM syllabus_details WHERE subject_id = '${subjectId}'`;
      const response = await axios.get('https://codtsmartschool.strangeweb.in/sallaybers.php', { params: { query } });

      if (response.data) {
        setSyllabusData(response.data);
      } else {
        setError('No syllabus data found');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (schoolCode) {
      fetchSyllabus();
    }
  }, [schoolCode]);

  const handleSubjectClick = (subjectId) => {
    fetchSubjectSyllabus(subjectId); // Fetch syllabus data for the clicked subject
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      subject,
      syllabus,
      schoolcode: schoolCode,
      chapters,
      completed,
      status,
    };

    try {
      const response = await axios.post('https://codtsmartschool.strangeweb.in/sallaybers.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response from the server
      if (response.data.message === "Data inserted successfully") {
        setMessage("Syllabus data saved successfully!");
        setDialogOpen(false); // Close the dialog
      } else {
        setMessage("Error saving syllabus data.");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Server error: ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        setMessage("No response from the server.");
      } else {
        setMessage("There was an error submitting the data.");
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <>
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Syllabus
        </Typography>

        {/* Subjects Grid */}
        <Typography variant="h6" gutterBottom>
          Subjects
        </Typography>
        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid item xs={6} sm={4} md={3} key={subject.id}>
              <Button
                variant="outlined"
                sx={{
                  width: '100%',
                  height: '80px',
                  borderColor: '#4b56d2',
                  color: 'black',
                  textTransform: 'capitalize',
                  fontSize: '1.1rem',
                }}
                onClick={() => handleSubjectClick(subject.id)} // Fetch syllabus data for this subject
              >
                {subject.subject} {/* Displaying subject name */}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Display syllabus data for the selected subject */}
        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            Syllabus Data
          </Typography>
          {syllabusData.length > 0 ? (
            <List>
              {syllabusData.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`Chapter: ${item.chapter_name}`}
                    secondary={`Progress: ${item.progress}%`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No syllabus data available for this subject.</Typography>
          )}
        </Box>

        {/* Button to Open Dialog for Adding New Syllabus */}
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)} sx={{ marginTop: 4 }}>
          Add New Syllabus
        </Button>

        {/* Dialog to Add/Edit Syllabus */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Add New Syllabus</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                margin="normal"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <TextField
                label="Syllabus Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
              />
              <TextField
                label="Chapters"
                variant="outlined"
                fullWidth
                margin="normal"
                value={chapters}
                onChange={(e) => setChapters(e.target.value)}
              />
              <TextField
                label="Completion Status"
                variant="outlined"
                fullWidth
                margin="normal"
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
                type="number"
              />
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* Success/Failure Message */}
        {message && (
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Syllabus;
