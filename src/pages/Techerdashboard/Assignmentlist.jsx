import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { color } from "chart.js/helpers";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const teacherEmail = sessionStorage.getItem('teacherEmail'); // Retrieve teacher's email from session storage

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`https://codtsmartschool.strangeweb.in/teacherapi/assignmentbyteacher.php?teacher_email=${teacherEmail}`);
        const data = await response.json();

        if (data.success) {
          setAssignments(data.data); // Assuming the API returns an object with 'data' as an array of assignments
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    if (teacherEmail) {
      fetchAssignments();
    }
  }, [teacherEmail]);

  return (
    <Box >
      {/* Header Section */}
      <Link to="/teacher/academics/assignment/create">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Button variant="contained" sx={{ mr: 2 }}>
            <AddIcon fontSize="large" />
          </Button>
          <Typography variant="h6">Post New Assignment</Typography>
        </Box>
      </Link>

      {/* Assignment List Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>Assignments posted by you</Typography>
      <Paper elevation={0} sx={{ p: 2, mb: 2, border: "1px solid #e0e0e0", borderRadius: 3 }}>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <AssignmentItem key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <Typography>No assignments found.</Typography>
        )}
      </Paper>
    </Box>
  );
};

const AssignmentItem = ({ assignment }) => {
  return (
    //     <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
    //   {/* Column 1: Subject and Posted By */}
    //   <Grid item xs={12} md={2}>
    //     <Typography variant="h6">{assignment.subject}</Typography>
    //     <Typography variant="body2">Posted by: {assignment.posted_by ||"abc"}</Typography>
    //   </Grid>

    //   {/* Column 2: Test Type */}
    //   <Grid item xs={12} md={2}>
    //     <Typography variant="body1">{assignment.test_type || "Unit Test"}</Typography>
    //   </Grid>

    //   {/* Column 3: Dates and Marks */}
    //   <Grid item xs={12} md={3}>
    //     <Typography>Assignment Date: {new Date(assignment.created_at).toLocaleDateString()}</Typography>
    //     <Typography>Submission Date: {new Date(assignment.submission_date).toLocaleDateString()}</Typography>
    //     <Typography>Max Marks: {assignment.total_marks}</Typography>
    //   </Grid>

    //   {/* Column 4: View Assignment and Submission Status */}
    //   <Grid item xs={12} md={3}>
    //     <Button variant="contained" fullWidth sx={{ mb: { xs: 2, md: 1 } }}>View Assignment</Button>
    //     <Box sx={{ display: 'flex', gap: 1, mb: 1, flexDirection: { xs: 'column', md: 'row' } }}>
    //       <Button variant="outlined" color="success" sx={{ flexGrow: 1 }}>
    //         Submissions Done
    //       </Button>
    //       <Button variant="outlined" color="error" sx={{ flexGrow: 1 }}>
    //         Submissions Pending
    //       </Button>
    //     </Box>

    //   </Grid>

    //   {/* Column 5: Edit Button */}
    //   <Grid item xs={12} md={2}>
    //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    //       <Typography>{assignment.divi} students submitted out of {assignment.total_students}</Typography>
    //       <Button variant="outlined" fullWidth>Edit</Button>
    //     </Box>
    //   </Grid>
    // </Grid>
    <Grid container spacing={2} alignItems="center" sx={{
      position: 'relative', 
    }}>
      {/* Column 1: Subject and Posted By */}
      <Grid item xs={12} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h6">{assignment.subject}</Typography>
        <Typography variant="body2">Posted by: <span>{assignment.posted_by || "rambo"}</span> </Typography>
      </Grid>

      {/* Column 2: Test Type */}
      <Grid item xs={12} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="body1">{assignment.title || "Unit Test"}</Typography>
      </Grid>

      {/* Column 3: Dates and Marks */}
      <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography>Assignment Date: {new Date(assignment.created_at).toLocaleDateString()}</Typography>
        <Typography>Submission Date: {new Date(assignment.submission_date).toLocaleDateString()}</Typography>
        <Typography>Max Marks: {assignment.total_marks}</Typography>
      </Grid>

      {/* Column 4: View Assignment and Submission Status */}
      <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Button variant="contained" sx={{ mb: { xs: 2, md: 1 } }}>View Assignment</Button>
        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Button variant="outlined" color="success" sx={{ flexGrow: 1 }}>
            Submissions Done
          </Button>
          <Button variant="outlined" color="error" sx={{ flexGrow: 1 }}>
            Submissions Pending
          </Button>
        </Box>
      </Grid>

      {/* Column 5: Student Submitted Count and Edit Button (Stacked Vertically) */}
      <Grid item xs={12} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography>{assignment.total_students || "10/28"} students submitted </Typography>
          <Button variant="contained" sx={{ width: "40%" }} >Edit</Button>
        </Box>
      </Grid>
    </Grid>

  );
};

export default AssignmentList;
