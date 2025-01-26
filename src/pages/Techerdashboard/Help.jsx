// src/components/TeacherHelp.js
import { Box, Typography, TextField, Button, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TeacherHelp = () => {
  return (
    <Box sx={{ width: '100%', padding: 4 }}>
      {/* Header Section */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          CODT Smart School - Help Center
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Welcome to the CODT Smart School Help Section. Find answers to common queries below or contact our support team for further assistance.
        </Typography>
      </Paper>

      {/* FAQ Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>

        {/* FAQ Item 1 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content-1" id="panel-header-1">
            <Typography variant="h6">How to create a new account?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Go to the homepage and click on 'Sign Up'. Enter your details to create a new account.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* FAQ Item 2 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content-2" id="panel-header-2">
            <Typography variant="h6">How to enroll in a course?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Visit the course page and click 'Enroll Now' to join any course.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* FAQ Item 3 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content-3" id="panel-header-3">
            <Typography variant="h6">What to do if I forget my password?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Click 'Forgot Password' on the login page and follow the instructions to reset your password.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Contact Form Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Contact Support
        </Typography>
        <Grid container spacing={3}>
          {/* Name Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              placeholder="youremail@example.com"
            />
          </Grid>

          {/* Phone Number Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              type="tel"
              placeholder="+1 234 567 890"
            />
          </Grid>

          {/* Message Field */}
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#503dff', // Custom button color
                '&:hover': {
                  backgroundColor: '#4028cc', // Darker shade for hover effect
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TeacherHelp;
