import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Box, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FaQuestionCircle } from 'react-icons/fa';
import SubmitAssignment from './SubmitAssignments'; // Import the SubmitAssignment component
import { fetchData } from '../../src/Service/apiService';

const AssignmentCard = ({ subject, assignments }) => {
  return (
    <Box mt={4}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {subject.charAt(0).toUpperCase() + subject.slice(1)} Assignments
          </Typography>
          <Box mt={2}>
            {assignments.map((assignment, index) => (
              <AssignmentItem key={index} assignment={assignment} />
            ))}
          </Box>
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#503dff",
                color: "white",
                textTransform: "none",
                borderRadius: "8px",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              See More
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const AssignmentItem = ({ assignment }) => {
  const [openQuestions, setOpenQuestions] = useState(false); // State for questions dialog
  const [openSubmitForm, setOpenSubmitForm] = useState(false); // State for submit form dialog
  const [questionsArray, setQuestionsArray] = useState([]); // State for questions list

  const handleOpenQuestions = () => {
    // Ensure questions are available and split them into an array
    const questions = assignment?.questions
      ? assignment.questions.split(',').map((q) => q.trim()) // Split and trim each question
      : []; // Empty array if no questions available

    setQuestionsArray(questions); // Set the questions in state
    setOpenQuestions(true); // Open the questions dialog
  };

  const handleCloseQuestions = () => {
    setOpenQuestions(false); // Close the questions dialog
  };

  const handleOpenSubmitForm = () => {
    setOpenSubmitForm(true); // Open the submit form dialog
  };

  const handleCloseSubmitForm = () => {
    setOpenSubmitForm(false); // Close the submit form dialog
  };

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState([]); // State to hold exam data

  const storedStud = localStorage.getItem('stud');
  const [id, setId] = useState("");
  const [sid, setSid] = useState("");

  // Parse student data from localStorage
  useEffect(() => {
    if (storedStud) {
      const studObj = JSON.parse(storedStud);
      setSid(studObj.data.user_id); // Set student ID from localStorage
    } else {
      console.log("No user data found in localStorage.");
    }
  }, [storedStud]);

  const assignid = assignment?.id;  // Get assignment ID

  const fetchDataAsync = async (assignid, studid) => {
    try {
      // Construct query to fetch assignment data for the given student and assignment ID
      const query = `
        SELECT *
        FROM submitassinments
        WHERE aid = '${assignid}'  
        AND sid = '${studid}';   
      `;
      
      // Execute the query with fetchData
      const { data: ExamData, error: ExamError } = await fetchData(query);
      
      if (ExamError) {
        console.error('Error fetching data:', ExamError);
        setError(ExamError);  // Set the error if there's any
        setLoading(false);    // Stop loading
        return;
      }

      // Handle the data if there is no error
      if (ExamData && ExamData.length > 0) {
        console.log(ExamData);
        setExamData(ExamData);  // Set the fetched data
      } else {
        console.error('No data found');
        setError('No data found'); // Set an error if no data is returned
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
    if (assignid && sid) {
      fetchDataAsync(assignid, sid);  // Pass the assignment ID and student ID
    }
  }, [assignid, sid]); // Run the effect when `assignid` or `sid` change

  return (
    <Grid
      container
      alignItems="center"
      spacing={2}
      sx={{
        borderBottom: "1px solid #e0e0e0",
        py: 1,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {/* Assignment Title */}
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" color="textPrimary" textAlign={{ xs: "center", sm: "left" }}>
          {assignment?.title || "Untitled"}
        </Typography>
      </Grid>

      {/* Submission Date */}
      <Grid item xs={12} sm={3}>
        <Typography variant="body2" color="textSecondary" textAlign={{ xs: "center", sm: "left" }}>
          Last date - {assignment?.submission_date || "N/A"}
        </Typography>
      </Grid>

      {/* Questions Button */}
      <Grid item xs={12} sm={2} sx={{ textAlign: { xs: "center", sm: "left" } }}>
        <Button
          startIcon={<FaQuestionCircle />}
          variant="contained"
          sx={{
            backgroundColor: "#503dff",
            color: "white",
            textTransform: "none",
            borderRadius: "20px",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            width: { xs: "100%", sm: "auto" },
          }}
          size="small"
          onClick={handleOpenQuestions} // Open questions dialog on click
        >
          Questions
        </Button>
      </Grid>

      {/* Submit Assignment Button */}
      <Grid item xs={12} sm={2} sx={{ textAlign: { xs: "center", sm: "left" } }}>
  {examData[0]?.answers ? (
    <Button
    startIcon={<FaQuestionCircle />}
    variant="contained"
    sx={{
      backgroundColor: "#ccc", // Gray out the button when not clickable
      color: "#666",
      textTransform: "none",
      borderRadius: "20px",
      fontSize: { xs: "0.75rem", sm: "0.875rem" },
      width: { xs: "100%", sm: "auto" },
    }}
    size="small"
    disabled // Disable the button if answers is not available
  >
    Submit assignment
  </Button>
  ) : (
    <Button
    startIcon={<FaQuestionCircle />}
    variant="contained"
    sx={{
      backgroundColor: "#503dff",
      color: "white",
      textTransform: "none",
      borderRadius: "20px",
      fontSize: { xs: "0.75rem", sm: "0.875rem" },
      width: { xs: "100%", sm: "auto" },
    }}
    size="small"
    onClick={handleOpenSubmitForm} // Open submit form dialog on click
  >
    Submit assignment
  </Button>
  
  )}
</Grid>

      <Grid item xs={12} sm={2} sx={{ textAlign: { xs: "center", sm: "left" } }}>
  <Button
    component="a" // Makes the button act as a link
    href={examData[0]?.answers} // Use the first exam answer URL
    target="_blank" // Open the link in a new tab
    rel="noopener noreferrer" // Safe linking
    startIcon={<FaQuestionCircle />}
    variant="contained"
    sx={{
      backgroundColor: "#503dff",
      color: "white",
      textTransform: "none",
      borderRadius: "20px",
      fontSize: { xs: "0.75rem", sm: "0.875rem" },
      width: { xs: "100%", sm: "auto" },
    }}
    size="small"
  >
    Submitted assignment
  </Button>
</Grid>
      {/* Questions Dialog */}
      <Dialog open={openQuestions} onClose={handleCloseQuestions} fullWidth maxWidth="sm">
        <DialogTitle>Questions</DialogTitle>
        <DialogContent>
          {questionsArray.length > 0 ? (
            <List>
              {questionsArray.map((question, index) => (
                <ListItem key={index} divider>
                  <ListItemText primary={`${index + 1}. ${question}`} />
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
          <Button onClick={handleCloseQuestions} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Submit Assignment Dialog */}
      <Dialog open={openSubmitForm} onClose={handleCloseSubmitForm} fullWidth maxWidth="sm">
        <DialogTitle>Submit Assignment</DialogTitle>
        <DialogContent>
          <SubmitAssignment assignment={assignment} /> {/* Pass assignment object */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubmitForm} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const AssignmentList = () => {

  
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('stud');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setInfo(parsedData);
    }
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      const myemail = info?.data?.email;

      if (!myemail) {
        setError('No email found in stored data.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://codtsmartschool.strangeweb.in/studentapi/getassignments.php?email=${myemail}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format. Expected an array.');
        }

        const formattedData = data.reduce((acc, assignment) => {
          const subject = assignment.subject || 'General';
          const existingSubject = acc.find(item => item.subject === subject);
          if (existingSubject) {
            existingSubject.assignments.push(assignment);
          } else {
            acc.push({ subject, assignments: [assignment] });
          }
          return acc;
        }, []);

        setAssignmentsData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (info) {
      fetchAssignments();
    }
  }, [info]);

  if (loading) {
    return <Typography variant="h6">Loading assignments...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (assignmentsData.length === 0) {
    return <Typography variant="h6">No assignments found.</Typography>;
  }

  return (
    <Box p={1}>
      <Typography variant="h5" mb={3} textAlign={{ xs: 'center', sm: 'left' }}>
        Assignments
      </Typography>
      {assignmentsData.map((data, index) => (
        <AssignmentCard key={index} subject={data.subject} assignments={data.assignments} />
      ))}
    </Box>
  );
};

export default AssignmentList;
