import React, { useState, useEffect, useMemo } from 'react';
import { fetchData } from '../../src/Service/apiService';
import {
  Box, Avatar, Typography, Button, Card, CardContent, CardActions, Grid, Link, Select,
  MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Academics from "./Manageteacher"

const Teachers = ({ setmanageteacher, setteacherData, teacherDetails }) => {

  const {
    id, first_name, last_name, email, phone_number, educational_board, address, city, pin_code,
    state, password, image, selected_subjects, class_selection, selected_divisions, experience,
  } = teacherDetails;

  // State to control dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State to store the edited data
  const [editedTeacherData, setEditedTeacherData] = useState({
    id, first_name, last_name, email, phone_number, educational_board, address, city, pin_code,
    state, password, image, selected_subjects, class_selection, selected_divisions, experience,
  });

  const handleManageClick = () => {
    setteacherData(teacherDetails);
    setmanageteacher(true);
  };

  const handleEditClick = () => {
    // Open the dialog for editing
    setIsDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/teacherapi/edit-teacher.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTeacherData), // Sending the updated data to the API
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message and close dialog
        alert('Teacher details updated successfully');
        setIsDialogOpen(false);
      } else {
        // Show error message
        alert(data.error || 'Failed to update teacher details.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleCloseDialog = () => {
    // Close the dialog without saving
    setIsDialogOpen(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        borderColor: '#bababa',
        alignItems: 'center',
        borderRadius: '14px',
        flexDirection: { xs: 'column', sm: 'row' },
        overflow: 'hidden', // Keep rounded corners clean
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: '16px' }, // Increase gap for better spacing
          padding: '16px',
        }}
      >
        <Avatar
          src={image} // Placeholder image
          sx={{
            width: 50,
            height: 50,
            mb: { xs: 2, sm: 0 },
            borderRadius: '50%',
            border: '2px solid #838383', // Add a border around the avatar
            transition: 'transform 0.3s ease', // Avatar hover effect
            '&:hover': {
              transform: 'scale(1.1)', // Avatar hover effect
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'center', sm: 'flex-start' },
            flexDirection: 'column',
            flexGrow: 1,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="h6" // Reduced font size
            sx={{
              fontWeight: 600, textTransform: 'capitalize',
              fontSize: { xs: '0.75rem', md: '1rem' }, // Reduced font size
              mb: { xs: 1, sm: 0 },
              color: '#333', // Darker text for better contrast
            }}
          >
            {first_name} {last_name} {/* Full name */}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ width: { xs: '100%', sm: 'auto' } }}>
        <Button onClick={handleManageClick} fullWidth variant="contained"
          sx={{
            backgroundColor: '#503dff',
            borderRadius: '8px',
            textTransform: 'none',
            width: '120px'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '6px' }} >
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M11.5 14.012a10.6 10.6 0 0 0-5.922 1.47c-1.415.842-5.125 2.562-2.865 4.715C3.816 21.248 5.045 22 6.59 22H12m3.5-15.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0M18 20.714V22m0-1.286a3.36 3.36 0 0 1-2.774-1.43M18 20.713a3.36 3.36 0 0 0 2.774-1.43M18 14.285c1.157 0 2.176.568 2.774 1.43M18 14.287a3.36 3.36 0 0 0-2.774 1.43M18 14.287V13m4 1.929l-1.226.788M14 20.07l1.226-.788M14 14.93l1.226.788M22 20.07l-1.226-.788m0-3.566a3.12 3.12 0 0 1 0 3.566m-5.548-3.566a3.12 3.12 0 0 0 0 3.566" color="currentColor" /></svg>
          Manage
        </Button>

        <Button onClick={handleEditClick} fullWidth variant="outlined" sx={{
          borderRadius: '8px',
          textTransform: 'none',
          width: '80px', marginRight: '16px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m15.214 5.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804L6.98 14.216c-1.045 1.046-1.568 1.568-1.924 2.205S4.342 18.561 4 20c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l8.234-8.234m-2.804-2.804l2.804 2.804M11 20h6" color="currentColor" /></svg>
          Edit
        </Button>

      </CardActions>

      {/* Dialog (Edit Form in Popup) */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Teacher Details</DialogTitle>
        <DialogContent>
          {/* Render all the fields dynamically */}
          <TextField
            label="First Name"
            variant="outlined"
            name="first_name"
            value={editedTeacherData.first_name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="last_name"
            value={editedTeacherData.last_name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={editedTeacherData.email}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phone_number"
            value={editedTeacherData.phone_number}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Educational Board"
            variant="outlined"
            name="educational_board"
            value={editedTeacherData.educational_board}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={editedTeacherData.address}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="City"
            variant="outlined"
            name="city"
            value={editedTeacherData.city}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Pin Code"
            variant="outlined"
            name="pin_code"
            value={editedTeacherData.pin_code}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="State"
            variant="outlined"
            name="state"
            value={editedTeacherData.state}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={editedTeacherData.password}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
            style={{ display: 'none' }} // Always hidden
          />
          <TextField
            label="Image URL"
            variant="outlined"
            name="image"
            value={editedTeacherData.image}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>

  );
};


const AllTeachers = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [assignmentData, setAssignmentData] = useState([]);
  const [syllabusData, setSyllabusData] = useState([]);
  const [show, setShow] = useState(false)
  const [examData, setExamData] = useState([]);

  const myschoolCode = localStorage.getItem("schoolCode");
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const { data: fetchedData, error: fetchError } = await fetchData(`SELECT * FROM students where schoolcode="${myschoolCode}" `);
      const { data: ExamData, error: ExamError } = await fetchData(`SELECT * FROM exams Where schoolcode="${myschoolCode}"`); // Replace with your actual SQL query
      const { data: Assignment, error: AssignmentError } = await fetchData(`
            SELECT 
                a.id AS assignment_id,
                a.title AS assignment_title,
                a.subject,
                a.total_marks,
                a.submission_date,
                a.applicable_class,
                a.questions,
                a.notes,
                a.created_at,
                a.divi,
                a.schoolcode,
                a.teacheremail,
                COUNT(s.id) AS submission_count
            FROM 
                assignments a
            LEFT JOIN 
                submitassinments s
            ON 
                a.id = s.aid
            WHERE 
                a.schoolcode = "${myschoolCode}"
            GROUP BY 
                a.id
          `);
      const { data: syllabusData, error: syllabusError } = await fetchData(`SELECT * FROM syllabus WHERE schoolcode="${myschoolCode}"`);

      if (fetchedData) {

        setData(fetchedData);
        setExamData(ExamData)
        setAssignmentData(Assignment)
        setSyllabusData(syllabusData);

      } else {

        setError(fetchError);

      }
      setLoading(false);


    };

    fetchDataAsync();
  }, []);


  const [manageteacher, setmanageteacher] = useState(false);
  const [teacherData, setteacherData] = useState({});


  // const teacherDetails = [
  //   { name: 'Mrs. Nipa Nayak', image: '' },
  //   { name: 'Mr. Sandip Ujwal', image: '' },
  //   { name: 'Mrs. Sejal Goswami', image: '' },
  //   { name: 'Mr. Ketan Patel', image: '' },
  // ];

  const classes = ['all','class 1', 'class 2', 'class 3', 'class 4', 'class 5', 'class 6', 'class 7', 'class 8'];

  const filteredData = useMemo(() => {
    if(searchTerm == 'all'){
      return data;
    }else{
      return data.filter((item) =>
        `${item.first_name?.toLowerCase() || ''} ${item.last_name?.toLowerCase() || ''}`.includes(searchTerm.slice(-1)?.toLowerCase() || '')
      );
    }
  }, [data, searchTerm]); 

  return (
    <>

      {!manageteacher ?
        <>
          <Box textAlign="start" >

            <Typography variant="h6" color="#8a8a8a" mb={3} fontWeight="bold">
              Students
            </Typography>

            <Grid container spacing={2} justifyContent="start" sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              {classes.map((className) => (
                <Grid item key={className} xs={12} sm="auto">

                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      width: { xs: '100%', sm: 'auto' },
                      marginBottom: { xs: '10px', sm: '0' },
                      backgroundColor: selectedClass === className ? '#503dff' : 'transparent',
                      color: selectedClass === className ? '#fff' : 'inherit', // Adjust text color for selected class
                      '&:hover': {
                        backgroundColor: selectedClass === className ? '#503dff' : '#503dff', // Set hover background color to #503DFF
                        color: '#fff', // Ensure text color stays white when hovered
                      },
                    }}
                    onClick={() => {
                      setSearchTerm(className.toLowerCase());
                      setSelectedClass(className); // Set the clicked class as selected
                      setShow(true);
                      console.log('Search Term:', className);
                    }}
                  >
                    {className}
                  </Button>

                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ height: 2, backgroundColor: '#c9c9c9', mt: 2, mb:3 }} />

          <Box >
            <Grid container direction="column" spacing={2}>
              {/* Check if filteredData has any content */}
              {filteredData.length > 0 ? (
                filteredData.map((teacherDetails, index) => (
                  <Grid item key={index}>
                    <Teachers
                      setmanageteacher={setmanageteacher}
                      setteacherData={setteacherData}
                      teacherDetails={teacherDetails}
                    />
                  </Grid>
                ))
              ) : (
                // Display a message if no data is found
                <Grid item>
                  <Typography variant="h6" color="textSecondary">
                    No students found for this class.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

        </>
        : <Academics setmanageteacher={setmanageteacher} assignmentData={assignmentData} examData={examData} teacherData={teacherData} syllabusData={syllabusData} />}
    </>
  );
};

export default AllTeachers;




