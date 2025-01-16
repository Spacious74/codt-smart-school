import { useEffect, useState } from 'react';
import {
  Box, Button, Grid, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, List, ListItem, ListItemText, MenuItem, FormControl, InputLabel, Select, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { fetchData } from '../../src/Service/apiService';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const ExamCard = () => {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [sid, setSid] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [studentData, setStudentData] = useState([]); // State for storing student data

  const handleClicksid = (id) => {
    setSid(id); // Save the newId to the state
  };

  const fetchDataAsync = async () => {
    const myschoolCode = localStorage.getItem("schoolCode");
    const query = `SELECT * FROM exams WHERE schoolcode="${myschoolCode}"`; // Dynamic query
    const { data: ExamData, error: ExamError } = await fetchData(query);

    if (ExamData) {
      setExamData(ExamData);
    } else {
      setError(ExamError);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);


  const deleteExam = async (examId) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) {
      return;
    }

    try {
      const response = await axios.get(
        `https://codtsmartschool.strangeweb.in/studentapi/del_exam.php?id=${examId}`
      );

      if (response.data.success) {
        setExamData((prevExams) => prevExams.filter((exam) => exam.id !== examId));
        toast.success("Exam deleted successfully.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the exam.");
      console.error(error);
    }
  };

  const fetchStudentData = async () => {
    const { data: studentData, error: studentError } =
      await fetchData('SELECT * FROM students'); // Replace with your actual SQL query

    if (studentData) {
      setStudentData(studentData); // Store student data in state
    } else {
      setError(studentError);
    }
  };

  // Function to handle dialog open
  const handleOpenDialog = (examId) => {
    setId(examId);
    setOpenDialog(true);
    fetchStudentData(); // Fetch student data when dialog opens
  };

  // Function to handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null); // Reset selected student when dialog closes
  };

  // Filter students based on the search query
  const filteredStudents = studentData.filter(student =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const [selectedStudent, setSelectedStudent] = useState(null);
  const [examData, setExamData] = useState({
    pass_fail: '',
    gail_marks: '',
  });


  const handleAddResult = (formData) => {
    fetch('https://codtsmartschool.strangeweb.in/studentapi/exam-result.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,  // Pass form data directly
        sid: selectedStudent.id, // Include the selected student's ID
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          toast.success('Result saved successfully!');  // Success toast
          handleCloseDialog();  // Close dialog after success
        } else {
          toast.error(data.message || 'Failed to save result');  // Error handling
        }
      })
      .catch((error) => {
        toast.error("An error occurred while saving the result.");
        console.error(error);
      });
  };


  const [formData, setFormData] = useState({
    eid: '',
    sid: '',
    pass_fail: '',
    gail_marks: '',
    pid: '',
    school_code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    const myschoolCode = localStorage.getItem("schoolCode");
    if (myschoolCode) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        school_code: myschoolCode,
      }));
    }
  }, []);

  const [responseMessage, setResponseMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending the data to the PHP backend
    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/exam-result.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',  // Content-Type for form data
        },
        body: new URLSearchParams(formData), // Encoding formData as URL parameters
      });

      const result = await response.text();
      console.log(result); // Logging the response from PHP

      if (response.ok) {
        alert('Data successfully saved');
      } else {
        alert('Error: Could not save data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while saving data');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>

      {/* Header Section */}
      <Link to="/school/academicschool/exam/create" style={{ textDecoration: 'none' }}>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              backgroundColor: '#eb6a18',
              padding: '12px', // Adjust padding as needed
              '&:hover': { backgroundColor: '#d35e16' }, // Optional hover effect
            }}
          >
            <AddIcon fontSize="large" />
          </Button>
        </Box>
        <Typography variant="h6">Post New Exam</Typography>

      </Link>


      {/* Exam List Section */}
      <Typography variant="h6" sx={{ mb: 2, mt: 5, fontWeight: 'bold' }}>
        Exams Posted By You
      </Typography>



      <Paper elevation={0} sx={{ padding: 3, border: 'solid 1px #cecece', borderRadius: '12px' }}>
        {examData?.length > 0 ? (
          examData.map((exam, index) => (

            <div className='exam_card' key={index}>

              <div>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }} >{exam.subject}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }} >Posted By</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#503dff' }} >{exam.teacheremail}</Typography>
                </Box>
              </div>

              <div  id='bold' >
                {exam.title}
              </div>


              <div>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                    Start Date: {new Date(exam.exam_date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                    End Date: {new Date(exam.exam_end_date)?.toLocaleDateString() || ''}
                  </Typography>
                </Box>
              </div>


              <div>
                <Button
                  variant="contained"
                  href={exam.timetable_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mb: 1,
                    backgroundColor: '#503dff',
                    color: '#fff',
                    borderRadius: 2,
                    '&:hover': { backgroundColor: '#4030cc' },
                    width: '100%'
                  }}
                >
                  View TimeTable
                </Button><br></br>
                <Button
                  variant="contained"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: '#503dff',
                    color: '#fff',
                    width: '100%',
                    borderRadius: 2,
                    '&:hover': { backgroundColor: '#4030cc' },
                  }}
                >
                  Instructions
                </Button>
              </div>

              <div>

                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpenDialog(exam.id);
                    setFormData((prev) => ({ ...prev, eid: exam.id }));
                  }}
                  sx={{
                    minWidth: 120,
                    bgcolor: '#eb6a18',
                    color: '#fff',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#d35e16' },
                  }}
                >
                  Add Result
                </Button>

                <br></br>

                <Button variant="contained" color="error"
                  onClick={() => deleteExam(exam.id)} disabled={loading}
                  sx={{
                    minWidth: 120,
                    bgcolor: '#eb6a18',
                    color: '#fff',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#d35e16' },
                    marginTop: '10px'
                  }}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Delete'}
                </Button>

              </div>

            </div>

          ))
        ) : (
          <Typography variant="h6" color="text.secondary" align="center">
            No exams posted yet.
          </Typography>
        )}
      </Paper>

      {/* Dialog for Adding Results */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          {selectedStudent
            ? `Add Exam Result for ${selectedStudent.first_name} ${selectedStudent.last_name}`
            : 'Add Exam Result'}
        </DialogTitle>
        <DialogContent>
          {!selectedStudent ? (
            <>

              <TextField
                autoFocus
                margin="dense"
                label="Search Student"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Select Student
              </Typography>
              <List>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <ListItem
                      key={student.id}
                      secondaryAction={
                        <Button
                          variant="contained"
                          onClick={() => {
                            setSelectedStudent(student);
                            setFormData((prev) => ({ ...prev, sid: student.id }));
                          }}
                        >
                          Add
                        </Button>
                      }
                    >
                      <ListItemText primary={`${student.first_name} ${student.last_name}`} />
                    </ListItem>
                  ))
                ) : (
                  <Typography>No students found.</Typography>
                )}
              </List>
            </>
          ) : (

            <form onSubmit={handleSubmit}>

              <TextField
                type="text"
                name="eid"
                value={formData.eid}
                onChange={handleChange}
                sx={{ display: 'none' }} // Hides the field visually but keeps it in the form
              />
              <TextField
                type="text"
                name="sid"
                value={formData.sid}
                onChange={handleChange}
                sx={{ display: 'none' }} // Hides the field visually but keeps it in the form
              />
              <TextField
                type="text"
                name="pid"
                value={formData.pid}
                onChange={handleChange}
                sx={{ display: 'none' }} // Hides the field visually but keeps it in the form
              />
              <TextField
                type="text"
                name="school_code"
                value={formData.school_code}
                onChange={handleChange}
                sx={{ display: 'none' }} // Hides the field visually but keeps it in the form
              />

              {/* Pass/Fail */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Pass/Fail</InputLabel>
                    <Select
                      name="pass_fail"
                      value={formData.pass_fail}
                      onChange={handleChange}
                    >
                      <MenuItem value="Pass">Pass</MenuItem>
                      <MenuItem value="Fail">Fail</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Gail Marks */}
                <Grid item xs={12}>
                  <TextField
                    label="Gail Marks"
                    name="gail_marks"
                    value={formData.gail_marks}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Save Data
              </Button>
            </form>

          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default ExamCard;
