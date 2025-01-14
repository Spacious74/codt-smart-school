import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { fetchData } from "../../src/Service/apiService";

const SchoolAssignmentList = () => {


  const [data, setAssignmentData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const myschoolCode = localStorage.getItem("schoolCode");



  useEffect(() => {
    
    const fetchAssignments = async () => {
      const { data: Assignment, error: AssignmentError } = await fetchData(
        `SELECT * FROM assignments WHERE schoolcode="${myschoolCode}"`
      );
      if (Assignment) {
        setAssignmentData(Array.isArray(Assignment) ? Assignment : []);
      } else {
        setError(AssignmentError);
      }
      setLoading(false);
    };

    fetchAssignments();

  }, []);



  return (
    <Box sx={{ padding: 3 }}>
      {/* Header Section */}
      <Link to="/school/academicschool/assignment/create">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Button variant="contained" sx={{ mr: 2 }}>
            <AddIcon fontSize="large" />
          </Button>
          <Typography variant="h5">Post New Assignment</Typography>
        </Box>
      </Link>

      {/* Assignment List Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Assignments posted by you
      </Typography>
      <Paper elevation={0} sx={{ padding: 2, mb: 2 }}>
        {Array.isArray(data) && data.length > 0 ? (
          <AssignmentItem assignment={data} />
        ) : (
          <Typography>No assignments found.</Typography>
        )}
      </Paper>
    </Box>
  );
};




const AssignmentItem = ({ assignment }) => {
  const [assignmentData, setAssignmentData] = useState(assignment);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aid, setAid] = useState(assignment.aid || ''); 
  const [gainMarks, setGainMarks] = useState(''); 
  const [status, setStatus] = useState(''); 
  const [message, setMessage] = useState('');
  const [submitedData, setSubmitedAssignmentData] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false); 
  const [openDialog, setOpenDialog] = useState(false);
  const [openQuestionsDialog, setOpenQuestionsDialog] = useState(false); // New state for the Questions Dialog
  const [currentAid, setCurrentAid] = useState(null);
  const [viewSubmissions, setViewSubmissions] = useState(false);

  const handleOpenDialog = (aid) => {
    setCurrentAid(aid);  
    setOpenDialog(true);  
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);  
    setGainMarks('');  
    setStatus('');  
  };

  const handleOpenQuestionsDialog = (questionsList) => {
    setQuestions(questionsList); // Set the questions in the state
    setOpenQuestionsDialog(true); // Open the questions dialog
  };

  const handleCloseQuestionsDialog = () => {
    setOpenQuestionsDialog(false); // Close the questions dialog
  };

  const handleDelete = async (examId) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) {
      return;
    }

    try {
      const response = await axios.get(
        `https://codtsmartschool.strangeweb.in/studentapi/del_assinments.php?id=${examId}`
      );

      if (response.data.success) {
        setAssignmentData((prevExams) =>
          prevExams.filter((exam) => exam.id !== examId)
        );
        toast.success("Exam deleted successfully.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the exam.");
      console.error(error);
    }
  };

  const fetchAssignments = async (id) => {
    setLoading(true);

    try {
      const { data: SubmitedAssinments, error: AssignmentError } = await fetchData(
        `SELECT submitassinments.*, students.first_name, students.last_name
         FROM submitassinments
         JOIN students ON submitassinments.sid = students.id
         WHERE submitassinments.aid = "${id}"`
      );

      if (SubmitedAssinments && SubmitedAssinments.length > 0) {
        setSubmitedAssignmentData(SubmitedAssinments);
      } else {
        setSubmitedAssignmentData([]);
        setError("No submissions found for this assignment.");
      }
    } catch (error) {
      console.error("Error fetching assignment data:", error);
      setError("An unexpected error occurred. Please try again later.");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gainMarks || !status) {
      setMessage('All fields are required.');
      return;
    }

    const data = {
      aid: currentAid,
      gainMarks,
      status,
    };

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/update-assinment-submted.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating the assignment.');
    }
  };

  return (
    <>
      <CardContent>
        {/* Render Submitted Assignments or Assignments List Based on View */}
        <Box mt={2}>
          {viewSubmissions ? (
            <Box>
              <Button onClick={() => setViewSubmissions(false)}>Back</Button>
              {submitedData.length > 0 ? (
              <table border="1">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Answers</th>
                  <th>Assignment</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submitedData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.first_name} {item.last_name}</td>
                    <td>{item.subject}</td> {/* Assuming 'subject' is part of your data */}
                    <td>{item.gain_marks}</td>
                    <td>{item.answers}</td> {/* Assuming 'answers' is part of your data */}
                    <td>{item.submitted_assignment}</td> {/* Assuming 'submitted_assignment' is part of your data */}
                    <td>{item.datetime ? new Date(item.datetime).toLocaleString() : 'N/A'}</td> {/* Assuming 'datetime' is part of your data */}
                    <td>{item.status}</td>
                    <td>
                      <Button onClick={() => handleOpenDialog(item.id)}>Update</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
              ) : (
                <p>No submissions found</p>
              )}
            </Box>
          ) : (
            Array.isArray(assignmentData) &&
            assignmentData.map((assignment, index) => (
              <Grid
                container
                alignItems="center"
                key={index}
                spacing={2}
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  py: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
                  <Typography variant="body1" color="textPrimary" fontWeight="bold">
                    {assignment.title ? assignment.title.trim() : "Untitled Assignment"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
                  <Typography variant="body2" color="textSecondary">
                    Last date to submit -{" "}
                    {assignment.submission_date && assignment.submission_date !== "0000-00-00"
                      ? new Date(assignment.submission_date).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={2} textAlign={{ xs: "center", sm: "left" }} mt={{ xs: 1, sm: 0 }}>
                  <Typography variant="body1" color="textPrimary">
                    {assignment.questions ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenQuestionsDialog(assignment.questions.split(","))}
                        sx={{
                          borderColor: "rgb(80, 61, 255)",
                          color: "rgb(80, 61, 255)",
                          "&:hover": {
                            borderColor: "rgb(80, 61, 255)",
                            backgroundColor: "rgba(80, 61, 255, 0.1)",
                          },
                        }}
                      >
                        View Questions
                      </Button>
                    ) : (
                      "No questions available"
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={2} textAlign={{ xs: "center", sm: "left" }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setViewSubmissions(true);
                      fetchAssignments(assignment.id);
                    }}
                    sx={{
                      backgroundColor: "#503dff",
                      color: "white",
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#3c2ecf",
                      },
                    }}
                  >
                    View Submissions
                  </Button>
                </Grid>

                <Grid item xs={12} sm={2} textAlign={{ xs: "center", sm: "left" }}>
                  <Button
                    onClick={() => handleDelete(assignment.id)}
                    variant="contained"
                    sx={{
                      backgroundColor: "#503dff",
                      color: "white",
                      textTransform: "none",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "150px",
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            ))
          )}
        </Box>

        {/* Dialog for Questions List */}
        <Dialog open={openQuestionsDialog} onClose={handleCloseQuestionsDialog}>
          <DialogTitle>Assignment Questions</DialogTitle>
          <DialogContent>
            <List>
              {questions.map((question, index) => (
                <ListItem key={index}>
                  <ListItemText primary={question} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseQuestionsDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Gain Marks and Status Update */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update Assignment</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="gain_marks">
                <label>Gain Marks:</label>
                <input
                  type="number"
                  value={gainMarks}
                  onChange={(e) => setGainMarks(e.target.value)}
                  required
                />
              </div>

              <div className="gain_marks">
                <label>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>

              <div>
                <button type="submit">Update Assignment</button>
              </div>
            </form>

            {message && <p>{message}</p>}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </>
  );
};






export default SchoolAssignmentList;
