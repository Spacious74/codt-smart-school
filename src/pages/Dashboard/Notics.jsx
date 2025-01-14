import React ,  { useState, useEffect } from 'react';
import { Grid  , Card, CardContent, TextField, Button, Box, Typography, Checkbox , List, ListItem, ListItemText, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import NoticeCard from '../Schooldashboard/Noticecard.jsx';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchData } from '../../src/Service/apiService'; // Adjust the path as necessary

const API_URL = 'https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php';
const Notices = () => {







  const [notices, setNotices] = useState([]); // Renamed 'data' to 'notices' for clarity
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [body, setBody] = useState('');
  const [notificationFor, setNotificationFor] = useState('students');
  const [schoolCode, setSchoolCode] = useState('GA99'); // Set school code here
  const [editing, setEditing] = useState(null);
  const [isvisible , setIsvisible]=useState(false)

  // Fetch notices data from the 'notices' table based on the school code

  const fetchNoticesAsync = async () => {
    // Modify the query to filter by school_code
    const query = `SELECT * FROM notices WHERE school_code = '${schoolCode}' and notification_for='student' or school_code='N/A'`; 

    const { data: fetchedNotices, error: fetchError } = await fetchData(query); // Fetch data with the schoolCode filter

    if (fetchedNotices) {
        setNotices(fetchedNotices); // Update the state with fetched notices
    } else {
        console.error('Error fetching notices:', fetchError); // Add error handling
    }
};
  useEffect(() => {
    

      // Fetch notices based on the current schoolCode
      if (schoolCode) {
          fetchNoticesAsync();
      }
  }, []); // Fetch data whenever schoolCode changes

  const handleCreateOrUpdateNotice = async () => {
      const notice = {
          title,
          shortDescription,
          body,
          notificationFor,
          schoolCode,
      };

      try {
          if (editing) {
              notice.id = editing.id;
              await fetch(API_URL, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify(notice),
              });
              setIsvisible(false)
              fetchNoticesAsync()
          } else {
              await fetch(API_URL, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify(notice),
              });
              setIsvisible(false)
              fetchNoticesAsync()
          }
          clearForm();
      } catch (error) {
          console.error('Error saving notice:', error);
      }
  };

  const handleEdit = (notice) => {
      setTitle(notice.title);
      setShortDescription(notice.short_description);
      setBody(notice.body);
      setNotificationFor(notice.notification_for);
      setSchoolCode(notice.school_code);
      setEditing(notice);
  };

  const handleDelete = async (id) => {
      try {
          await fetch(API_URL, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ id }),
          });
          clearForm();
          fetchNoticesAsync()
      } catch (error) {
          console.error('Error deleting notice:', error);
      }
  };

  const clearForm = () => {
      setTitle('');
      setShortDescription('');
      setBody('');
      setNotificationFor('students');
      setSchoolCode('GA99'); // Reset to default dummy school code
      setEditing(null);
  };



  
  console.log("notificationFor ", notices)
  return (

    <>
    { isvisible?<Box
      component="form"
      // onSubmit={handleSubmit}
      sx={{
        border: '1px solid #503dff',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px auto',
      }} 
    >
      <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000' }}>
        Post New Notice
      </Typography>
     
       
      <RadioGroup value={notificationFor} onChange={(e) => setNotificationFor(e.target.value)} row>
                <FormControlLabel value="students" control={<Radio />} label="Students" />
                <FormControlLabel value="teachers" control={<Radio />} label="Teachers" />
                <FormControlLabel value="school" control={<Radio />} label="School" />
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
         onClick={handleCreateOrUpdateNotice}
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
        {editing ? 'Update Notice' : 'Create Notice'}
      </Button>
    </Box>
    :null}
    
    <Box sx={{ padding: 3 }}>
      {/* <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Button variant="outlined">Filter</Button>
          <Button variant="outlined" sx={{ ml: 1 }}>Sort by</Button>
         
            <Button variant="outlined" sx={{ ml: 1 }} onClick={()=>{setIsvisible(true)}}>Add a Notice</Button>
        
        </Grid>
      </Grid> */}

      <Typography variant="h5" sx={{ mb: 2 }}>
        Latest Notice
      </Typography>

      {notices.map((notice, index) => (
         <Card sx={{ mb: 2, backgroundColor: '#f9f9f9' }}>
         <CardContent>
           <Grid container alignItems="center" justifyContent="space-between">
             <Grid item xs={9}>
               <Typography variant="h6"  gutterBottom>
               {notice.title}
               </Typography>
               <Typography variant="body2" color="textSecondary">
                 {notice.short_description}
               </Typography>
               {/* <Typography variant="body2" sx={{ color:  'gray', mt: 1 }}>
               Notification For: {notice.notification_for}
               </Typography> */}
             </Grid>
             <Grid item>
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
      ))}

     

    </Box>
    </>
  );
};

export default Notices;
