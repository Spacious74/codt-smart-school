import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Syllabus = () => {

  const [syllabuses, setSyllabuses] = useState([]);
  const [subject, setSubject] = useState('');
  const [schoolcode, setSchoolcode] = useState('');
  const [chapters, setChapters] = useState([{ chapter: '', progress: '' }]);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  useEffect(() => {
    const storedSchoolCode = localStorage.getItem('schoolCode');
    if (storedSchoolCode) {
      setSchoolcode(storedSchoolCode);
    }
    fetchSyllabuses();
  }, []);

  const fetchSyllabuses = async () => {
    const storedSchoolCode = localStorage.getItem('schoolCode');
    if (storedSchoolCode) {
      try {
        const query = `SELECT id, subject FROM syllabus WHERE schoolcode = '${storedSchoolCode}'`;
        const response = await axios.get('https://codtsmartschool.strangeweb.in/sallaybers.php', { params: { query } });
        if (response) {
          setSyllabuses(response.data.data);
        }

      } catch (error) {
        console.error('There was an error while fetching the syllabus!', error);
      }
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
    <>
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

        <div style={{ gap: '20px', display: 'flex', flexWrap: 'wrap', marginTop: '30px' }}>
          {syllabuses && syllabuses.map((syllabusItem) => (
            <div key={syllabusItem.id}
              style={{
                display: 'flex', flexDirection: 'column', gap: '10px', border: 'solid 1px #503dff', padding: '20px',
                borderRadius: '14px'
              }} >
              <span className='subject'>{syllabusItem.subject}</span>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSyllabusSelect(syllabusItem)} // Open the update dialog
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="m16.214 4.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804l-5.234 5.234c-1.045 1.046-1.568 1.568-1.924 2.205S8.342 14.561 8 16c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l5.234-5.234m-2.804-2.804l2.804 2.804" /><path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3" /></g></svg> Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteSyllabus(syllabusItem.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor" /></svg> Delete
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
    </>
  );
};

export default Syllabus;
