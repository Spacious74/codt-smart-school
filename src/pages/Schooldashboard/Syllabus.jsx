import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const App = () => {
  const [syllabuses, setSyllabuses] = useState([]);
  const [subject, setSubject] = useState('');
  const [schoolcode, setSchoolcode] = useState('');
  const [chapters, setChapters] = useState([{ chapter: '', progress: '' }]); 
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false); 
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false); 

  useEffect(() => {
    fetchSyllabuses();
    const storedSchoolCode = localStorage.getItem('schoolCode');
    if (storedSchoolCode) {
      setSchoolcode(storedSchoolCode);
    }
  }, []);
  const fetchSyllabuses = () => {
    const storedSchoolCode = localStorage.getItem('schoolCode');
    if (storedSchoolCode) {
      axios
        .get(`https://codtsmartschool.strangeweb.in/sallaybers.php?schoolcode=${storedSchoolCode}`)
        .then((response) => {
          setSyllabuses(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the syllabuses!', error);
        });
    }
  };
  const handleAddSyllabus = (e) => {
    e.preventDefault();
    const chaptersString = chapters.map(chapterData => `${chapterData.chapter} - ${chapterData.progress}`).join(', ');
    const newSyllabus = { subject, syllabus: chaptersString, schoolcode };

    axios
      .post('https://codtsmartschool.strangeweb.in/sallaybers.php', newSyllabus)
      .then((response) => {
        fetchSyllabuses();
        alert('Syllabus added successfully!');
        setSubject('');
        setSchoolcode('');
        setChapters([{ chapter: '', progress: '' }]); 
        setOpenAddDialog(false); 
      })
      .catch((error) => {
        console.error('There was an error adding the syllabus!', error);
      });
  };

  const handleAddChapter = () => {
    setChapters([...chapters, { chapter: '', progress: '' }]);
  };

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };
  const handleSyllabusSelect = (syllabus) => {
    setSelectedSyllabus(syllabus);
    setSubject(syllabus.subject);
    setSchoolcode(syllabus.schoolcode);
    setChapters(syllabus.syllabus.split(', ').map(ch => {
      const [chapter, progress] = ch.split(' - ');
      return { chapter, progress };
    }));
    setOpenUpdateDialog(true); 
  };

  const handleUpdateSyllabus = (e) => {
    e.preventDefault();
    const chaptersString = chapters.map(chapterData => `${chapterData.chapter} - ${chapterData.progress}`).join(', ');
    const updatedSyllabus = { id: selectedSyllabus.id, subject, syllabus: chaptersString, schoolcode };

    axios
      .put('https://codtsmartschool.strangeweb.in/sallaybers.php', updatedSyllabus)
      .then((response) => {
        fetchSyllabuses();
        alert('Syllabus updated successfully!');
        setSelectedSyllabus(null);
        setSubject('');
        setSchoolcode('');
        setChapters([{ chapter: '', progress: '' }]); 
        setOpenUpdateDialog(false); 
      })
      .catch((error) => {
        console.error('There was an error updating the syllabus!', error);
      });
  };
  const handleDeleteSyllabus = (id) => {
    axios
      .delete('https://codtsmartschool.strangeweb.in/sallaybers.php', { data: { id } })
      .then((response) => {
        fetchSyllabuses();
        alert('Syllabus deleted successfully!');
      })
      .catch((error) => {
        console.error('There was an error deleting the syllabus!', error);
      });
  };
  return (
    <div>
      <div className='slabers_button'>
        <Box textAlign="center" mb={3}>
          <Button
            variant="contained"
            onClick={() => setOpenAddDialog(true)}
            style={{ backgroundColor: '#503dff', color: '#fff' }}
          >
            Add New Syllabus
          </Button>
        </Box>
      </div>

      <Typography variant="h5" gutterBottom>Subjects</Typography>

      <div className='grid'>
        {syllabuses.map((syllabusItem) => (
          <div className='card' key={syllabusItem.id}>
            <span className='subject'>{syllabusItem.subject}</span>
            <div className='buttons_actions'>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleSyllabusSelect(syllabusItem)} // Open the update dialog
                startIcon={<Edit />}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteSyllabus(syllabusItem.id)}
                endIcon={<Delete />}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Dialog for Add New Syllabus */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Syllabus</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddSyllabus}>
            <TextField
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Box>
              {chapters.map((chapterData, index) => (
                <Box key={index} mb={2}>
                  <TextField
                    label={`Chapter ${index + 1}`}
                    value={chapterData.chapter}
                    onChange={(e) => handleChapterChange(index, 'chapter', e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <FormControl fullWidth required margin="normal">
                    <InputLabel>Progress</InputLabel>
                    <Select
                      value={chapterData.progress}
                      onChange={(e) => handleChapterChange(index, 'progress', e.target.value)}
                    >
                      <MenuItem value="100% completed in school">100% completed in school</MenuItem>
                      <MenuItem value="Currently Being Taught">Currently Being Taught</MenuItem>
                      <MenuItem value="Not Started">Not Started</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ))}
            </Box>
            <Button variant="outlined" onClick={handleAddChapter} sx={{ mb: 2 }}>
              + Add Chapter and Progress
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSyllabus} variant="contained" color="primary">
            Add Syllabus
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for Update Syllabus */}
      {selectedSyllabus && (
        <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
          <DialogTitle>Update Syllabus</DialogTitle>
          <DialogContent>
            <form onSubmit={handleUpdateSyllabus}>
              <TextField
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <Box>
                {chapters.map((chapterData, index) => (
                  <Box key={index} mb={2}>
                    <TextField
                      label={`Chapter ${index + 1}`}
                      value={chapterData.chapter}
                      onChange={(e) => handleChapterChange(index, 'chapter', e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <FormControl fullWidth required margin="normal">
                      <InputLabel>Progress</InputLabel>
                      <Select
                        value={chapterData.progress}
                        onChange={(e) => handleChapterChange(index, 'progress', e.target.value)}
                      >
                        <MenuItem value="100% completed in school">100% completed in school</MenuItem>
                        <MenuItem value="Currently Being Taught">Currently Being Taught</MenuItem>
                        <MenuItem value="Not Started">Not Started</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                ))}
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUpdateDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateSyllabus} variant="contained" color="primary">
              Update Syllabus
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default App;
