
// import React, { useState, useEffect } from "react";
// import {
//   Snackbar,
//   Alert,
//   Button,
//   TextField,
//   TextareaAutosize,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel
// } from "@mui/material";

// const NoticeForm = () => {
//   const [title, setTitle] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [body, setBody] = useState("");
//   const [posterId, setPosterId] = useState("1");
//   const [notificationFor, setNotificationFor] = useState("student"); // Default value "student"
//   const [schoolCode, setSchoolCode] = useState("N/A");
//   const [notices, setNotices] = useState([]);
//   const [editingNoticeId, setEditingNoticeId] = useState(null); // Track the notice being edited

//   // Toast notification state
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   // Fetch notices from the server
//   const fetchNotices = async () => {
//     try {
//       const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
//         method: "GET",
//       });

//       const result = await response.json();
//       if (result.status === "success") {
//         setNotices(result.data);
//       } else {
//         setSnackbarMessage("Error fetching notices: " + result.message);
//         setSnackbarSeverity("error");
//         setOpenSnackbar(true);
//       }
//     } catch (error) {
//       setSnackbarMessage("An error occurred while fetching notices.");
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//     }
//   };

//   // Fetch notices on component mount
//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   // Handle form submission for a new notice or updating an existing one
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       title,
//       short_description: shortDescription,
//       body,
//       poster_id: posterId,
//       notification_for: notificationFor,
//       school_code: schoolCode,
//     };

//     // If we're editing a notice, add the 'id' to the data
//     if (editingNoticeId) {
//       data.id = editingNoticeId;
//     }

//     try {
//       let response;

//       // If editing, send a PUT request, otherwise send a POST request
//       if (editingNoticeId) {
//         // For PUT, we need to send JSON data
//         response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json", // Set content type to application/json
//           },
//           body: JSON.stringify(data), // Convert the data to JSON string
//         });
//       } else {
//         // For POST, we use FormData
//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("short_description", shortDescription);
//         formData.append("body", body);
//         formData.append("poster_id", posterId);
//         formData.append("notification_for", notificationFor);
//         formData.append("school_code", schoolCode);

//         response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
//           method: "POST",
//           body: formData, // Send as FormData
//         });
//       }

//       const result = await response.json();
//       if (result.status === "success") {
//         setSnackbarMessage(editingNoticeId ? "Notice updated successfully!" : "Notice submitted successfully!");
//         setSnackbarSeverity("success");
//         setOpenSnackbar(true);
//         setTitle("");
//         setShortDescription("");
//         setBody("");
//         setPosterId("");
//         setNotificationFor("student"); // Reset to "student"
//         setSchoolCode("");
//         setEditingNoticeId(null); // Reset editing state
//         fetchNotices(); // Refetch notices to update the list
//       } else {
//         setSnackbarMessage("Error: " + result.message);
//         setSnackbarSeverity("error");
//         setOpenSnackbar(true);
//       }
//     } catch (error) {
//       setSnackbarMessage("An error occurred while submitting the notice.");
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//     }
//   };

//   // Handle DELETE request
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
//     if (confirmDelete) {
//       try {
//         // Prepare DELETE request
//         const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php", {
//           method: "DELETE",
//           body: new URLSearchParams({ id }), // Send the ID in the body
//         });

//         const result = await response.json();
//         if (result.status === "success") {
//           setSnackbarMessage("Notice deleted successfully!");
//           setSnackbarSeverity("success");
//           setOpenSnackbar(true);
//           fetchNotices(); // Refetch notices to update the list
//         } else {
//           setSnackbarMessage("Error: " + result.message);
//           setSnackbarSeverity("error");
//           setOpenSnackbar(true);
//         }
//       } catch (error) {
//         setSnackbarMessage("An error occurred while deleting the notice.");
//         setSnackbarSeverity("error");
//         setOpenSnackbar(true);
//       }
//     }
//   };

//   // Handle Edit request
//   const handleEdit = (notice) => {
//     setEditingNoticeId(notice.id); // Set the ID of the notice being edited
//     setTitle(notice.title);
//     setShortDescription(notice.short_description);
//     setBody(notice.body);
//     setPosterId(notice.poster_id);
//     setNotificationFor(notice.notification_for); // Set the selected radio button value
//     setSchoolCode(notice.school_code);
//   };

//   // Close the Snackbar after it's open
//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <div>
//       <h2>{editingNoticeId ? "Edit Notice" : "Submit a Notice"}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <TextField
//             label="Short Description"
//             variant="outlined"
//             fullWidth
//             value={shortDescription}
//             onChange={(e) => setShortDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <TextareaAutosize
//             minRows={4}
//             placeholder="Body"
//             style={{ width: "100%" }}
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             required
//           />
//         </div>
//         {/* <div>
//           <TextField
//             label="Poster ID"
//             variant="outlined"
//             fullWidth
//             value={posterId}
//             onChange={(e) => setPosterId(e.target.value)}
//             required
//           />
//         </div> */}

//         {/* Radio Buttons for Notification For */}
//         <div>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Notification For</FormLabel>
//             <RadioGroup
//               row
//               value={notificationFor}
//               onChange={(e) => setNotificationFor(e.target.value)}
//             >
//               <FormControlLabel value="student" control={<Radio />} label="Student" />
//               <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
//               <FormControlLabel value="school" control={<Radio />} label="School" />
//             </RadioGroup>
//           </FormControl>
//         </div>
// {/* 
//         <div>
//           <TextField
//             label="School Code"
//             variant="outlined"
//             fullWidth
//             value={schoolCode}
//             onChange={(e) => setSchoolCode(e.target.value)}
//             required
//           />
//         </div> */}
//         <div>
//           <Button variant="contained" type="submit">
//             {editingNoticeId ? "Update Notice" : "Submit Notice"}
//           </Button>
//         </div>
//       </form>

//       <h2>All Notices</h2>
//       <div>
//         {notices.length > 0 ? (
//           <ul>
//             {notices.map((notice) => (
//               <li key={notice.id}>
//                 <h3>{notice.title}</h3>
//                 <p>{notice.short_description}</p>
//                 <p>{notice.body}</p>
//                 <small>Poster ID: {notice.poster_id} | Notification For: {notice.notification_for}</small>
//                 <div>
//                   <Button variant="outlined" onClick={() => handleEdit(notice)}>Edit</Button>
//                   <Button variant="outlined" color="error" onClick={() => handleDelete(notice.id)}>Delete</Button>
//                 </div>
//                 <hr />
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No notices available.</p>
//         )}
//       </div>

//       {/* Snackbar for success/error messages */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default NoticeForm;



import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper, TextField, Box, FormControlLabel, ListItem, RadioGroup, Radio, List, Card, CardContent, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import axios from "axios";

const AdminNotice = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("adminId"); // Use localStorage instead of sessionStorage
    if (!admin) {
      navigate('/auth/adminlogin');
    }
  }, [navigate]);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [body, setBody] = useState("");
  const [posterId, setPosterId] = useState("1");
  const [notificationFor, setNotificationFor] = useState("student"); // Default value "student"
  const [schoolCode, setSchoolCode] = useState("N/A");
  const [notices, setNotices] = useState([]);
  const [editingNoticeId, setEditingNoticeId] = useState(null); // Track the notice being edited
  const [isvisible, setIsvisible] = useState(false)

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
  console.log("notice ", notices)
  const [isVisible, setvisible] = useState(false)
  return (
    <div>
      <Typography variant="h6" mt={2} mb={4} sx={{ color: "#503dff" }}>
        Notice
      </Typography>

      <Grid container spacing={2} justifyContent="start" mb={4}>
        <Grid item>
          <Button
            onClick={() => {
              setIsvisible(true)
            }}

            variant="contained"
            sx={{
              bgcolor: "white",
              color: "#503dff",
              boxShadow: 2,
              borderRadius: 2,
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            <Add sx={{ marginRight: 1, fontSize: "34px" }} />
            <Typography variant="body1">Add Notice</Typography>
          </Button>
        </Grid>
      </Grid>



      {isvisible ? <Box
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
          boxShadow: 2,
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label="Short Description"
          variant="outlined"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          multiline
          minRows={2}
          fullWidth
        />

        <TextField
          label="Body"
          variant="outlined"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          minRows={10}
          fullWidth
        />

        <Typography variant="body1">Target Audience:</Typography>
        <RadioGroup value={notificationFor} onChange={(e) => setNotificationFor(e.target.value)} row>
          <FormControlLabel value="students" control={<Radio color="primary" />} label="Students" />
          <FormControlLabel value="teachers" control={<Radio color="primary" />} label="Teachers" />
          <FormControlLabel value="school" control={<Radio color="primary" />} label="School" />
        </RadioGroup>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#6B50FF",
            color: "#FFF",
            alignSelf: "flex-end",
            ":hover": { backgroundColor: "#5638D6" },
          }}
        >
          {editingNoticeId ? "Update Notice" : "Create Notice"}
        </Button>
      </Box> : null}

      <Typography variant="h5" mt={2} color="#4d4d4d">
        Latest Notice
      </Typography>
      {/* <List>
              {notices.map((notice) => (
                  <ListItem key={notice.id}>
                      <ListItemText primary={notice.title} secondary={notice.short_description} />
                      <Button onClick={() => handleEdit(notice)}>Edit</Button>
                      <Button onClick={() => handleDelete(notice.id)}>Delete</Button>
                  </ListItem>
              ))}
          </List> */}

      <Box sx={{ padding: 2 }}>
        {notices.map((notice, index) => (
          <Card key={index} sx={{ mb: 2, backgroundColor: "#f9f9f9" }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h6" gutterBottom>
                    {notice.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {notice.short_description.length > 30
                      ? notice.short_description.slice(0, 30)
                      : notice.short_description}
                    <span
                      onClick={() => setvisible(!isVisible)}
                      style={{ color: "#503dff", cursor: "pointer" }}
                    >
                      {notice.short_description.length > 30 ? ' ...See More' : ''}
                    </span>
                  </Typography>
                  {isVisible && (
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                      {notice.body}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Box sx={{ display: "flex", gap: "10px", marginLeft: { md: 5 } }}>
                    {/* <Button
                    onClick={() => handleEdit(notice)}
                    variant="contained"
                    sx={{
                      backgroundColor: "#503dff",
                      color: "#fff",
                      marginTop: "10px",
                    }}
                  >
                    Edit
                  </Button> */}
                    <Button
                      onClick={() => handleDelete(notice.id)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#503dff",
                        color: "#fff",
                        marginTop: "10px",
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

    </div>
  );
};

export default AdminNotice;
