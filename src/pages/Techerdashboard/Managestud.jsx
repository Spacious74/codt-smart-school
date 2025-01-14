import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import {
  FaClipboardList,
  FaTasks,
  FaBook,
  FaChalkboardTeacher,
  FaQuestionCircle,
} from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chip } from "@mui/material";
// import AssignmentList from './Assignments';
import prefor from "../../images/perfor.png";
// import Techersreview from './Techerrevie.tsx';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../src/Service/apiService";
import Reviewtostud from './Reviewtostud'

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
      <Grid item xs={12} md={2}>
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

ChartJS.register(ArcElement, Tooltip, Legend);
const Academics = () => {


 

  const { studentId } = useParams();
  // Get the student ID from URL parameters
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examData, setExamData] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
 // console.log(examData)
 const [attendanceData, setAttendanceData] = useState(null);
 const [FilteredData, setFilteredData] = useState(null);

 const [uid, setUid] = useState('');
 const [totalDays, setTotalDays] = useState(0); // Total days in the period
 const [presentDays, setPresentDays] = useState(0); // Number of present days
 const [openDialog, setOpenDialog] = useState(false);

 const sid = localStorage.getItem('sid'); // Teacher ID (sid) from localStorage
  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true); // Set loading state

      try {
        const response = await fetch(
          `https://codtsmartschool.strangeweb.in/teacherapi/studentdetail.php?id=${studentId}`
        );
        const { data: ExamData, error: ExamError } = await fetchData(
          'SELECT * FROM exams Where schoolcode="GA99"'
        ); // Replace with your actual SQL query
        const { data: Assignment, error: AssignmentError } = await fetchData(
          'SELECT * FROM assignments Where schoolcode="GA99"'
        ); // Replace with your actual SQL query

        if (Assignment && ExamData) {
          setExamData(ExamData);
          setAssignmentData(Assignment);
        } else {
          alert("exam and assignment data not found");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Change `result` to `data`
          console.log("data yaha aagya hai");
          setStudentData(data.data); // Store the student data in state
        } else {
          throw new Error("Failed to fetch student data");
        } // Store the data in state
      } catch (err) {
        setError(err.message); // Set any error that occurs during fetch
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchStudentData(); // Call the fetch function
  }, [studentId]); // Dependency array includes studentId to refetch if it changes
  console.log("assignmentData is ", assignmentData);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const questionsArray = assignmentData[0]?.questions
    ? assignmentData[0]?.questions.split(",")
    : [];
 

 const fetchAttendanceData = async () => {
  try {
      const query = `SELECT * FROM attendance_table WHERE uid = ${sid};`;
      const { data, error: fetchError } = await fetchData(query);

      if (fetchError) {
          console.error('Error fetching data:', fetchError);
          setError(fetchError);
          setLoading(false);
          return;
      }

      if (data && data.length > 0) {
          setAttendanceData(data);
          setFilteredData(data); // Initially set filtered data to all fetched data
               // Calculate present days and total days from the fetched data
        const present = data.length; // Since the query already filters for present attendance
        const total = 313; // Total number of "present" days will be equal to length of filtered data

        setPresentDays(present);
        setTotalDays(total);
      } else {
        setError('No attendance data found');
      }
    } finally {
      setLoading(false);
    }
     
};

useEffect(() => {
  if (sid) {
      fetchAttendanceData();
  }
}, [sid]);
 // Attendance chart data
 const attendanceChartData = {
  datasets: [
    {
      data: [presentDays, totalDays - presentDays],
      backgroundColor: ['#41b8d5', '#6ce5e8'],
      cutout: '70%',
    },
  ],
};

// If loading, show a loading message
if (loading) {
  return <Typography>Loading attendance data...</Typography>;
}

// If there's an error, show the error message
if (error) {
  // If `error` is a non-string (like an object or array), we ensure it's converted to a string.
  return <Typography color="error">Error: {String(error) || 'Unknown error'}</Typography>;
}

// State to manage dialog visibility

// Function to handle opening of the dialog
const handleOpenDialog = () => {
  setOpenDialog(true);
};

// Function to handle closing of the dialog
const handleCloseDialog = () => {
  setOpenDialog(false);
};

  return (
    <Box p={3}>
      {/* Header Section */}
      <Box p={1}>
        {/* Header Section */}
        <Typography variant="h5" fontWeight="bold" color="#503dff" mb={1}>
          Student Profile
        </Typography>

        {/* Profile Info */}
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar
            src={`https://codtsmartschool.strangeweb.in/studentapi/${studentData?.image}`}
            alt="Sanket Pathak"
            sx={{ width: 56, height: 56 }}
          />
          <Box ml={2}>
            <Typography variant="h6" fontWeight="bold">
              {studentData?.first_name} {studentData?.last_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Quick Actions
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            overflowX: "auto", // Enable horizontal scrolling
            whiteSpace: "nowrap", // Prevent wrapping of buttons
            mt: 4,
          }}
        >
          <Grid
            container
            spacing={0} // Remove default spacing
            sx={{ display: "flex", gap: "5px" }} // Use flex display with custom gap
          >
            <Grid item xs={12} sm={2} md={2.2}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  width: { xs: "180px", sm: "190px" },
                  backgroundColor: "#503dff",
                  color: "white",
                }}
              >
               Update Exam Status
              </Button>
            </Grid>
            <Grid item xs={12} sm={2} md={2.5}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  width: { xs: "180px", sm: "220px" },
                  backgroundColor: "#503dff",
                  color: "white",
                }}
              >
                Update Assignments Status
              </Button>
            </Grid>
            <Grid item xs={12} sm={2} md={2.2}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            width: { xs: '180px', sm: '190px' },
            backgroundColor: '#503dff',
            color: 'white',
          }}
          onClick={handleOpenDialog}  // Open the dialog on button click
        >
          Give Reviews
        </Button>
      </Grid>

      {/* Dialog component */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Give Review</DialogTitle>
        <DialogContent>
          {/* Include your Reviewtostud component inside Dialog */}
          <Reviewtostud />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleCloseDialog} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
            <Grid item xs={12} sm={2} md={1.7}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  width: "180px",
                  backgroundColor: "#503dff",
                  color: "white",
                }}
              >
                Attendence
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Performance and Attendance */}
      <Grid container spacing={4} mt={4}>
        {/* Performance Section */}

        {/* Performance Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "10px", height: "200px" }}>
            {" "}
            {/* Set height to 500px */}
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ height: "100%" }}
            >
              {" "}
              {/* Ensure the grid takes full height */}
              <Grid item xs={12} md={6}>
                <Box
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={prefor}
                    alt="meter"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      marginTop: "-30px",
                    }}
                  />
                  {/* <Doughnut data={performanceData} /> */}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Attendance Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={1}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Box mt={2} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography variant="h6" fontWeight="bold">
                      Attendance
                    </Typography>
                    <Typography variant="h3" color="primary" fontWeight="bold">
                      {totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0}%
                    </Typography>
                    <Typography>
                      You were present for <strong>{presentDays}</strong> out of <strong>{totalDays}</strong> days
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{ width: { xs: 100, md: 150 }, height: { xs: 100, md: 150 } }}>
                      <Doughnut data={attendanceChartData} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" fontWeight={400} sx={{
          textAlign: { xs: "center", sm: "left" }, // Center on mobile, left-align on larger screens
        }}>
              Assignments
            </Typography>

            <Box mt={2}>
              {assignmentData?.map((assignment, index) => (
                <Grid
                  container
                  display={"flex"}
                  alignItems={"center"}
                  key={index}
                  spacing={2}
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    py: 1,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  {/* Assignment Title */}
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    textAlign={{ xs: "center", sm: "left" }}
                  >
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      fontWeight="bold"
                    >
                      {assignment.title
                        ? assignment.title.trim()
                        : "Untitled Assignment"}
                    </Typography>
                  </Grid>

                  {/* Submission Date */}
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    color={"#503dff"}
                    textAlign={{ xs: "center", sm: "left" }}
                  >
                    <Typography variant="body2" color={"#503dff"}>
                      Last date to submit -{" "}
                      {assignment.submission_date &&
                      assignment.submission_date !== "0000-00-00"
                        ? new Date(
                            assignment.submission_date
                          ).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                  </Grid>

                  {/* Questions Button */}
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
                      ? Questions
                    </Button>
                  </Grid>

                  {/* Total Marks */}

                  <Typography variant="body1" color="textPrimary">
                    Total Marks: {assignment.total_marks || "N/A"}
                  </Typography>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                  >
                    <DialogTitle>Questions</DialogTitle>
                    <DialogContent>
                      {questionsArray.length > 0 ? (
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
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        color="primary"
                        variant="contained"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              ))}
            </Box>

            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#503dff",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "8px",
                }}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                See More
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box border="1px solid #ddd" paddingLeft={3} mt={4}>
  <Typography variant="h5" sx={{ mb: 2, mt: 4 , alignContent:{sm:"center"}  ,  textAlign: { xs: "center", sm: "left" },}}
     >
    Exam List
  </Typography>

  {examData?.length > 0 ? (
    examData.map((exam, index) => (
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
          >
            {exam.subject || "Subject"}
          </Typography>
        </Grid>

        {/* Assignment Title */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="body1"
            textAlign={{ xs: "center", sm: "left" }}
          >
            {exam.title || "Untitled Assignment"}
          </Typography>
        </Grid>

        {/* Questions Button */}
        <Grid item xs={12} sm={6} md={2} textAlign="center">
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
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            variant="body2"
            textAlign={{ xs: "center", sm: "left" }}
          >
            Start Date: {new Date(exam.exam_date).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            textAlign={{ xs: "center", sm: "left" }}
          >
            End Date: {new Date(exam.exam_date).toLocaleDateString()}
          </Typography>
        </Grid>

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
            }}
          >
            TimeTable
          </a>
        </Grid>

        {/* Questions Dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Questions</DialogTitle>
          <DialogContent>
            {questionsArray.length > 0 ? (
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
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    ))
  ) : (
    <Typography textAlign="center">No exams posted yet.</Typography>
  )}
</Box>
     
    </Box>
  );
};

export default Academics;
