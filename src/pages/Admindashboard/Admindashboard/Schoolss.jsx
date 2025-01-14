import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
 
  Grid,
  Select,
  MenuItem,
  Container, 
    TextField, 
    List, 
    ListItem, 
    ListItemText, 
    Typography, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from "@mui/material"
import { Add } from "@mui/icons-material"
// import school from "../../images/School.png"
import { Link, useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";

const SchoolEnrollment = () => {

  const primaryColor = "#503dff" // Define the primary color


  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editSchool, setEditSchool] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  console.log("schools " , schools)
//   const [SchoolData , setSchoolData]=useState({});
  
  const navigate=useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("adminId"); // Use localStorage instead of sessionStorage
        if (!admin) {
            navigate('/auth/adminlogin');
        }
  }, [navigate]);

    
  useEffect(() => {
      // Fetch data from PHP API
      axios.get('https://codtsmartschool.strangeweb.in/studentapi/manage-schools.php')
          .then(response => {
              if (response.data.success) {
                  setSchools(response.data.data);
                  setFilteredSchools(response.data.data); // Set initial filtered data
              } else {
                  console.error('No data found');
              }
          })
          .catch(error => {
              console.error('Error fetching school data:', error);
          })
          .finally(() => {
              setLoading(false);
          });
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
      const query = e.target.value.toLowerCase();
      setSearchQuery(query);

      // Filter the schools based on the search query
      const filtered = schools.filter(school =>
          school.school_name.toLowerCase().includes(query)
      );
      setFilteredSchools(filtered);
  };

  // Open edit dialog
  const handleEditClick = (school) => {
      setEditSchool(school);
      setEditDialogOpen(true);
  };

  // Close edit dialog
  const handleDialogClose = () => {
      setEditDialogOpen(false);
      setEditSchool(null);
  };
   
  


  // Handle edit form submission
  const handleEditSubmit = () => {
      axios.post('https://codtsmartschool.strangeweb.in/studentapi/manage-schools.php?action=edit', editSchool)
          .then(response => {
              if (response.data.success) {
                  // Update the school list with edited data
                  setSchools(schools.map(s => s.id === editSchool.id ? editSchool : s));
                  setFilteredSchools(filteredSchools.map(s => s.id === editSchool.id ? editSchool : s));
                  handleDialogClose();
              } else {
                  console.error('Failed to update school');
              }
          })
          .catch(error => {
              console.error('Error updating school data:', error);
          });
  };

  // Handle change in edit form fields
  const handleEditFieldChange = (e) => {
      const { name, value } = e.target;
      setEditSchool({ ...editSchool, [name]: value });
  };

  // Open delete dialog
const handleDeleteClick = async (school) => {
  // Set the school to be deleted and open the dialog
  setSchoolToDelete(school);
  setDeleteDialogOpen(true);

  // Make sure the id is valid
  if (!school.id || isNaN(school.id)) {
    setResponseMessage('Please enter a valid ID');
    return;
  }

  try {
    // Sending DELETE request to the PHP backend with the school id
    const response = await axios.delete('https://codtsmartschool.strangeweb.in/delete-school.php', {
      data: { id: school.id },  // Passing the ID in the body
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Handle the response from the backend
    if (response.data.success) {
      setResponseMessage(response.data.message);
    } else {
      setResponseMessage(response.data.message);
    }

  } catch (error) {
    setResponseMessage('An error occurred while trying to delete the record.');
    console.error(error);
  }
};


  // Handle delete confirmation
  const handleDeleteConfirm = () => {

      axios.post('https://codtsmartschool.strangeweb.in/studentapi/manage-schools.php?action=delete', { id: schoolToDelete.id })
      
          .then(response => {
              if (response.data.success) {
                  // Remove the deleted school from the state
                  setSchools(schools.filter(s => s.id !== schoolToDelete.id));
                  setFilteredSchools(filteredSchools.filter(s => s.id !== schoolToDelete.id));
                  setDeleteDialogOpen(false);
              } else {
                  console.error('Failed to delete school');
              }
          })
          .catch(error => {
              console.error('Error deleting school:', error);
          });

  };

  if (loading) {
      return  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <ClipLoader color="#000000" size={50} />
    </div>;
  }

  function handleManageClick(SchoolData){
  
    
        navigate('/admin/schools/details', { state: { SchoolData } });
    
    }



  return (

<Container>
  <Link to="/admin/schoolreg"> 
  <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ bgcolor: primaryColor, mb: 3 }}
      >
        Add new School
      </Button></Link>
     
            <Typography variant="h4" component="h1" gutterBottom>
                School List
            </Typography>

            <TextField
                label="Search Schools"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={handleSearchChange}
            />


            <Box sx={{ padding: 2 }}>
      {filteredSchools.map((school, index) => (


        <Card sx={{ mb: 2, backgroundColor: "#f9f9f9" }}>
<CardContent>

  <Grid container alignItems="center" justifyContent="space-between" spacing={2}> 
    {/* Logo and School Details */}
    <Grid item xs={12} sm={8} display="flex" alignItems="center">
    <Box
  component="img"
  src={
    school.logo 
      ? `https://codtsmartschool.strangeweb.in/studentapi/uploads/${school.logo}` 
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoaUnhjOAB7LJDgBg_FaAiO8Xlu02RG3z4OA&s"
  }
  alt="School Logo"
  sx={{ width: 50, height: 50, marginRight: 2, borderRadius: "50%" }}
/>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginX: 2,
          color: "black",
          flexGrow: 1,
          flexDirection: { xs: "column", sm: "row" }, // Column layout for mobile and row layout for larger screens
        }}
      >
        <Typography variant="body1" fontSize={"20px"} gutterBottom>
          {school.school_name}
        </Typography>
        <Typography variant="body2">
          {school.city}, {school.state}
        </Typography>
        <Typography variant="body2">
          School Code - {school.school_code || "GA99"}
        </Typography>
      </Box>
    </Grid>

    {/* Manage, Edit, and Delete Buttons */}
    <Grid item xs={12} sm={4}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px", flexWrap: "wrap" }}>
        <Button
          onClick={() => handleManageClick(school)}
          variant="contained"
          sx={{
            backgroundColor: "#503dff",
            color: "#fff",
            marginBottom: { xs: "10px", sm: 0 }, // Space for mobile view
            width: { xs: "100%", sm: "auto" }, // Full width on mobile
          }}
        >
          Manage
        </Button>

        <Button
          onClick={() => handleEditClick(school)}
          variant="contained"
          sx={{
            backgroundColor: "#503dff",
            color: "#fff",
            marginBottom: { xs: "10px", sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Edit
        </Button>

        <Button
          onClick={() => handleDeleteClick(school)}
          variant="contained"
          sx={{
            backgroundColor: "#503dff",
            color: "#fff",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Delete
        </Button>
      </Box>
    </Grid>
  </Grid>

</CardContent>
      </Card>
      
      ))}
    </Box>










            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Edit School Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit the details of the selected school.</DialogContentText>
                    <TextField
                        label="School Name"
                        fullWidth
                        margin="dense"
                        name="school_name"
                        value={editSchool?.school_name || ''}
                        onChange={handleEditFieldChange}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        margin="dense"
                        name="address"
                        value={editSchool?.address || ''}
                        onChange={handleEditFieldChange}
                    />
                    <TextField
                        label="City"
                        fullWidth
                        margin="dense"
                        name="city"
                        value={editSchool?.city || ''}
                        onChange={handleEditFieldChange}
                    />
                    <TextField
                        label="State"
                        fullWidth
                        margin="dense"
                        name="state"
                        value={editSchool?.state || ''}
                        onChange={handleEditFieldChange}
                    />
                    <TextField
                        label="Principal Name"
                        fullWidth
                        margin="dense"
                        name="principal_name"
                        value={editSchool?.principal_name || ''}
                        onChange={handleEditFieldChange}
                    />
                    <TextField
                        label="Contact Number"
                        fullWidth
                        margin="dense"
                        name="contact_number"
                        value={editSchool?.contact_number || ''}
                        onChange={handleEditFieldChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the school "{schoolToDelete?.school_name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
  )
}

export default SchoolEnrollment
