
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, TextField, Button, Box, Typography, 
  Checkbox, List, ListItem, ListItemText, FormControlLabel, RadioGroup, Radio, Dialog, DialogActions, 
  DialogContent, DialogTitle, } from '@mui/material';
import NoticeCard from './Noticecard.jsx';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchData } from '../../src/Service/apiService'; // Adjust the path as necessary
import { format } from 'date-fns';
import Divider from '@mui/material/Divider';
const API_URL = 'https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php';
const Notices = () => {


  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [body, setBody] = useState("");
  const [posterId, setPosterId] = useState("1");
  const [notificationFor, setNotificationFor] = useState("student"); // Default value "student"
  const [schoolCode, setSchoolCode] = useState("GA99");
  const [notices, setNotices] = useState([]);
  const [editingNoticeId, setEditingNoticeId] = useState(null); // Track the notice being edited
  const [openModal, setOpenModal] = useState(false);
  const [modalNotice, setModalNotice] = useState(null);

  // date formater using date-fns library 
  const formatDate = (dateString) => {
    // this format() method is imported from date-fns library
    return format(new Date(dateString), 'dd MMM, yyyy');
  };

  // Toast notification state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch notices from the server
  const fetchNotices = async () => {
    try {
      const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
        method: "GET",
      });

      const result = await response.json();
      if (result.status === "success") {
        // here we are sorting results accroding to latest notice first
        result.data = result.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setNotices(result.data);
      } else {
        setSnackbarMessage("Error fetching notices: " + result.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred while fetching notices.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle form submission for a new notice or updating an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      short_description: shortDescription,
      body,
      poster_id: posterId,
      notification_for: notificationFor,
      school_code: schoolCode,
    };

    // If we're editing a notice, add the 'id' to the data
    if (editingNoticeId) {
      data.id = editingNoticeId;
    }

    try {
      let response;

      // If editing, send a PUT request, otherwise send a POST request
      if (editingNoticeId) {
        // For PUT, we need to send JSON data
        response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set content type to application/json
          },
          body: JSON.stringify(data), // Convert the data to JSON string
        });
      } else {
        // For POST, we use FormData
        const formData = new FormData();
        formData.append("title", title);
        formData.append("short_description", shortDescription);
        formData.append("body", body);
        formData.append("poster_id", posterId);
        formData.append("notification_for", notificationFor);
        formData.append("school_code", schoolCode);

        response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
          method: "POST",
          body: formData, // Send as FormData
        });
      }

      const result = await response.json();
      if (result.status === "success") {
        setIsvisible(false)
        setSnackbarMessage(editingNoticeId ? "Notice updated successfully!" : "Notice submitted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTitle("");
        setShortDescription("");
        setBody("");
        setPosterId("");
        setNotificationFor("student"); // Reset to "student"
        setSchoolCode("");
        setEditingNoticeId(null); // Reset editing state
        fetchNotices(); // Refetch notices to update the list
      } else {
        setSnackbarMessage("Error: " + result.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred while submitting the notice.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Handle DELETE request
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (confirmDelete) {
      try {
        // Prepare DELETE request
        const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
          method: "DELETE",
          body: new URLSearchParams({ id }), // Send the ID in the body
        });

        const result = await response.json();
        if (result.status === "success") {
          setSnackbarMessage("Notice deleted successfully!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          fetchNotices(); // Refetch notices to update the list
        } else {
          setSnackbarMessage("Error: " + result.message);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      } catch (error) {
        setSnackbarMessage("An error occurred while deleting the notice.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  // Handle Edit request
  const handleEdit = (notice) => {
    setEditingNoticeId(notice.id); // Set the ID of the notice being edited
    setTitle(notice.title);
    setShortDescription(notice.short_description);
    setBody(notice.body);
    setPosterId(notice.poster_id);
    setNotificationFor(notice.notification_for); // Set the selected radio button value
    setSchoolCode(notice.school_code);
  };

  // Close the Snackbar after it's open
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleReadClick = (notice) => {
    setModalNotice(notice);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalNotice(null);
  }

  const [isvisible, setIsvisible] = useState(false)
  //   console.log("notificationFor ", notices)
  return (

    <>
      {isvisible ? <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          border: '1px solid #503dff',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px auto',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000' }}>
          Post New Notice
        </Typography>


        <RadioGroup value={notificationFor} onChange={(e) => setNotificationFor(e.target.value)} row>
          <FormControlLabel value="students" control={<Radio />} label="Students" />
          <FormControlLabel value="teachers" control={<Radio />} label="Teachers" />
          {/* <FormControlLabel value="school" control={<Radio />} label="School" /> */}
        </RadioGroup>


        <TextField
          label="School Code"
          value={schoolCode}
          onChange={(e) => setSchoolCode(e.target.value)} // Handle school code change
          fullWidth
        />
        <TextField
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#503dff' } }}
          variant="outlined"
        />
        <TextField
          label="shortDescription"
          name="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#503dff' } }}
          variant="outlined"
          multiline
          rows={4}
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#503dff',
            color: '#fff',
            marginTop: '20px',
            '&:hover': { backgroundColor: '#3b2cb3' },
            maxWidth: '300px',
          }}
          fullWidth
        >
          {editingNoticeId ? 'Update Notice' : 'Create Notice'}
        </Button>
      </Box> : null}

      <Box sx={{ backgroundColor: '#f9f9f9' }}>


        <Typography variant="h6" sx={{ mb: 2, color: '#7d7d7d', fontWeight: 'bold' }}>
          Latest Notice
        </Typography>

        {notices.map((notice, index) => {

          // This is the logic for displaying the divider line according to the next month
          const currentDate = new Date(notice.created_at);
          const nextDate = index < notices.length - 1 ? new Date(notices[index + 1].created_at) : null;
          const isDifferentMonth = nextDate && (currentDate.getMonth() !== nextDate.getMonth() ||
            currentDate.getFullYear() !== nextDate.getFullYear());

          return (
            <>
              <Card sx={{ mb: 2, backgroundColor: '#ffffff', borderRadius: '10px' }} variant="outlined" key={index} >
                <CardContent>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={9}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {notice.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom className='showMoreText' >
                        {notice.short_description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#2f9e58', fontWeight: 'bold' }} color="textSecondary">
                        Posted at {formatDate(notice.created_at)}
                      </Typography>
                      {/* <Typography variant="body2" sx={{ color:  'gray', mt: 1 }}>
               Notification For: {notice.notification_for}
               </Typography> */}
                    </Grid>
                    <Grid item>
                      <Button variant="contained" onClick={()=>{handleReadClick(notice)}}
                        sx={{ backgroundColor: '#503dff', color: '#fff', padding: '5px 28px', textTransform: "capitalize" }}
                      >
                        Read
                      </Button>
                      {/* <Button
                    onClick={() => {
                      setIsvisible(true);
                      handleEdit(notice);
                    }}
                    variant="contained"
                    sx={{ backgroundColor: '#503dff', color: '#fff', marginTop: '10px', marginRight: '10px' }} // Added marginRight
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setIsvisible(true);
                      handleDelete(notice.id);
                    }}
                    variant="contained"
                    sx={{ backgroundColor: '#503dff', color: '#fff', marginTop: '10px' }}
                  >
                    Delete
                  </Button> */}
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>

              {/* This line appears after ending of a month */}
              {isDifferentMonth && <Divider sx={{ height: 2, backgroundColor: '#c9c9c9', mb: 2 }} />}

            </>
          )
        })}

        {/* Modal to Show Full Description */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>{modalNotice?.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{modalNotice?.short_description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

      </Box>
    </>
  );
};

export default Notices;
