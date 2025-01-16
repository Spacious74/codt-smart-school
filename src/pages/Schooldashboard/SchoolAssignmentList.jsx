import { useEffect, useState } from "react";
import {
  Box, Typography, Button, Grid, Paper, CardContent, Dialog, DialogTitle, DialogContent,
  DialogActions, List, ListItem, ListItemText
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
    <Box>
      {/* Header Section */}
      <Link to="/school/academicschool/assignment/create">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Button variant="contained" sx={{ mr: 2 }}>
            <AddIcon fontSize="large" />
          </Button>
          <Typography variant="h6">Post New Assignment</Typography>
        </Box>
      </Link>

      {/* Assignment List Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>Assignments posted by you</Typography>
      <Paper elevation={0} sx={{ px: 2, border: "1px solid #e0e0e0", borderRadius: 3 }}>
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
        <Box>
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
                sx={{ py: 2, flexDirection: { xs: "column", sm: "row" }}}
              >
                <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
                  <Typography variant="body1" color="textPrimary" fontWeight="bold">
                    {assignment.title ? assignment.title.trim() : "Untitled Assignment"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "left" }}>
                  <Typography variant="body2" color="textSecondary">
                    Submission date -{" "}
                    {assignment.submission_date && assignment.submission_date !== "0000-00-00"
                      ? new Date(assignment.submission_date).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={2} textAlign={{ xs: "center", sm: "left" }} mt={{ xs: 1, sm: 0 }}>
                  <Typography variant="body1" color="textPrimary">
                    {assignment.questions ? (
                      <Button variant="contained" color="primary"
                        onClick={() => handleOpenQuestionsDialog(assignment.questions.split(","))}
                        sx={{
                          display: "flex", alignItems: "center", gap : '5px',
                          textTransform: "none",
                          backgroundColor: "#503dff",
                          borderRadius: "8px",
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" color="currentColor"><path d="M22 11.567c0 5.283-4.478 9.566-10 9.566q-.977.001-1.935-.178c-.459-.087-.688-.13-.848-.105c-.16.024-.388.145-.842.386a6.5 6.5 0 0 1-4.224.657a5.3 5.3 0 0 0 1.087-2.348c.1-.53-.148-1.045-.52-1.422C3.034 16.411 2 14.105 2 11.567C2 6.284 6.478 2 12 2s10 4.284 10 9.567"/><path d="M10 9.846C10 8.826 10.895 8 12 8s2 .827 2 1.846c0 .368-.116.71-.317.998C13.085 11.7 12 12.519 12 13.539V14m0 2.5h.009"/></g></svg>
                        Questions
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
                      display: "flex", alignItems: "center", gap : '5px',
                      backgroundColor: "#503dff",
                      textTransform: "none",
                      borderRadius: "8px",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" color="currentColor"><path d="M15 2.5V4c0 1.414 0 2.121.44 2.56C15.878 7 16.585 7 18 7h1.5"/><path d="M4 16V8c0-2.828 0-4.243.879-5.121C5.757 2 7.172 2 10 2h4.172c.408 0 .613 0 .797.076c.183.076.328.22.617.51l3.828 3.828c.29.29.434.434.51.618c.076.183.076.388.076.796V16c0 2.828 0 4.243-.879 5.121C18.243 22 16.828 22 14 22h-4c-2.828 0-4.243 0-5.121-.879C4 20.243 4 18.828 4 16m4-5h8m-8 3h8m-8 3h4.17"/></g></svg>
                    Submissions
                  </Button>
                </Grid>

                <Grid item xs={12} sm={2} textAlign={{ xs: "center", sm: "left" }}>
                  <Button
                    onClick={() => handleDelete(assignment.id)}
                    variant="outlined"
                    sx={{
                      display: "flex", alignItems: "center", gap : '5px',
                      borderColor: "#D84040",
                      color: "#D84040",
                      textTransform: "none",
                      borderRadius: "8px",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor"/></svg>
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
