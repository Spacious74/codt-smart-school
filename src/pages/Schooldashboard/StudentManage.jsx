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
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useArrayService } from "../../src/Service/studentService";
import { fetchData } from '../../src/Service/apiService';

const AssignmentItem = ({ exam }) => {
  // console.log(examData)

  const [firstName, setFirstName] = useState(studentData.first_name);
  const [lastName, setLastName] = useState(studentData.last_name);
  const [phoneNumber, setPhoneNumber] = useState(studentData.phone_number);
  const [email, setEmail] = useState(studentData.email);
  const [schoolName, setSchoolName] = useState(studentData.school_name || "");
  const [grade, setGrade] = useState(studentData.grade || "");
  const [divi, setDivi] = useState(studentData.divi || "");
  const [address, setAddress] = useState(studentData.address || "");
  const [city, setCity] = useState(studentData.city || "");
  const [pinCode, setPinCode] = useState(studentData.pin_code || "");
  const [state, setState] = useState(studentData.state || "");
  const [subjects, setSubjects] = useState(studentData.subjects || "");
  const [password, setPassword] = useState(studentData.password || "");
  const [schoolCode, setSchoolCode] = useState(studentData.schoolcode || "");
  const [image, setImage] = useState(studentData.image || "");
  const [rolenum, setRolenum] = useState(studentData.rolenum || "");
  const [status, setStatus] = useState(studentData.status || "");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

   // Function to handle the "Edit" button click
   const editStudent = async () => {
    const updatedData = {
      id: studentData.id,  // Make sure the student ID is included
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      school_name: schoolName,
      grade: grade,
      divi: divi,
      address: address,
      city: city,
      pin_code: pinCode,
      state: state,
      subjects: subjects,
      password: password,
      schoolcode: schoolCode,
      image: image,
      rolenum: rolenum,
      status: status,
    };

    try {
      const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/edit_student.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Student updated successfully!");
      } else {
        alert("Failed to update student: " + result.message);
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("An error occurred while updating student.");
    }
  };

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

const assignments = [
  {
    title: "assignment 1",
    lastDate: "24 March 2024",
    status: "submitted",
    score: "50/100",
    result: "PASS",
    resultColor: "green",
    statusColor: "green",
  },
  {
    title: "environment project",
    lastDate: "24 March 2024",
    status: "Pending",
    score: "0/100",
    result: "FAIL",
    resultColor: "red",
    statusColor: "red",
  },
  {
    title: "science report",
    lastDate: "24 March 2024",
    status: "submitted",
    score: "39/100",
    result: "FAIL",
    resultColor: "red",
    statusColor: "green",
  },
];

// Dummy data for exams
const exams = [
  {
    subject: "Mathematics",
    lastDate: "10 April 2024",
  },
  {
    subject: "Physics",
    lastDate: "15 April 2024",
  },
  {
    subject: "Chemistry",
    lastDate: "20 April 2024",
  },
  {
    subject: "Biology",
    lastDate: "25 April 2024",
  },
];

ChartJS.register(ArcElement, Tooltip, Legend);

const Academics = ({
  studData,
  examData,
  assignmentData,
}) => {
  const performanceData = {
    datasets: [
      {
        data: [25, 50, 100],
        backgroundColor: ["#f3f4f6", "#503dff", "#cbd5e1"],
        borderWidth: 0,
      },
    ],
  };

  let retrievedStudentID = localStorage.getItem("studentID");
  console.log(`retrievedStudentID: ${retrievedStudentID}`);

  // Data for the attendance doughnut
  const attendanceData = {
    datasets: [
      {
        data: [73, 27],
        backgroundColor: ["#41b8d5", "#6ce5e8"],
        cutout: "70%",
      },
    ],
  };

  

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const questionsArray = assignmentData[0]?.questions
    ? assignmentData[0]?.questions.split(",")
    : [];


    // State to control popup visibility
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Function to toggle popup visibility
  const handleEditClick = () => {
    setPopupVisible(true);
    console.log("Edit button clicked");
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [matchedStudent, setMatchedStudent] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    school_name: '',
    grade: '',
    divi: '',
    address: '',
    city: '',
    pin_code: '',
    state: '',
    subjects: '',
    password: '',
    schoolcode: '',
    image: '',
    rolenum: '',
    status: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/edit-student.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id: formData.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          email: formData.email,
          school_name: formData.school_name,
          grade: formData.grade,
          divi: formData.divi,
          address: formData.address,
          city: formData.city,
          pin_code: formData.pin_code,
          state: formData.state,
          subjects: formData.subjects,
          password: formData.password,
          schoolcode: formData.schoolcode,
          image: formData.image,
          rolenum: formData.rolenum,
          status: formData.status,
        }),
      });

      const result = await response.text();
      if (response.ok) {
        alert('Record updated successfully.');
        setIsPopupOpen(false)
      } else {
        alert('Error updating record: ' + result);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update the record.');
    }
  };

  console.log("studData:", studData); // Check if studData is being populated correctly

  // Check if studData is not null/undefined before trying to access 'id'
  const studid = retrievedStudentID;
  console.log("studid:", studid); // Check if studid is extracted correctly
  useEffect(() => {
    // Ensure retrievedStudentID and student.id are both numbers for comparison
    if (studData.length > 0 && retrievedStudentID !== undefined) {
      console.log("retrievedStudentID:", retrievedStudentID);
      console.log("studData:", studData);

      // Ensure the comparison is done after typecasting to numbers (or strings, whichever is preferred)
      const matchedStudent = studData.find(student => Number(student.id) === Number(retrievedStudentID));

         if (matchedStudent) {
        console.log("Matched student data:", matchedStudent);
        setMatchedStudent(matchedStudent); // Save the matched student data
      } else {
        console.log("No student found with id:", retrievedStudentID);
        setMatchedStudent(null); // Clear the matched student if not found
      }
    }
  }, [studData, retrievedStudentID]); // This effect runs whenever studData or retrievedStudentID changes

 // Check if assignmentData is populated correctly
console.log("assignmentData:", assignmentData); 

// Map over assignmentData to extract ids, ensuring the id exists and is a string
const assignid = assignmentData?.map((assignment) => {
  if (assignment && assignment.id !== undefined) {
    // Ensure assignment.id is a string before calling trim()
    if (typeof assignment.id === 'string') {
      return assignment.id.trim();  // If it's a string, return it
    } else {
      return String(assignment.id).trim();  // Convert to string and trim if it's not a string
    }
  } else {
    return "Untitled Assignment";  // Return a default value if no id
  }
});

console.log("assignid:", assignid);  // Log the extracted ids
  

   const [assignmentAnsData, setAssignmentAnsData] = useState(null);  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDataAsync = async (assignid, studid) => {
    try {
      // Construct query to fetch assignment answers for the given student and assignment ID
      const query = `
        SELECT *
        FROM submitassinments
        WHERE aid = '${assignid}'  
        AND sid = '${studid}';   
      `;
      
      // Execute the query with fetchData (assuming fetchData is a utility function)
      const { data: assignmentAnsData, error: fetchError } = await fetchData(query);
      
      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError(fetchError);  // Set the error if there's any
        setLoading(false);     // Stop loading
        return;
      }

      // Handle the data if there is no error
      if (assignmentAnsData && assignmentAnsData.length > 0) {
        console.log('Assignment Answers Data:', assignmentAnsData);
        setAssignmentAnsData(assignmentAnsData);  // Set the fetched assignment answers data
      } else {
        console.error('No assignment answers found');
        setError('No assignment answers found');  // Set an error if no data is returned
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setError(error);  // Set the unexpected error
    } finally {
      setLoading(false);  // Always stop loading after the request is completed
    }
  };

  // Ensure `fetchDataAsync` is called with the correct arguments (assignid and studid)
  useEffect(() => {
    if (assignid && studid) {
      fetchDataAsync(assignid, studid);  // Pass the assignment ID and student ID
    }
  }, [assignid, studid]); // Run the effect when `assignid` or `studid` change

  // Render loading, error, or the fetched assignment answers data
  if (loading) {
    return <div>Loading...</div>;
  }


 const answersUrl = assignmentAnsData && assignmentAnsData[0]?.answers;
  
  return (
    <Box p={3}>

      {/* Header Section */}
      <Box p={1}>

        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
  <Typography variant="h5" fontWeight="bold" color="#503dff" mb={1}>
    Student Profile
  </Typography>
  
  <div>
      {matchedStudent ? (
        <div>
          {/* <h2>Student Details</h2>
          <p><strong>First Name:</strong> {matchedStudent.first_name}</p>
          <p><strong>Last Name:</strong> {matchedStudent.last_name}</p>
          <p><strong>Phone Number:</strong> {matchedStudent.phone_number}</p>
          <p><strong>Email:</strong> {matchedStudent.email}</p>
          <p><strong>Grade:</strong> {matchedStudent.grade || 'N/A'}</p>
          <p><strong>Status:</strong> {matchedStudent.status || 'N/A'}</p> */}
          {/* You can add other fields from matchedStudent as needed */}
        </div>
      ) : (
        <p>No student found with id: {retrievedStudentID}</p>
      )}
    <button
      onClick={() => {
        setManageStudent(false);
      }}
      style={{
      
      }}
    >
      Back to Page
    </button>


   

      {isPopupOpen && (
        <div style={{
          width:"50%",
          position: "fixed",
          top: "50%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}>


<div className="edit_form" >
      <h2>Update Student Information</h2>
    
    </div>


        </div>



      )}
      
      {isPopupOpen && (
        <div
          onClick={() => setIsPopupOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}


  </div>
</div>



        {/* Profile Info */}
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar
            // src={`https://codtsmartschool.strangeweb.in/studentapi/${studentData?.image}`}
            alt="Sanket Pathak"
            sx={{ width: 56, height: 56 }}
          />
          <Box ml={2}>
            <Typography variant="h6" fontWeight="bold">
            {matchedStudent?.first_name}    {matchedStudent?.last_name}
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


            <Grid item xs={12} sm={2} md={2.5}>
             
            </Grid>
            <Grid item xs={12} sm={2} md={2.2}>
              
            </Grid>
            <Grid item xs={12} sm={2} md={1.7}></Grid>
          </Grid>
        </Box>
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
  {/* Questions Button */}
  <Grid
                    item
                    xs={12}
                    sm={2}
                    textAlign={{ xs: "center", sm: "left" }}
                    mt={{ xs: 1, sm: 0 }}
                  > {answersUrl && (
        <Button
          component="a" // Makes the button act as a link
          href={answersUrl} // Use the assignment answer URL
          target="_blank" // Open the link in a new tab
          rel="noopener noreferrer" // Safe linking
          startIcon={<FaQuestionCircle />} // Icon for the button
          variant="contained"
          sx={{
            backgroundColor: "#089451",
            color: "white",
            textTransform: "none",
            borderRadius: "20px",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            width: { xs: "100%", sm: "auto" },
          }}
          size="small"
        >
          Submitted
        </Button>
      )}
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
      
    </Box>
  );
};

export default Academics;
