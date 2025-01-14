import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  TextField
} from "@mui/material";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  FaClipboardList,
  FaTasks,
  FaBook,
  FaChalkboardTeacher,
  FaQuestionCircle,
} from "react-icons/fa";
import prefor from "../../images/perfor.png";
import { fetchData } from '../../src/Service/apiService'; // Assuming you have this utility for fetching data



ChartJS.register(ArcElement, Tooltip, Legend);

const assignments = [
  {
    title: "Assignment 1",
    lastDate: "24 March 2024",
    status: "Submitted",
    score: "50/100",
    result: "PASS",
    resultColor: "green",
    statusColor: "green",
  },
  {
    title: "Environment Project",
    lastDate: "24 March 2024",
    status: "Pending",
    score: "0/100",
    result: "FAIL",
    resultColor: "red",
    statusColor: "red",
  },
  {
    title: "Science Report",
    lastDate: "24 March 2024",
    status: "Submitted",
    score: "39/100",
    result: "FAIL",
    resultColor: "red",
    statusColor: "green",
  },
];
const Exams = [
  {
    title: "Unit Test 1",
  },
  {
    title: "Unit Test 2",
  },
  {
    title: "Mid Term Exam",
  },
];
const Syllabus = [
  {
    title: "Mathematics",
    sessions: 30,
    completion: 60,
  },
  {
    title: "Science",
    sessions: 30,
    completion: 60,
  },
  {
    title: "Computer Science",
    sessions: 30,
    completion: 60,
  },
];

const AssignmentItem = ({ exam }) => {
  return (
    <Grid container spacing={2} display="flex" sx={{ mb: 2 }}>
      {/* Subject and Assignment Info */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6">{exam.subject}</Typography>
        <Typography variant="body1" fontSize={"12px"} mt={2}>
          Posted by
        </Typography>
        <Typography variant="body1" fontSize={"14px"} color="#503dff">
          {exam.teacheremail}
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="body1">{exam.title}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        textAlign={{ xs: "center", sm: "left" }}
        mt={{ xs: 1, sm: 0 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#503dff",
            color: "white",
            textTransform: "none",
            borderRadius: "20px",
            ":hover": {
              backgroundColor: "#4a37e2",
            },
          }}
          size="small"
          onClick={handleOpen}
        >
          Questions
        </Button>
      </Grid>

      {/* Dates */}
      <Grid item xs={12} md={3}>
        <Typography>
          Start Date: {new Date(exam.exam_date).toLocaleDateString()}
        </Typography>
        <Typography>
          End Date: {new Date(exam.exam_date).toLocaleDateString()}
        </Typography>
      </Grid>

      {/* Action Buttons */}
      <Grid item xs={12} alignItems={"center"} md={2}>
        <a
          href={exam.timetable_path}
          // Replace with your dynamic link
          target="_blank"
          rel="noopener noreferrer" // Adds security to prevent malicious tab hijacking
          style={{
            textDecoration: "none",
          }}
        >
          View TimeTable
        </a>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Questions</DialogTitle>
          <DialogContent>
            {/* {questionsArray.length > 0 ? (
              <List>
                {questionsArray.map((question, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={`${index + 1}. ${question.trim()}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No questions available.
              </Typography>
            )} */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Button
        variant="contained"
        sx={{
          width: '120px',
          fontSize: '0.75rem',
          padding: '6px 12px',
          maxHeight: '40px',
          mt: 1,
          ml: 2
        }}
      >
        Exam Instructions
      </Button> */}
      </Grid>

      {/* Edit Button */}
      {/* <Grid item xs={12} md={3} mt={5}>
      <Box sx={{ display: 'flex', flexDirection: "column", gap: 1, width: "50px" }}>
        <Button variant="outlined" color="success" sx={{ flexGrow: 1, backgroundColor: '#eb6a18', color: "white" }}>
          Edit
        </Button>
      </Box>
    </Grid> */}
    </Grid>
  );
};

const Academics = ({
  teacherData,
  examData,
  assignmentData,
  setmanageteacher,
  syllabusData
}) => {

  

  function updateAttendanceData(present, absent) {
    // Update the data array with new values
    attendanceData.datasets[0].data = [present, absent];
    // You can update the chart here if you're using a library like Chart.js
    chart.update(); // Assuming `chart` is your Chart.js instance
  }

  const students = [
    {
      name: "Mrs. Nipa Nayak",
      rating: 4.5,
      avatarUrl: "https://example.com/avatar1.jpg",
    }, // Replace with actual image URLs
    {
      name: "Mr. Sandip Ujwal",
      rating: 4.5,
      avatarUrl: "https://example.com/avatar2.jpg",
    },
    {
      name: "Mrs. Sejal Goswami",
      rating: 4.5,
      avatarUrl: "https://example.com/avatar3.jpg",
    },
    {
      name: "Mr. Ketan Patel",
      rating: 4.5,
      avatarUrl: "https://example.com/avatar4.jpg",
    },
  ];

  console.log("SyllabusData Data : ", syllabusData);


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openattdence, setOpenAttdence] = useState(false);
  const handleOpenAttdence = () => setOpenAttdence(true);
  const handleCloseAttdence = () => setOpenAttdence(false);
    const [uid, setUid] = useState('');  // To store user ID
    const [attendance, setAttendance] = useState('present');  // Set default attendance as "present"
    const [schoolCode, setSchoolCode] = useState('');  // To store school code
    const [message, setMessage] = useState('');  // To display success/error messages
    const [role, setRole] = useState('teacher');  // Default role is "teacher"
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState(null);  // To hold filtered data
    const [rowsPerPage] = useState(15); 
    const [reviewsData, setReviewsData] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null); // State to store selected review

    const [isPopupOpen, setIsPopupOpen] = useState(false);



    const [openQuestions, setOpenQuestions] = useState(false);

    const [dialogData, setDialogData] = useState(null); 


    const handleClickOpenQuestions = (q) => {
      setDialogData(q)
      setOpen(true);
    };


    const handleCloseOpen = () => {
      setOpen(false);
    };

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };

    

  const handleSubmit = async (event) => {
        
    event.preventDefault();

    // Prepare data to send to the API
    const data = {
        uid: teacherData.id,
        attendance: attendance,  // Attendance is always "present"
        school_code: teacherData.schoolcode,
        role: role  // Include the role in the data payload
    };

    try {
        // Make POST request to your PHP API
        const response = await axios.post('https://codtsmartschool.strangeweb.in/attendance.php', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.success) {
            setMessage('Attendance recorded successfully!');
             fetchAttendanceData()
        } else {
            setMessage('Error: ' + response.data.message);
        }
    } catch (error) {
        alert(error)
        setMessage('Error: Unable to record attendance.');
    }

};

// attdence..
const fetchAttendanceData = async () => {
  try {


      // Correct SQL Query: Ensure closing quotes are in place for role value
      const query = `SELECT * FROM attendance_table WHERE uid = ${teacherData.id} AND role = "teacher" ORDER BY id DESC `;
      const { data, error: fetchError } = await fetchData(query);

      if (fetchError) {
          console.error('Error fetching data:', fetchError);
          setError(fetchError);
          setLoading(false);
          return;
      }

      if (data && data.length > 0) {

        console.log('Attendance Data: ' + JSON.stringify(data));
          setFilteredData(data); // Initially set filtered data to all fetched data
          updateAttendanceData( 80 , 20 )
      } else {
          setError('No attendance data found');
      }


  } catch (error) {
      setError(error);
  } finally {
      setLoading(false);
  }
};

// Revies..
const fetchReviews = async () => {
  try {


    console.log( 'Teacher data ' + teacherData.schoolcode)
    console.log( ' School Code ' + teacherData.schoolcode)

    // SQL query to fetch reviews for the teacher
    const reviewsQuery = `
    SELECT 
        r.id AS review_id,
        r.review,
        r.created_at AS review_created_at,
        r.role,
        r.rating,
        r.sid,
        r.teachername,
        s.id AS student_id,
        s.first_name,
        s.last_name,
        s.phone_number,
        s.email,
        s.school_name,
        s.grade,
        s.divi,
        s.address,
        s.city,
        s.pin_code,
        s.state,
        s.subjects,
        s.image,
        s.rolenum,
        s.status,
        s.last_login
    FROM 
        reviews r
    JOIN 
        students s 
    ON 
        r.uid = s.id
    WHERE 
        r.uid = ${teacherData.id}
        AND r.school_code = '${teacherData.schoolcode}'
`;


    const { data: reviewsData, error: reviewsError } = await fetchData(reviewsQuery);

    if (reviewsError) {
      console.error('Error fetching reviews data:', reviewsError);
      setError(reviewsError);
      setLoading(false);
      return;
    }

    if (reviewsData && reviewsData.length > 0) {
      console.log('Reviews Data: ' + JSON.stringify(reviewsData));
      setReviewsData(reviewsData); // Store the fetched reviews data
    } else {
      setError('No reviews data found');
    }
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};

 
useEffect(() => {
  if (teacherData.id) {
      fetchAttendanceData();  // Fetch data when UID is available
      fetchReviews();
  }
}, [teacherData.id]);


const attdenceHistory = filteredData || [];

const total = 313;

// Calculate the percentage
const percentage = (total * attdenceHistory.length) / 100 ;


const attendanceData = {

datasets: [
  {
    data: [attdenceHistory.length, attdenceHistory.length - 313],
    backgroundColor: ["#d3d3d3", "#d3d3d3"], // Red and Blue colors
  },
]


};

console.log('assignmentData: ' + JSON.stringify(assignmentData));

const [openReviewDialog, setReviewOpenDialog] = useState(false);

const handleOpenReviewDialog = (reviewData) => {
  setReviewOpenDialog(true); // Open dialog
  setSelectedReview(reviewData);
};

const handleReviewCloseDialog = () => {
  setReviewOpenDialog(false); // Close dialog
};


  return (

    <Box p={3}>


      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        

        
        <Typography variant="h5" fontWeight="bold" color="#00000" mb={1}>
        Manage Students
        </Typography>


        <button
  onClick={() => {
    setmanageteacher(false);
  }}
  style={{
    backgroundColor: "#503dff", // Purple color
    color: "white",
    padding: "12px 24px", // Increased padding for a more spacious feel
    fontSize: "16px", 
    border: "none",
    borderRadius: "8px", // Rounded corners for a smoother look
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    transition: "background-color 0.3s, transform 0.2s", // Smooth transition effects
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#4023cc"; // Darker purple on hover
    e.target.style.transform = "scale(1.05)"; // Slight zoom effect on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#503dff"; // Reset to original color
    e.target.style.transform = "scale(1)"; // Reset zoom effect
  }}
>
  Back to Page
        </button>


      </div>

      


      {/* Profile Info */}
      <Box display="flex" alignItems="center" mt={2}>
        <Avatar alt="Sanket Pathak" sx={{ width: 110, height: 110 }} />
        <Box ml={2}>


          <Typography variant="h6" fontWeight="bold">
            {teacherData.first_name + " " + teacherData.last_name}
          </Typography>

         <Typography variant="h6" fontWeight="bold">
            ( {teacherData.email } )
          </Typography>

          <Typography variant="body1">
            {/* Faculty - {...teacherData.selected_subjects} */}
          </Typography>
        </Box>
      </Box>



      {/* Quick Actions */}

      <Box sx={{ overflowX: "auto", whiteSpace: "nowrap", mt: 4 }}>

      <Typography variant="h6" color="textSecondary" mb={2} sx={{ fontSize: "16px" }}>
  Quick Actions
      </Typography>


<div className="quick_actions_button" >


<div className="button_sapce" >
<Button
      variant="contained"
      sx={{
        backgroundColor: "#503dff",
        color: "white",
        width: "200px", // Set width to 150px
        borderRadius: "7px", // Set border-radius to 7px
        margin: 0, // Remove margin if any
        padding: 1.5,
        fontWeight: "bold",
      }}
    >
      Reviews
</Button>
</div>

<div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#503dff",
          color: "white",
          width: "200px",
          borderRadius: "7px",
          margin: 0,
          padding: 1.5,
          fontWeight: "bold",
        }}
        onClick={handleOpenAttdence}
      >
        Attendance
      </Button>

      <Dialog open={openattdence} onClose={handleCloseAttdence} className="width80"  >



        <Box sx={{ bgcolor: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>


                <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: 'black' }}>
                    Manage  Attendance
                </Typography>


             <div className="fx_center" >
             <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        {/* UID Field (Hidden) */}
                        <Grid item xs={3} sx={{ display: 'none' }}>
                            <TextField
                                label="UID"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                                required
                                sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                disabled
                            />
                        </Grid>

                        {/* Attendance Field (Hidden, Always "Present") */}
                        <Grid item xs={3} sx={{ display: 'none' }}>
                            <TextField
                                label="Attendance"
                                variant="outlined"
                                fullWidth
                                value="present"
                                sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                disabled
                            />
                        </Grid>

                        {/* School Code Field (Hidden) */}
                        <Grid item xs={3} sx={{ display: 'none' }}>
                            <TextField
                                label="School Code"
                                variant="outlined"
                                fullWidth
                                value={schoolCode}
                                onChange={(e) => setSchoolCode(e.target.value)}
                                required
                                sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                disabled
                            />
                        </Grid>

                        {/* Role Field (Hidden) */}
                        <Grid item xs={3} sx={{ display: 'none' }}>
                            <TextField
                                label="Role"
                                variant="outlined"
                                fullWidth
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={1}>
     

     <div className="app_buttotn" >

     <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
            backgroundColor: '#503dff',
            '&:hover': {
                backgroundColor: '#402cc0',
            },
            color: 'white',
            padding: '10px 20px',
            fontWeight: 'bold',
        }}
    >
        Mark
    </Button>

     </div>
 

                        </Grid>
                    </Grid>
                </form>
             </div>

                {/* Message Display (Optional) */}
                {message && (
                    <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center', color: message.includes('Error') ? 'red' : 'green' }}>
                        {message}
                    </Typography>
                )}


         <div style={containerStyle}>
            <h6 style={headerStyle}>History</h6>

            <div>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Attendance</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody> 
          {attdenceHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.attendance}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        </div>

        </Box>


        <DialogActions>
          <Button onClick={handleCloseAttdence} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
</div>

</div>



      </Box>

      {/* Performance and Attendance */}
      <Grid container spacing={1} mt={4}>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ padding: "10px", height: "200px" }}>
          <Grid
  container
  justifyContent="center"
  alignItems="center"
  sx={{
    height: "13.5rem",
    border: '1px solid #e8e8e8', // Border with the color #e8e8e8
    borderRadius: '8px', // Rounded corners
    padding: '10px', // Optional: add padding inside the Grid container
  }}
>
  <img
    src={prefor}
    alt="Performance Meter"
    style={{  
      maxWidth: "100%",
      height: "auto",
      borderRadius: '8px', // Optional: if you want to apply rounded corners to the image itself
    }}
  />
</Grid>

          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
        <Paper elevation={0} sx={{ padding: "10px" }}>
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    p={1}
    sx={{
      border: '1px solid #e8e8e8', // Adding the border with color #e8e8e8
      borderRadius: '8px', // Adding rounded corners, adjust value as needed
    }}
  >
    <Grid container spacing={2} justifyContent="center">
  
      <Grid item xs={12} md={6}>
        <Box
          mt={2}
          sx={{
            boxShadow: 'none', // Removing any shadow
            borderRadius: '8px', // Rounded corners for the Box
            padding: '10px', // Optional: add padding for internal space
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Attendance
          </Typography>
          <Typography variant="h3" color="primary" fontWeight="bold">
             {percentage + '%'} 
          </Typography>
          <Typography>
            You were present for <strong>{attdenceHistory.length} days</strong> out of{" "}
            <strong>313 days</strong>
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="148px" // Set your desired height here
          sx={{
            boxShadow: 'none', // Removing any shadow
            borderRadius: '8px', // Rounded corners for the Box
            padding: '10px', // Optional: add padding for internal space
          }}
        >
          <Doughnut data={attendanceData} />
        </Box>
      </Grid>

    </Grid>
  </Box>
</Paper>

        </Grid>

        <Grid item xs={12} md={4}>
        </Grid>

      </Grid>

         
{/* {this is for exam section} */}

<Box mt={4}>


      <Card variant="outlined"   sx={{
    borderColor: '#503dff', // Set the border color of the Card
    borderWidth: 1, // Optional: Adjust border width
  }} >
        <CardContent>
         
          <Typography variant="h6" fontWeight="bold"  sx={{
    mb: 2,
    mt: 4,
    alignContent: { sm: "center" },
    textAlign: { xs: "center", sm: "left" },
    fontWeight: 'bold', // Making the text bold
  }} >
            Assignments Posted by {teacherData.first_name} {teacherData.last_name}
          </Typography>

         
          <Box mt={2}>
            
          {assignmentData && assignmentData.length > 0 ? (


  assignmentData.map((assignment, index) => (

    <div className="assinmnet_grid">
        <div className="assinmne_name" > {assignment.assignment_title?.trim() || 'Untitled Assignment'} </div>
        <div className="last_date" > Last date to submit -{''} {assignment.submission_date && assignment.submission_date !== '0000-00-00' ? assignment.submission_date: 'N/A'}</div>
        <div className="questins" > <button onClick={() => handleClickOpenQuestions(assignment.questions)} >  ? Questions </button> </div>
        <div className="submitd_student" > {assignment.submission_count || '0'} students submitted </div>
    </div>

  ))
) : (
  // Fallback if no assignments are available
  <Typography variant="body1" color="textSecondary" textAlign="center">
    No assignments available.
  </Typography>
)}
 

          </Box>

          
          <Box mt={2} textAlign="center">
            {/* <Button
              variant="contained"
              style={{ backgroundColor: '#503dff', color: 'white', textTransform: 'none', borderRadius: '8px' }}
              sx={{
                width: { xs: '100%', sm: 'auto' }, 
              }}
            >
              See More
            </Button> */}
          </Box>
        </CardContent>
      </Card>


    </Box>

<Box border="1px solid#503dff" paddingLeft={3} mt={4} sx={{
    borderRadius: "8px", // Add border radius for rounded corners
  }} >


  <Typography variant="h5" sx={{ mb: 2, mt: 4 , alignContent:{sm:"center"} , fontWeight: 'bold', textAlign: { xs: "center", sm: "left" } }}>
  Exams Posted by {teacherData.first_name} {teacherData.last_name}
  </Typography>

  {examData?.length > 0 ? (
    examData.map((exam, index) => (
     

   <div className="exam_item" >
       <Grid
        container
        key={index}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: 2,
          flexWrap: { xs: "wrap", md: "nowrap" }, // Wrapping on mobile, no wrap on laptop
        }}
      >
        {/* Subject */}
        <Grid item xs={12} sm={6} md={2}>
       <Typography
  variant="h6"
  fontWeight="bold"
  textAlign={{ xs: "center", sm: "left" }}
  sx={{ fontSize: { xs: '0.5rem', sm: '0.9rem' } }}  // Adjust the font size as needed
>
  {exam.subject || "Subject"}
</Typography>

        </Grid>

        {/* Assignment Title */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="body1"
            textAlign={{ xs: "center", sm: "left" }}
            sx={{ fontSize: { xs: '0.5rem', sm: '0.9rem' } }}  // Adjust the font size as needed
          >
            {exam.title || "Untitled Assignment"}
          </Typography>
        </Grid>

        {/* Questions Button */}

        {/* Dates */}


<div className="exam_flex" >
  Date: {new Date(exam.exam_date).toLocaleDateString()}
</div>


        {/* Timetable Link */}
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          textAlign="center"
          sx={{ mt: { xs: 1, sm: 0 } }}
        >
          <a
            href={exam.timetable_path || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#503dff",
              fontWeight: "bold",
              fontSize: "13px"
            }}
          >
            TimeTable
          </a>
        </Grid>

        {/* Questions Dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Questions</DialogTitle>
          <DialogContent>

{dialogData}
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
   </div>



    ))
  ) : (
    <Typography textAlign="center">No exams posted yet.</Typography>
  )}
</Box>

      {/* Syllabus Section */}
       <Box mt={4}>
        <Card variant="outlined" sx={{
    borderColor: '#503dff', // Set the border color of the Card
    borderWidth: 1, // Optional: Adjust border width
    padding: 1
  }} >
          <CardContent>


            <div className="Syllabus" >
            <Typography variant="h6" fontWeight="bold">
              Syllabus Status
            </Typography>
            </div>
         

            <div>
      {syllabusData.length > 0 ? (
        syllabusData.map((course, index) => (

       <>
       

<div className="subject" >  {course.subject}  </div>


<div className="subject_buttom" >
{course.syllabus.split(',').map((item, idx) => (
  <span key={idx} className="cources_items" >
    {item}<br></br>
    {idx < course.syllabus.split(',').length - 1 && <br />}
  </span>
))}
</div>


       </>

          
        ))
      ) : (
        <p>No course data available</p>
      )}
    </div>

           
          </CardContent>
        </Card>
      </Box> 

      {/* Review Section */}
     <Box mt={4}>
        <Card variant="outlined">
          <Box sx={{ width: "auto", margin: 4, mt: 4 }}>

            <Typography variant="h5" sx={{ mb: 4 }}>
              What Teachers  think about {teacherData.first_name}  {teacherData.last_name}
            </Typography>

            {reviewsData.length > 0 ? (
  <div>


    {reviewsData.map((review, index) => (
      <div key={index}>

<Card
  variant="outlined"
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    p: 1,
    borderColor: "#503dff", // Set border color to #503dff
    borderWidth: 1, // Set border width
    borderRadius: "8px", // Set border radius to round corners
  }}
>


  <Grid container alignItems="center">

    <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} xs={7}>
    <Avatar src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt={review.name} sx={{ width: 56, height: 56 }} />
    <Typography variant="h6"> {review.first_name} {review.last_name}  </Typography>
    </Grid>

    <Grid item xs={3}>
      
      <Box display="flex" alignItems="center">



      <Typography variant="body2" sx={{ ml: 1 }}>
        </Typography>

        <Typography variant="body2" sx={{ ml: 1 }}>
          {review.rating}/5
        </Typography>

        <Rating
          name="read-only"
          value={review.rating}
          precision={0.5}
          readOnly
        />
   
      </Box>
    </Grid>

    <Grid item xs={1}>

    <Button
  variant="contained"
  color="primary"
  style={{
    backgroundColor: "#503dff",
    color: "white",
    textTransform: "none",
    borderRadius: "8px",
    marginBottom: "2px",
    padding: "5px 10px",
  }}
  sx={{
    width: "100px", // Set fixed width
  }}
  onClick={() => handleOpenReviewDialog(review)} 
>
  See More
    </Button>
   
    </Grid>
  </Grid>

</Card>

      </div>
    ))}
  </div>
) : (
  <p>No reviews available.</p>
)}


<Dialog open={openReviewDialog} onClose={handleReviewCloseDialog}>
  <DialogTitle>Review Details</DialogTitle>

  <DialogContent>
    {selectedReview && Object.keys(selectedReview).length > 0 ? (
      <div className="review-card">
        <h3 className="reviewer-name">
          {selectedReview.first_name} {selectedReview.last_name}
        </h3>

        <div className="review-header">
          <div className="review-rating">
            {"⭐".repeat(selectedReview.rating)}
            <span className="rating-text">({selectedReview.rating} / 5)</span>
          </div>
        </div>
        <p className="review-text">{selectedReview.review}</p>
        <style jsx>{`
          .review-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
            margin-bottom: 8px;
            padding-top: 10px;
          }
          .reviewer-name {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
            color: #333;
          }
          .review-rating {
            font-size: 16px;
            font-weight: 600;
            color: #f4c542;
          }
          .rating-text {
            font-size: 14px;
            color: #555;
            margin-left: 8px;
          }
          .review-text {
            font-size: 14px;
            line-height: 1.6;
            color: #555;
            margin-top: -10px;
          }
        `}</style>
      </div>
    ) : (
      <Typography variant="body2" color="textSecondary">
        No reviews available
      </Typography>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={handleReviewCloseDialog} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>



            {/* {students.map((student, index) => (


<Card
  key={index}
  variant="outlined"
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    p: 1,
    borderColor: "#503dff", // Set border color to #503dff
    borderWidth: 1, // Set border width
    borderRadius: "8px", // Set border radius to round corners
  }}
>
  <Grid container alignItems="center">
    <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} xs={7}>
      <Avatar src={student.avatarUrl} alt={student.name} sx={{ width: 56, height: 56 }} />
      <Typography variant="h6">{student.name}</Typography>
    </Grid>
    <Grid item xs={3}>
      
      <Box display="flex" alignItems="center">
      <Typography variant="body2" sx={{ ml: 1 }}>
          {student.rating}/5
        </Typography>
        <Rating
          name="read-only"
          value={student.rating}
          precision={0.5}
          readOnly
        />
   
      </Box>
    </Grid>
    <Grid item xs={1}>
    <Button
  variant="contained"
  color="primary"
  style={{
    backgroundColor: "#503dff",
    color: "white",
    textTransform: "none",
    borderRadius: "8px",
    marginBottom: "2px",
    padding: "5px 10px",
  }}
  sx={{
    width: "100px", // Set fixed width
  }}
>
  See More
</Button>

    </Grid>
  </Grid>
</Card>




            ))} */}

            <Box mt={2} textAlign="center">
              {/* <Button
                variant="contained"
                style={{
                  backgroundColor: "#503dff",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "8px",
                  marginBottom: "5px",
                }}
                sx={{
                  width: { xs: "100%", sm: "auto" }, // Full-width on mobile
                }}
              >
                See More
              </Button> */}
            </Box>

          </Box>
        </Card>
      </Box> 
    </Box>

  );
};


// Styles for the component
const containerStyle = {
  padding: '20px',
  backgroundColor: '#f4f4f9',
};

const headerStyle = {
  textAlign: 'center',
  color: '#503dff',
  marginBottom: '20px',
  fontSize: '28px', // Increased font size
  fontWeight: 'bold',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const theadStyle = {
  backgroundColor: '#503dff',
  color: 'white',
  textAlign: 'left',
  padding: '15px', // Increased padding for better alignment
  fontSize: '18px', // Increased font size
};

const tbodyStyle = {
  backgroundColor: 'white',
  color: 'black',
};

const rowStyle = {
  borderBottom: '1px solid #ddd',
  padding: '12px', // Increased padding for better look
  textAlign: 'center',
};

const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const buttonStyle = {
  backgroundColor: '#503dff',
  color: 'white',
  border: 'none',
  padding: '12px 18px',
  margin: '0 5px',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '16px',
};

const filterStyle = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
};

const inputStyle = {
  padding: '10px',
  marginRight: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
};


export default Academics;

 