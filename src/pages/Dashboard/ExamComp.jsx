import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Button, Avatar, Card, Divider, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import axios from "axios";
import { fetchData } from "../../src/Service/apiService";
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import { useLocation } from 'react-router-dom'; // Assuming you're using react-router
import { CircularProgress } from '@mui/material';
import { jsPDF } from 'jspdf';  // Import jsPDF

const examData = [
  {
    subject: 'Exam Series',
    title: 'Unit Test',
    startDate: '24 March 2024',
    endDate: '24 March 2024',
    postedBy: 'Nipa Singh'
  },
  {
    subject: 'Science',
    title: 'Chemical Bonds and Reactions',
    startDate: '24 March 2024',
    endDate: '24 March 2024',
    postedBy: 'Nipa Singh'
  }
];
const studemail = localStorage.getItem('stud.email'); // Get the email from localStorage

const UpcomingExams = () => {
  const [data, setData] = useState([]); // Ensure initial state is an empty array
  const [error, setError] = useState(null);

  const studs = localStorage.getItem('stud');
  console.log(studs);

  const stud = studs ? JSON.parse(studs) : null;
  const studemails = stud && stud.data ? stud.data.email : null;  // Access email from the nested data object
  console.log(studemails);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://codtsmartschool.strangeweb.in/studentapi/getexam.php?email=${studemails}`);
        console.log(response.data); // Log response for debugging
        if (Array.isArray(response.data)) {
          setData(response.data); // Ensure response is an array
        } else {
          setData([]); // Default to an empty array if the response is not as expected
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [studemail]);

  if (error) {
    return <Typography color="error">Failed to fetch exams: {error}</Typography>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <Typography>No upcoming exams found.</Typography>;
  }

  return (
    <Box py={2}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Upcoming Exams
      </Typography>
      {data.map((exam, index) => (
        <Box key={index}
          sx={{
            p: 3, border: 'solid 1px #cecece', borderRadius: '12px', display: 'flex', justifyContent: 'space-between',
            backgroundColor: '#fff'
          }}>

          <div >
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }} >{exam.subject}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
              <Typography variant="caption" sx={{ fontWeight: 'bold' }} >Posted By</Typography>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#503dff' }} >{exam.teacheremail}</Typography>
            </Box>
          </div>

          <div id='bold' >
            {exam.title}
          </div>


          <div  >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                Start Date: {new Date(exam.exam_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                End Date: {new Date(exam.exam_end_date)?.toLocaleDateString() || ''}
              </Typography>
            </Box>
          </div>


          <Box sx={{ gap: "10px", width: '18%' }} >
            <Button
              variant="contained"
              href={exam.timetable_path}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mb: 1,
                backgroundColor: '#503dff',
                color: '#fff',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#4030cc' },
                width: '100%'
              }}
            >
              TimeTable
            </Button>
            <Button
              variant="contained"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: '#503dff',
                color: '#fff',
                width: '100%',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#4030cc' },
              }}
            >
              Instructions
            </Button>
          </Box>

        </Box>
      ))}
    </Box>
  );
};


const ExamResults = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);  // Dialog state for Report Card
  const [selectedReportCard, setSelectedReportCard] = useState(null); // Selected report card data

  // Retrieve schoolcode from localStorage
  const studs = localStorage.getItem('stud');
  const stud = studs ? JSON.parse(studs) : null;
  const schoolcode = stud && stud.data ? stud.data.schoolcode : null;
  const studid = stud && stud.data ? stud.data.user_id : null;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (!schoolcode) {
        setError('No school code found!');
        setLoading(false);
        return;
      }

      const { data: Assignment, error: AssignmentError } = await fetchData(
        `SELECT 
          exam_result.*, 
          exams.title, 
          exams.subject, 
          exams.exam_date, 
          exams.total_marks, 
          exams.applicable_class, 
          exams.notes, 
          exams.timetable_path, 
          exams.created_at AS exam_created_at, 
          exams.schoolcode AS exam_schoolcode, 
          exams.teacheremail, 
          students.first_name, 
          students.last_name, 
          students.phone_number, 
          students.email AS student_email, 
          students.school_name AS student_school_name, 
          students.grade, 
          students.divi, 
          students.address AS student_address, 
          students.city AS student_city, 
          students.pin_code AS student_pin_code, 
          students.state AS student_state, 
          students.subjects, 
          students.image AS student_image, 
          students.rolenum, 
          students.status AS student_status, 
          students.last_login AS student_last_login, 
          schools.school_name AS school_name, 
          schools.address AS school_address, 
          schools.city AS school_city, 
          schools.pin_code AS school_pin_code, 
          schools.state AS school_state, 
          schools.educational_board, 
          schools.principal_name, 
          schools.contact_number, 
          schools.email_id AS school_email, 
          schools.whatsapp_number, 
          schools.number_of_students, 
          schools.number_of_teachers, 
          schools.logo AS school_logo, 
          schools.created_at AS school_created_at, 
          schools.last_login AS school_last_login
        FROM 
          exam_result
        JOIN 
          exams ON exam_result.eid = exams.id
        JOIN 
          students ON exam_result.sid = students.id
        JOIN 
          schools ON exam_result.school_code = schools.schoolcode
        WHERE 
          exam_result.school_code = '${schoolcode}' 
          AND exam_result.sid = '${studid}';`
      );

      if (Assignment) {
        setExamData(Assignment);
      } else {
        setError(AssignmentError);
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, [schoolcode]);

  const handleTimeTableRedirect = (timetablePath) => {
    if (timetablePath) {
      navigate(timetablePath); // Redirect to the timetable path
    } else {
      setError('No timetable path available.');
    }
  };

  const handleOpenDialog = (exam) => {
    setSelectedReportCard(exam); // Store selected exam's report card details
    setOpenDialog(true); // Open dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
    setSelectedReportCard(null); // Clear selected report card details
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" textAlign="start" fontWeight={800} mb={3}>
        Exam Results
      </Typography>

      {examData.length === 0 ? (
        <Typography variant="body1" textAlign="center">No exam results available.</Typography>
      ) : (
        examData.map((exam, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              textAlign: { xs: 'center', sm: 'left' },
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: 'white',
            }}
          >
            <Box flexGrow={1} mb={{ xs: 2, sm: 0 }}>
              <Typography variant="body1">{exam.title}</Typography>
              <Typography variant="body2">
                Exam Date: <span style={{ color: 'blue' }}>{exam.exam_date}</span>
              </Typography>
              {/* <Typography variant="body2">End Date: <span style={{ color: 'blue' }}>{exam.exam_date}</span></Typography> */}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                justifyContent: { xs: 'center', sm: 'flex-end' },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    mb: 1,
                    backgroundColor: '#503dff',
                    borderRadius: '8px',  // Add border radius to make the button rounded
                    textTransform: 'capitalize',
                    padding: '4px 12px', // Adjust padding to slim down
                    '&:hover': {
                      backgroundColor: '#4029cc',
                    },
                  }}
                  onClick={() => handleTimeTableRedirect(exam.timetable_path)} // Replace with actual path
                >
                  View Time Table
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    mb: 1,
                    backgroundColor: '#503dff',
                    borderRadius: '8px',  // Add border radius to make the button rounded
                    textTransform: 'capitalize',
                    padding: '4px 12px', // Adjust padding to slim down
                    '&:hover': {
                      backgroundColor: '#4029cc',
                    },
                  }}
                >
                  Exam Instructions
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: '#ffff',  // Optional: Custom background color for outlined button (if desired)
                    padding: '4px 12px',  // Slim down button padding
                    borderColor: '#503dff',  // Custom border color to match the button
                    borderRadius: '8px',  // Add border radius to make the button rounded
                    textTransform: 'capitalize',
                    '&:hover': {
                      borderColor: '#4029cc',  // Optional: Darker border color on hover
                    },
                  }}
                  onClick={() => handleOpenDialog(exam)} // Open the report card dialog
                >
                  Report Card
                </Button>

                <Typography
                  variant="body1"
                  mb={{ xs: 2, sm: 0 }}
                >
                  {exam.gail_marks ? (
                    <>
                      {exam.gail_marks}/100{' '}
                      <span
                        style={{
                          color: exam.pass_fail === 'Pass' ? 'green' : 'red', // Conditional color
                        }}
                      >
                        {exam.pass_fail}
                      </span>
                    </>
                  ) : (
                    'Not Graded'
                  )}
                </Typography>

              </Box>

            </Box>
          </Box>
        ))
      )}

      {/* Report Card Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {/* Report Card Header */}
        <DialogTitle sx={{ backgroundColor: '#503dff', color: '#fff', textAlign: 'center', padding: '20px' }}>
          <Typography variant="h5" fontWeight="bold">Student Report Card</Typography>
        </DialogTitle>

        <DialogContent sx={{ padding: 3, backgroundColor: '#f9f9f9', border: '2px solid #503dff', borderRadius: '8px' }}>
          {/* School Section */}
          <Box sx={{ textAlign: 'center', marginBottom: 3, marginTop: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="#503dff">School Details</Typography>
            <Box sx={{ marginTop: 1, lineHeight: 1.8 }}>
              <Typography variant="body1"><strong>School Name:</strong> {selectedReportCard ? selectedReportCard.school_name : 'Loading...'}</Typography>
              <Typography variant="body1"><strong>Principal:</strong> {selectedReportCard ? selectedReportCard.principal_name : 'Loading...'}</Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {selectedReportCard ? `${selectedReportCard.school_address}, ${selectedReportCard.school_city}` : 'Loading...'}
              </Typography>

            </Box>
          </Box>

          <Divider sx={{ marginBottom: 3 }} />

          {/* Student Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <Avatar
              src={selectedReportCard ? selectedReportCard.student_image : ''}
              alt="Student Image"
              sx={{ width: 100, height: 100, marginRight: 3, border: '2px solid #503dff' }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {selectedReportCard ? `${selectedReportCard.first_name} ${selectedReportCard.last_name}` : 'Loading...'}
              </Typography>

              <Typography variant="body1"><strong>Roll Number:</strong> {selectedReportCard ? selectedReportCard.rolenum : 'Loading...'}</Typography>
              <Typography variant="body1"><strong>Grade:</strong> {selectedReportCard ? selectedReportCard.grade : 'Loading...'}</Typography>
            </Box>
          </Box>

          <Divider sx={{ marginBottom: 3 }} />

          {/* Exam Section */}
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#503dff" sx={{ textAlign: 'center', marginBottom: 2 }}>
              Exam Details
            </Typography>
            <Box sx={{ marginTop: 1, padding: 2, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Exam Title:</strong> {selectedReportCard ? selectedReportCard.title : 'Loading...'}</Typography>
              <Typography variant="body1"><strong>Subject:</strong> {selectedReportCard ? selectedReportCard.subject : 'Loading...'}</Typography>
              <Typography variant="body1"><strong>Marks Obtained:</strong> {selectedReportCard ? selectedReportCard.gail_marks : 'Loading...'} / 100</Typography>
              <Typography variant="body1"><strong>Status:</strong> {selectedReportCard ? selectedReportCard.pass_fail : 'Loading...'}</Typography>
            </Box>
          </Box>
        </DialogContent>

        {/* Footer Actions */}
        <DialogActions sx={{ backgroundColor: '#503dff', padding: '10px 20px', justifyContent: 'center' }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: 'black', // Set the background color to black
              color: 'white',           // Set the text color to white for contrast
              fontWeight: 'bold',       // Keep the bold text
              '&:hover': {
                backgroundColor: '#333', // Optional: Darker shade on hover for better UX
              },
            }}
          >
            Close
          </Button>

        </DialogActions>
      </Dialog>

    </Box>
  );
};

const GenerateReportCard = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [selectedReportCard, setSelectedReportCard] = useState(null);  // Selected report card data
  const [openDialog, setOpenDialog] = useState(false);  // Dialog visibility state

  // Retrieve schoolcode from localStorage
  const studs = localStorage.getItem('stud');
  const stud = studs ? JSON.parse(studs) : null;
  const schoolcode = stud && stud.data ? stud.data.schoolcode : null;
  const studid = stud && stud.data ? stud.data.user_id : null;

  const navigate = useNavigate();

  // Trigger fetching when `fetchDataTrigger` is true
  useEffect(() => {
    if (fetchDataTrigger) {
      const fetchDataAsync = async () => {
        if (!schoolcode) {
          setError('No school code found!');
          setLoading(false);
          return;
        }

        setLoading(true);  // Set loading to true before starting the fetch

        const query = `
          SELECT 
            exam_result.*, 
            exams.title, 
            exams.subject, 
            exams.exam_date, 
            exams.total_marks, 
            exams.applicable_class, 
            exams.notes, 
            exams.timetable_path, 
            exams.created_at AS exam_created_at, 
            exams.schoolcode AS exam_schoolcode, 
            exams.teacheremail, 
            students.first_name, 
            students.last_name, 
            students.phone_number, 
            students.email AS student_email, 
            students.school_name AS student_school_name, 
            students.grade, 
            students.divi, 
            students.address AS student_address, 
            students.city AS student_city, 
            students.pin_code AS student_pin_code, 
            students.state AS student_state, 
            students.subjects, 
            students.image AS student_image, 
            students.rolenum, 
            students.status AS student_status, 
            students.last_login AS student_last_login, 
            schools.school_name AS school_name, 
            schools.address AS school_address, 
            schools.city AS school_city, 
            schools.pin_code AS school_pin_code, 
            schools.state AS school_state, 
            schools.educational_board, 
            schools.principal_name, 
            schools.contact_number, 
            schools.email_id AS school_email, 
            schools.whatsapp_number, 
            schools.number_of_students, 
            schools.number_of_teachers, 
            schools.logo AS school_logo, 
            schools.created_at AS school_created_at, 
            schools.last_login AS school_last_login
          FROM 
            exam_result
          JOIN 
            exams ON exam_result.eid = exams.id
          JOIN 
            students ON exam_result.sid = students.id
          JOIN 
            schools ON exam_result.school_code = schools.schoolcode
          WHERE 
            exam_result.school_code = '${schoolcode}' 
            AND exam_result.sid = '${studid}'
            ${selectedDate ? `AND exams.exam_date = '${selectedDate}'` : ''};
        `;

        const { data: Assignment, error: AssignmentError } = await fetchData(query);

        if (Assignment) {
          setExamData(Assignment);
          setError(null);  // Reset error if data fetched successfully
        } else {
          setExamData([]);  // If no data found, set it as an empty array
          setError(AssignmentError || 'No data found.');
        }

        setLoading(false);  // Set loading to false once fetching is complete
        setFetchDataTrigger(false);  // Reset fetch trigger to avoid multiple fetches
      };

      fetchDataAsync();
    }
  }, [fetchDataTrigger, selectedDate, schoolcode, studid]);  // Only run if `fetchDataTrigger` is true

  const handleTimeTableRedirect = (timetablePath) => {
    if (timetablePath) {
      navigate(timetablePath); // Redirect to the timetable path
    } else {
      setError('No timetable path available.');
    }
  };

  const handleOpenDialog = (exam) => {
    setSelectedReportCard(exam); // Store selected exam's report card details
    setOpenDialog(true); // Open dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
    setSelectedReportCard(null); // Clear selected report card details
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);  // Update selected date
  };

  const handleGenerateClick = () => {
    if (!selectedDate) {
      setError('Please select a date to generate the report card.');  // Ensure a date is selected before fetching
      return;
    }
    setFetchDataTrigger(true);  // Trigger the fetch when the button is clicked
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Add Title to the PDF
    doc.setFontSize(20);
    doc.setTextColor(80, 61, 255);  // #503dff color
    doc.text('Student Report Card', 105, 20, null, null, 'center');

    // School Details Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);  // Reset text color to black
    doc.text(`School Name: ${selectedReportCard ? selectedReportCard.school_name : 'Loading...'}`, 20, 40);
    doc.text(`Principal: ${selectedReportCard ? selectedReportCard.principal_name : 'Loading...'}`, 20, 50);
    doc.text(`Address: ${selectedReportCard ? `${selectedReportCard.school_address}, ${selectedReportCard.school_city}` : 'Loading...'}`, 20, 60);

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(20, 70, 190, 70);

    // Student Details Section
    doc.text(`Student: ${selectedReportCard ? `${selectedReportCard.first_name} ${selectedReportCard.last_name}` : 'Loading...'}`, 20, 80);
    doc.text(`Roll Number: ${selectedReportCard ? selectedReportCard.rolenum : 'Loading...'}`, 20, 90);
    doc.text(`Grade: ${selectedReportCard ? selectedReportCard.grade : 'Loading...'}`, 20, 100);

    // Add another line separator
    doc.line(20, 110, 190, 110);

    // Exam Details Section
    doc.text(`Exam Title: ${selectedReportCard ? selectedReportCard.title : 'Loading...'}`, 20, 120);
    doc.text(`Subject: ${selectedReportCard ? selectedReportCard.subject : 'Loading...'}`, 20, 130);
    doc.text(`Marks Obtained: ${selectedReportCard ? selectedReportCard.gail_marks : 'Loading...'} / 100`, 20, 140);
    doc.text(`Status: ${selectedReportCard ? selectedReportCard.pass_fail : 'Loading...'}`, 20, 150);

    // Add another line separator
    doc.line(20, 160, 190, 160);

    // Download the PDF
    doc.save('report-card.pdf');
  };



  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h6">Generate Report Card</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2, mt: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={selectedDate}
          onChange={handleDateChange}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#503dff',
            color: 'white',
            fontWeight: 'bold',
            padding: '3px 16px',
            '&:hover': {
              backgroundColor: '#4029cc',
            },
          }}
          onClick={handleGenerateClick}
        >
          Generate
        </Button>
      </Box>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
        <Button variant="outlined">Generate Till Date</Button>
        <Button variant="outlined">School Official Report Card</Button>
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Exams</Typography>
        {examData.length > 0 ? (
          examData.map((exam) => (
            <Grid container spacing={2} sx={{ marginTop: 2 }} key={exam.eid}>
              <Grid item xs={8} sm={8}>
                <Box sx={{ borderBottom: '1px solid #ccc', padding: '8px 0', width: '100%' }}>
                  <Typography variant="body1">{exam.title} - {exam.subject}</Typography>
                  <Typography variant="body2">
                    Exam Date: <span style={{ color: 'blue' }}>{exam.exam_date}</span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#503dff',
                    color: 'white',
                    fontWeight: 'bold',
                    width: '48%',
                    '&:hover': {
                      backgroundColor: '#4029cc',
                    },
                  }}
                  onClick={() => handleOpenDialog(exam)} // Open report card dialog
                >
                  View Report Card
                </Button>

              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="body2">{error || 'No exams found for the selected date.'}</Typography>
        )}
      </Box>

      {/* Dialog for viewing the report card */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#503dff', color: '#fff', textAlign: 'center', padding: '20px' }}>
          <Typography variant="h5" fontWeight="bold">Student Report Card</Typography>
        </DialogTitle>
        <DialogContent sx={{ padding: 3, backgroundColor: '#f9f9f9', border: '2px solid #503dff', borderRadius: '8px' }}>
          <Box sx={{ textAlign: 'center', marginBottom: 3, marginTop: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="#503dff">School Details</Typography>
            <Box sx={{ marginTop: 1, lineHeight: 1.8 }}>
              <Typography variant="body1"><strong>School Name:</strong> {selectedReportCard ? selectedReportCard.school_name : 'Loading...'}</Typography>
              <Typography variant="body1"><strong>Principal:</strong> {selectedReportCard ? selectedReportCard.principal_name : 'Loading...'}</Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {selectedReportCard ? `${selectedReportCard.school_address}, ${selectedReportCard.school_city}` : 'Loading...'}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ marginBottom: 3 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <Avatar
              src={selectedReportCard ? selectedReportCard.student_image : ''}
              alt="Student Image"
              sx={{ width: 100, height: 100, marginRight: 3, border: '2px solid #503dff' }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {selectedReportCard ? `${selectedReportCard.first_name} ${selectedReportCard.last_name}` : 'Loading...'}
              </Typography>
              <Typography variant="body1"><strong>Roll Number:</strong> {selectedReportCard ? selectedReportCard.rolenum : 'Loading...'}</Typography>
              <Typography variant="body1"><strong>Grade:</strong> {selectedReportCard ? selectedReportCard.grade : 'Loading...'}</Typography>
            </Box>
          </Box>

          <Divider sx={{ marginBottom: 3 }} />

          <Box>
            <Typography variant="h6" fontWeight="bold" color="#503dff" sx={{ textAlign: 'center', marginBottom: 2 }}>
              Exam Details
            </Typography>
            <Box sx={{ marginTop: 1, padding: 2, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Exam Title:</strong> {selectedReportCard ? selectedReportCard.title : 'Loading...'}</Typography>
              <Typography variant="body1"><strong>Subject:</strong> {selectedReportCard ? selectedReportCard.subject : 'Loading...'}</Typography>
              <Typography variant="body1"><strong>Marks Obtained:</strong> {selectedReportCard ? selectedReportCard.gail_marks : 'Loading...'} / 100</Typography>
              <Typography variant="body1"><strong>Status:</strong> {selectedReportCard ? selectedReportCard.pass_fail : 'Loading...'}</Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ backgroundColor: '#503dff', padding: '10px 20px', justifyContent: 'center' }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Close
          </Button>

          {/* Add the Download PDF button */}
          <Button
            onClick={handleGeneratePDF}  // Trigger PDF download when clicked
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#4029cc',
              },
            }}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};




function App() {

  const [activeComponent, setActiveComponent] = useState("upcoming");

  const renderComponent = () => {
    switch (activeComponent) {
      case "upcoming":
        return <UpcomingExams />;
      case "results":
        return <ExamResults />;
      case "report":
        return <GenerateReportCard />;
      default:
        return <UpcomingExams />;
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'left',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        mb: 2,
        gap: 2, // Add gap between items
      }}>
        <Box onClick={() => setActiveComponent("upcoming")} className="box">
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" style={{ color: '#3d8cf2' }}
          ><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2v2M6 2v2m5.996 9h.008m-.008 4h.008m3.987-4H16m-8 0h.009M8 17h.009M3.5 8h17m-18 4.243c0-4.357 0-6.536 1.252-7.89C5.004 3 7.02 3 11.05 3h1.9c4.03 0 6.046 0 7.298 1.354C21.5 5.707 21.5 7.886 21.5 12.244v.513c0 4.357 0 6.536-1.252 7.89C18.996 22 16.98 22 12.95 22h-1.9c-4.03 0-6.046 0-7.298-1.354C2.5 19.293 2.5 17.114 2.5 12.756zM3 8h18" color="currentColor" /></svg>
          <Typography variant="caption" sx={{fontWeight :'bold'}} >Upcoming Exams</Typography>
        </Box>
        <Box onClick={() => setActiveComponent("results")} className="box">

         <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" style={{ color: '#16C47F' }}
         ><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18v4m-3.5 0l.328-.328c.578-.578.867-.867 1.235-1.02c.367-.152.776-.152 1.594-.152h.686c.818 0 1.226 0 1.594.152c.367.152.656.441 1.234 1.02L15.5 22m-13-10c0 2.828 0 4.243.879 5.121C4.257 18 5.672 18 8.5 18h7c2.828 0 4.243 0 5.121-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121C19.743 2 18.328 2 15.5 2h-7c-2.828 0-4.243 0-5.121.879C2.5 3.757 2.5 5.172 2.5 8zM8 13v-3m4 3V7m4 6v-2" color="currentColor"/></svg>
          <Typography variant="caption" sx={{fontWeight :'bold'}} >Exam Results</Typography>
        </Box>
        <Box onClick={() => setActiveComponent("report")} className="box">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" style={{ color: '#FF9D23' }}>
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" color="currentColor"><path d="M14 3.5h-4c-3.771 0-5.657 0-6.828 1.172S2 7.729 2 11.5v1c0 3.771 0 5.657 1.172 6.828S6.229 20.5 10 20.5h4c3.771 0 5.657 0 6.828-1.172S22 16.271 22 12.5v-1c0-3.771 0-5.657-1.172-6.828S17.771 3.5 14 3.5"/><path d="M5 16c1.036-2.581 4.896-2.75 6 0M9.75 9.75a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0M14 8.5h5M14 12h5m-5 3.5h2.5"/></g></svg>
          <Typography variant="caption" sx={{fontWeight :'bold'}} >Generate Report Card</Typography>
        </Box>
      </Box>

      <Box>
        {renderComponent()}
      </Box>
    </Box>
  );
}

export default App;
