import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Card, CardContent, TextField, Snackbar } from '@mui/material';

const SubmitAssignment = ({ assignment }) => {
  const [formData, setFormData] = useState({
    aid: "",
    sid: "",  // Student ID will be set or passed later if needed
    subject: "",
    marks: "",  // Marks should be an empty string initially, not "null"
    answers: "",
    datetime: "", // Set current date here
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Retrieve the object from localStorage
  const storedStud = localStorage.getItem('stud');
  let studid = "";
  if (storedStud) {
    const studObj = JSON.parse(storedStud);
    studid = studObj.data.user_id;
  } else {
    console.log("No user data found in localStorage.");
  }

  // Initialize the formData state when the component mounts or assignment changes
  useEffect(() => {
    if (assignment) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10); // Get date only, format 'yyyy-MM-dd'

      setFormData({
        aid: assignment.id || "",
        sid: studid || "",
        subject: assignment.subject || "",
        marks: studid||"",
        answers: "",
        datetime: formattedDate,
      });
      
    }
    
  }, [assignment, studid]);
  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload(); // This will refresh the page
    }, 2000); // Reload after 2 seconds
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://codtsmartschool.strangeweb.in/studentapi/submit-assinment.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON response, but received something else.");
      }

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Assignment submitted successfully!");
        setOpenSnackbar(true);

        // Reset form data after successful submission
        setFormData({
          aid: "",
          sid: studid || "",
          subject: assignment.subject || "",
          marks: "",
          answers: "",
          datetime: new Date().toISOString().slice(0, 10), // Reset date to current date
        });

        // Optional: Force page refresh or trigger UI update if necessary
        setTimeout(() => {
          window.location.reload(); // To refresh the page and reset all states
        }, 2000); // Refresh after 2 seconds
      } else {
        setResponseMessage(data.message || "Failed to submit assignment.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred. Please try again later.");
      setOpenSnackbar(true);
    }
  };

  // Close Snackbar after auto hide duration
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Submit Assignment
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Hide all fields except for the "Answers" field */}
              <Grid item xs={12}>
                <TextField
                  label="Paste your assignment URL here"
                  variant="outlined"
                  fullWidth
                  name="answers"
                  value={formData.answers}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={reloadPage} // Close Snackbar manually or after 6 seconds
              >
                Submit Assignment
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar for success or failure */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar} // Close Snackbar manually or after 6 seconds
        message={responseMessage}
      />
    </Box>
  );
};

export default SubmitAssignment;
