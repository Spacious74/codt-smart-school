import React, { useState , useEffect} from "react";
import { Box, TextField, IconButton, Button, Avatar , Card , Divider , Typography, Grid , Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Upcoming Exams
      </Typography>
      {data.map((exam, index) => (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          key={index}
          sx={{
            borderBottom: '1px solid #eee',
            paddingBottom: 2,
            marginBottom: 2,
          }}
        >
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">{exam.subject}</Typography>
            <Typography variant="body2">{exam.title}</Typography>
            <Typography variant="caption" color="textSecondary">
              Posted by{' '}
              <a href="#" style={{ color: '#2f58cd' }}>
                {exam.teacheremail || 'Unknown'}
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              Start Date -{' '}
              <span style={{ color: '#2f58cd' }}>{exam.exam_date}</span>
            </Typography>
            <Typography variant="body2">
              End Date -{' '}
              <span style={{ color: '#2f58cd' }}>{exam.endDate || 'none'}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} gap={8} >
          <Button
              onClick={() => openWebsite(exam?.timetable_path)}
              variant="contained"
              sx={{
                backgroundColor: '#2f58cd',
                color: '#fff',
                '&:hover': { backgroundColor: '#3e71f7' },
                
              }} style={{marginRight:'20px'}}
            >
              View Time Table
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2f58cd',
                color: '#fff',
                '&:hover': { backgroundColor: '#3e71f7' },
              }}
            >
              Exam Instructions
            </Button>
          </Grid>
        </Grid>
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
      textTransform:'capitalize',
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
      textTransform:'capitalize',
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
     textTransform:'capitalize',
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
    <Box sx={{ textAlign: 'center', marginBottom: 3, marginTop:2 }}>
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
        justifyContent: 'space-around',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        mb: 2,
        gap: 2, // Add gap between items
      }}>
        <IconButton onClick={() => setActiveComponent("upcoming")} sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <EventIcon fontSize="large" />
          <Typography variant="caption">Upcoming Exams</Typography>
        </IconButton>
        <IconButton onClick={() => setActiveComponent("results")} sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <AssessmentIcon fontSize="large" />
          <Typography variant="caption">Exam Results</Typography>
        </IconButton>
        <IconButton onClick={() => setActiveComponent("report")} sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <ReceiptIcon fontSize="large" />
          <Typography variant="caption">Generate Report Card</Typography>
        </IconButton>
      </Box>

      <Box>
        {renderComponent()}
      </Box>
    </Box>
  );
}

export default App;
