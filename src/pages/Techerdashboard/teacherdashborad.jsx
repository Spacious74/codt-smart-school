import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { fetchData } from '../../src/Service/apiService'; // Assuming this is the utility for fetching data
import {
  Person, LiveTv, Receipt, Report, Campaign, Laptop, Search, Public,
} from '@mui/icons-material';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

import academics from '../../assets/Codt logos/academics.png';
import live_class from '../../assets/Codt logos/live_class.png';
import report_card from '../../assets/Codt logos/report_card.png';
import notice from '../../assets/Codt logos/notice.png';
import online_course from '../../assets/Codt logos/online_course.png';
import career from '../../assets/Codt logos/career research.png';
import education_abroad from '../../assets/Codt logos/education_abroad.png';
import salary from '../../assets/Codt logos/salary.png';

const data = [
  {
    icon:  <img src={academics} alt="external-user" style={{borderRadius :'10px'}} />,
    label: 'Academics',
    route: '/teacher/academics',
  },
  {
    icon: <img src={live_class} alt="external-user" style={{borderRadius :'10px'}} />,
    label: 'Live Classes',
    route: '/teacher/studentsdata',
  },
  {
    icon: <img src={salary} alt="external-user" style={{borderRadius :'10px'}} />,
    label: 'Salary',
    route: '/teacher/studentsdata',
  },
  {
    icon: <img src={report_card} alt="external-user" style={{borderRadius :'10px'}} />,
    label: 'Report Card',
    route: '/teacher/studentsdata',
  },
  {
    icon: <img src={notice} alt="external-user" style={{borderRadius :'10px'}} />,
    label: 'Notice',
    route: '/teacher/notice',
  },
  {
    icon: <img src={online_course} alt="external-user" style={{borderRadius :'10px'}} />,
    label: 'Online Courses',
    route: 'https://codt.in/',
  },
  {
    icon: <img src={career} alt="external-user" style={{borderRadius :'10px'}} />,
    label: 'Career Research',
    route: '/teacher/career',
  },
  {
    icon: <img src={education_abroad} alt="external-user" style={{borderRadius :'10px'}} />,
    label: 'Education Abroad',
    route: '/teacher/studentsdata',
  },
];

const PerformanceMeter = ({ performance }) => {


  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [performance, 100 - performance],
        backgroundColor: [blue[300], '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };



  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label === 'Completed'
              ? `Performance: ${performance}%`
              : '';
          },
        },
      },
      legend: {
        display: false,
      },
    },
    cutout: '80%',
  };


  return (
    <Card sx={{ bgcolor: '#503dff', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
      <Typography variant="h5">Academic Performance</Typography>
      <Box sx={{ width: 70, height: 70 }}>
        <Doughnut data={data} options={options} />
      </Box>
      <Typography variant="h5" sx={{ mt: 2 }} />
    </Card>
  );
};

const Sidebar = () => {

  const [schoolData, setSchoolData] = useState({});
  const [attendanceData, setAttendanceData] = useState(null); // State for dynamic attendance data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [uid, setUid] = useState(''); // Assuming you use UID for fetching attendance
  const [schoolCode, setSchoolCode] = useState(''); // School code from localStorage
  const [reviews, setReviews] = useState([]); // Reviews state

  // Fetch school data (unchanged)
  useEffect(() => {
    const email = sessionStorage.getItem('teacherEmail');
    if (email) {
      fetchSchoolData(email);
    }
  }, []);

  // Step 1: Retrieve the object from localStorage
  const storedTeacherData = localStorage.getItem('teacherData');

  // Step 2: Parse the JSON string into an object if it exists and set default values for the form
  useEffect(() => {
    if (storedTeacherData) {
      try {
        // Parse the data from localStorage
        const teacher = JSON.parse(storedTeacherData);
        // Directly extract id and schoolcode from the parsed object
        const { id, schoolcode } = teacher;
        setUid(id);  // Set the UID state with the id from localStorage
        setSchoolCode(schoolcode);  // Set the schoolCode state with schoolcode from localStorage
      } catch (error) {
        console.log("Error parsing teacher data:", error);
      }
    } else {
      console.log("No teacher data found in localStorage.");
    }
  }, [storedTeacherData]);  // Only run once when component mounts

  // Fetch school data from API
  const fetchSchoolData = async (email) => {
    try {
      const response = await fetch(`https://codtsmartschool.strangeweb.in/teacherapi/teacherdata.php?email_id=${email}`);
      const data = await response.json();
      if (data.length > 0) {
        setSchoolData(data[0]);
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
    }
  };

  // Fetch dynamic attendance data
  const fetchAttendanceData = async () => {


    setLoading(true);
    try {
      const currentYear = new Date().getFullYear();
      const startDate = `${currentYear}-03-01 00:00:00`;
      const endDate = `${currentYear + 1}-03-01 00:00:00`;

      const query = `SELECT * FROM attendance_table 
                     WHERE uid = ${uid} 
                     AND role = "teacher" 
                     AND attendance = "present" 
                     AND created_at BETWEEN '${startDate}' AND '${endDate}';`;

      const { data, error: fetchError } = await fetchData(query);

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setAttendanceData(data); // Set fetched data
      } else {
        setError('No attendance data found');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch review data
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const query = `SELECT * FROM reviews WHERE uid = ${uid} AND school_code = '${schoolCode}'`;
      const { data, error } = await fetchData(query);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setReviews(data);
      } else {
        setError('No reviews found.');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid && schoolCode) {
      fetchAttendanceData();  // Fetch attendance data based on UID
      fetchReviews();  // Fetch review data
    }
  }, [uid, schoolCode]);

  // Calculate attendance percentage
  const calculateAttendance = (attendanceData) => {
    if (!attendanceData || attendanceData.length === 0) return { present: 0, total: 0 };

    const presentDays = attendanceData.filter(item => item.attendance === 'present').length;
    const totalDays = 313;
    return {
      present: presentDays,
      total: totalDays,
      percentage: ((presentDays / totalDays) * 100).toFixed(2),
    };
  };

  // Calculate review stats (average rating and number of reviews)
  const calculateReviewStats = (reviews) => {
    if (!reviews || reviews.length === 0) return { averageRating: 0, totalReviews: 0 };

    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);

    return { averageRating, totalReviews };
  };

  // Handle dynamic chart and attendance display
  const { present, total, percentage } = calculateAttendance(attendanceData);
  const { averageRating, totalReviews } = calculateReviewStats(reviews);

  const attendanceChartData = {
    datasets: [{
      data: [percentage, 100 - percentage],
      backgroundColor: [blue[300], '#e0e0e0'],
      borderWidth: 0,
    }],
  };

  const attendanceChartOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label === 'Completed' ? `Attendance: ${percentage}%` : '';
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ p: 2, background: '#fafafa' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          {/* Student Profile Section */}
          <CardContent sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" mb={1} style={{ fontSize: '20px', color: '#503dff', fontWeight: '600' }}>
              Teacher Profile
            </Typography>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2} justifyContent={'start'}>
              <Box display={{ xs: 'contents', sm: 'flex' }} justifyContent={{ xs: 'flex-start', sm: 'flex-start' }} p={0}>
                <img
                  src={`https://codtsmartschool.strangeweb.in/teacherapi/${schoolData.image}`}
                  alt="Teacher Profile"
                  onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"}
                  style={{ height: '80px', width: '80px', borderRadius: '50%', objectFit: 'contain', border: '2px solid gray', marginTop: '1rem' }}
                />
              </Box>

              <Box>
                <Typography variant="h6" style={{ color: 'black', fontSize: '17px', fontWeight: '600' }}>
                  {schoolData.first_name || "Address"}
                </Typography>
                <Typography variant="subtitle1" style={{ color: 'black', fontWeight: '600' }}>
                  Experience - <span style={{ color: 'blue' }}>{schoolData.experience || "Address"}</span>
                  <br /> Faculty - <span style={{ color: 'blue' }}>{schoolData.selected_subjects || "Address"}</span>
                </Typography>
                {/* <Button variant="contained" color="primary" sx={{ mt: 1, fontSize: '11px', backgroundColor: '#503dff', color: 'white', '&:hover': { backgroundColor: 'rgba(80, 61, 255, 0.8)' } }}>
                  Edit Profile
                </Button> */}
              </Box>
            </Box>
          </CardContent>

          {/* Sidebar Links Section */}
          <Grid container spacing={2} mt={4}>
            {data.map((item, idx) => (
              <Grid item xs={6} sm={4} md={3} lg={2.5} key={idx}>
                <Link to={item.route}>
                  <Box
                    sx={{
                      borderRadius: "8px", // Border removed
                      padding: "16px",
                      textAlign: "center",
                      width: "100%",
                      height: "120px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box>{item.icon}</Box>
                  </Box>

                  <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                    {item.label}
                  </Typography>


                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Attendance Section */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ mb: 2, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">Attendance</Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {percentage ? `${percentage}%` : '0%'}
              </Typography>
              <Typography>
                You were present for <strong>{present || 0}</strong> days out of <strong>{total || 0}</strong> days
              </Typography>
            </Box>
            <Box mt={2} display="flex" justifyContent="center" alignItems="center" height={'150px'}>
              <Doughnut data={attendanceChartData} options={attendanceChartOptions} />
            </Box>
          </Card>

          {/* Rating Section */}
          <Card sx={{ mb: 2, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {averageRating ? `${averageRating} / 5` : '0 / 5'}
              </Typography>
              <Typography fontWeight="bold">
                You are reviewed by <span>{totalReviews || 0}</span> students
              </Typography>
            </Box>
            <Box mt={2} display="flex" justifyContent="center" alignItems="center" height={'150px'}>
              <Rating name="rating" value={averageRating || 0} readOnly precision={0.1} sx={{ color: 'yellow' }} />
            </Box>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Sidebar;
