import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from '../../src/Service/apiService';
import { Box, Grid, Typography, Card, CardContent, Avatar, Button, Divider } from "@mui/material";
import { School, Person, LiveTv, AttachMoney, Receipt, Report, Campaign, Laptop, Search, Public } from "@mui/icons-material";
import ClipLoader from "react-spinners/ClipLoader";
import { color } from "chart.js/helpers";

import live_class from '../../assets/Codt logos/live_class.png';
import school_fees from '../../assets/Codt logos/school_fees.png';
import report_card from '../../assets/Codt logos/report_card.png';
import notice from '../../assets/Codt logos/notice.png';
import online_course from '../../assets/Codt logos/online_course.png';
import career from '../../assets/Codt logos/career research.png';
import education_abroad from '../../assets/Codt logos/education_abroad.png';
import student from '../../assets/Codt logos/student.png';
import teacher from '../../assets/Codt logos/teacher.png';
import salary from '../../assets/Codt logos/salary.png';

const Data = [
  {
    icon: <img src={student} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Students",
    route: "/school/studentsdata",
  },
  {
    icon: <img src={teacher} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Teachers",
    route: "/school/Techerdata",
  },
  {
    icon: <img src={live_class} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Live Classes",
    route: "/school/liveclasses",
  },
  {

    icon: <img src={salary} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Salary",
    route: "/school/salary",
  },
  {
    icon: <img src={school_fees} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "School Fees",
    route: "/school/fees",
  },
  {
    icon: <img src={report_card} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Report Card",
    route: "/school/reportcard",
  },
  {
    icon: <img src={notice} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Notice",
    route: "/school/notice",
  },
  {
    icon: <img src={online_course} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Online",
    route: "/school/online",
  },
  {
    icon: <img src={career} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Career Research",
    route: "/school/career",
  },
  {
    icon: <img src={education_abroad} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Education Abroad",
    route: "/school/educationabroad",
  },
];

const SchoolProfile = () => {


  const [schoolData, setSchoolData] = useState({});
  // const [ratingData, setRatingData] = useState(null);
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [totalStudents, setTotalStudents] = useState(null); // State to store the total students

  //usestate for how are your today in school
  const [amazingStudents, setAmazingStudents] = useState([]);
  const [goodStudents, setGoodStundents] = useState([]);
  const [Okayish, setOkayish] = useState([]);
  const [notGood, setNotGood] = useState([]);
  const [totalStudets, setTotalstudets] = useState([]);
  const [date, setDate] = useState('');
  const myschoolCode = localStorage.getItem("schoolCode");

  const [schoolCode, setschoolCode] = useState(myschoolCode);

  const [amazingStudentss, setAmazingStudentss] = useState('Amazing');
  const [goodStudentss, setGoodStudentss] = useState('Good');
  const [Okayishs, setOkayishs] = useState('Okayish');
  const [notGoods, setNotGoods] = useState('Not Good');

  const [students, setStudents] = useState([]);

  const [counts, setCounts] = useState({ student_count: 0, teacher_count: 0 });



  useEffect(() => {


    const fetchAmazingStudnts = async () => {
      try {
        if (!date) return;  // Don't fetch until date is set

        // Fetch data from the PHP API that returns today's school data for 'Amazing'
        const { data, error } = await fetchData(`
              SELECT * 
              FROM \`schooltoday\` 
              WHERE \`current_date\` = '${date}' 
              AND \`schoolcode\` = '${schoolCode}' 
              AND \`schooltoday\` = '${amazingStudentss}'
            `);

        if (data) {
          setAmazingStudents(data);  // Set the students data into the state
        } else {
          setError(error);
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchGoodStudents = async () => {

      try {
        if (!date) return;  // Don't fetch until date is set

        // Fetch data from the PHP API that returns today's school data for 'Amazing'
        const { data, error } = await fetchData(`
              SELECT * 
              FROM \`schooltoday\` 
              WHERE \`current_date\` = '${date}' 
              AND \`schoolcode\` = '${schoolCode}' 
              AND \`schooltoday\` = '${goodStudentss}'
            `);

        if (data) {
          setGoodStundents(data);  // Set the students data into the state
        } else {
          setError(error);
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchOkayishStudents = async () => {

      try {
        if (!date) return;  // Don't fetch until date is set

        // Fetch data from the PHP API that returns today's school data for 'Amazing'
        const { data, error } = await fetchData(`
              SELECT * 
              FROM \`schooltoday\` 
              WHERE \`current_date\` = '${date}' 
              AND \`schoolcode\` = '${schoolCode}' 
              AND \`schooltoday\` = '${Okayishs}'
            `);

        if (data) {
          setOkayish(data);  // Set the students data into the state
        } else {
          setError(error);
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };


    const fetchNotGoodStudents = async () => {

      try {
        if (!date) return;  // Don't fetch until date is set

        // Fetch data from the PHP API that returns today's school data for 'Amazing'
        const { data, error } = await fetchData(`
              SELECT * 
              FROM \`schooltoday\` 
              WHERE \`current_date\` = '${date}' 
              AND \`schoolcode\` = '${schoolCode}' 
              AND \`schooltoday\` = '${notGoods}'
            `);

        if (data) {
          setNotGood(data);  // Set the students data into the state
        } else {
          setError(error);
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }

    };

    const fetchCounts = async () => {
      try {
        const response = await fetch(`https://codtsmartschool.strangeweb.in/total-student-teacher.php?schoolcode=${schoolCode}`);
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setCounts(data);
        }
      } catch (err) {
        setError('Failed to fetch counts');
      }
    };

    if (schoolCode) {
      fetchCounts();
    }

    fetchAmazingStudnts();
    fetchGoodStudents();
    fetchOkayishStudents();
    fetchNotGoodStudents();

  }, [date]);  // Add date as a dependency to refetch when it changes

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-CA'); // For Canadian style
    setDate(formattedDate);  // Set the formatted date
  }, []);


  useEffect(() => {

    const email = sessionStorage.getItem("schoolEmail");
    if (email) {
      fetchSchoolData(email);
    } else {
      navigate('/auth/schoollogin');
    }

  }, []);

  const fetchSchoolData = async (email) => {
    try {
      const response = await fetch(
        `https://codtsmartschool.strangeweb.in/schoolapi/tschool.php?email_id=${email}`
      );
      const data = await response.json();

      if (data.length > 0) {

        setSchoolData(data[0]);
        // console.log('School Data ', data)

        // Extract the school code and save it locally
        const schoolCode = data[0]?.schoolcode; // Replace 'school_code' with the actual key if different
        if (schoolCode) {
          localStorage.setItem('schoolCode', schoolCode);
        }
      }
    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  };


  //rating count code
  useEffect(() => {

    const fetchUsers = async () => {
      try {
        // Check if schoolData and schoolcode are defined
        // if (!schoolData || !schoolData?.schoolcode) {
        //     throw new Error("School code is not defined.");
        // }

        const { data: allUsers, error } = await fetchData(`SELECT * FROM students WHERE schoolcode='${schoolData.schoolcode}'`);
        // console.log("data is ", allUsers)
        if (error) {
          setError(error);
          console.error("Fetch error:", error);
          return;
        }

        if (allUsers) {
          // console.log("Fetched users:", allUsers);
          // Separate users into active and inactive
          const active = allUsers.filter(user => user.status === 'active');
          const inactive = allUsers.filter(user => user.status === "InActive");
          setActiveUsers(active);
          setInactiveUsers(inactive);
        }
      } catch (err) {
        console.error("An error occurred:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [schoolData]); // Add schoolData to dependency array

  console.log(activeUsers)
  console.log("inactive ", inactiveUsers)
  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <ClipLoader color="#000000" size={50} />
  </div>;
  // if (error) return <div>Error: {error}</div>;

  return (

    <Box>

      <Grid container >

        {/* Left Section */}
        <Grid item xs={12} md={7} lg={8} style={{ paddingRight: '24px' }}>
          <Card sx={{ borderRadius: 4, boxShadow: "none", p: 2, border: 'solid 1px #e8e8e8' }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                flexDirection={{ xs: "column", sm: "row" }}
                textAlign={{ xs: "center", sm: "left" }}
              >
                <Avatar
                  src={`https://codtsmartschool.strangeweb.in/schoolapi/uploads/${schoolData.logo}`}
                  alt="School Logo"
                  sx={{
                    width: { xs: 50, sm: 70 },
                    height: { xs: 50, sm: 70 },
                    borderRadius: "50%",
                    objectFit: "cover", border: 'solid 1px #696969',
                    mb: { xs: 2, sm: 0 }, marginRight: '30px'
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ marginBottom: '5px' }}>
                    {schoolData.school_name || "School Name"}
                  </Typography>
                  <Typography variant="body2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M12 2H6c-2.482 0-3 .518-3 3v17h12V5c0-2.482-.518-3-3-3m6 6h-3v14h6V11c0-2.482-.518-3-3-3M8 6h2M8 9h2m-2 3h2" /><path d="M11.5 22v-4c0-.943 0-1.414-.293-1.707S10.443 16 9.5 16h-1c-.943 0-1.414 0-1.707.293S6.5 17.057 6.5 18v4" /></g></svg>
                    {schoolData.address || "School Address"}
                  </Typography>
                </Box>

              </Box>

              <Divider sx={{ height: 1, backgroundColor: '#c9c9c9', my: 3 }} />

              {/* Action Buttons */}
              <div>

                <Card variant="outlined" sx={{ mb: 2, borderRadius: '10px', borderColor: '#503dff' }}>
                  <Box
                    sx={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', p: 2,
                    }} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} spacing={2} >
                      <Typography variant="body1">Total Students</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }} >{schoolData?.number_of_students}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} spacing={2} >
                      <Typography variant="body1" >Total Teachers</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }} >{schoolData?.number_of_teachers}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} spacing={2} >
                      <Typography variant="body1" >School Code</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }} >{schoolCode}</Typography>
                    </Box>
                  </Box>
                </Card>

                {/* Heading */}
                <Typography variant="h6" align="left" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Management
                </Typography>


                {/* Grid */}
                <Grid container spacing={2} >
                  {Data.map((item, idx) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.5} key={idx}>
                      <Link to={item.route} style={{ textDecoration: "none" }}>
                        <Box
                          sx={{
                            borderRadius: "12px",  // Updated borderRadius to 15px
                            overflow : 'hidden',
                            padding : '16px',
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            transition: "transform 0.3s",
                            '&:hover': {
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          {React.cloneElement(item.icon)}
                        </Box>
                        <Typography
                          variant="body1"
                          align="center"
                          sx={{ fontWeight: "bold" }}  // Set fontWeight to "bold"
                        >
                          {item.label}
                        </Typography>
                      </Link>
                    </Grid>
                  ))}
                </Grid>



              </div>



            </CardContent>
          </Card>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={5} lg={4}>


          <Card
            sx={{
              mb: 4, borderRadius: 4, p: 1,
              boxShadow: "none",
              border: "1px solid #e8e8e8", // Added border here with the specified color
            }}
          >
            <CardContent>
              {/* Title with increased font size and bold */}
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                Students Subscription Status
              </Typography>

              {/* Total Students Registered with smaller font size */}
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }} >
                Total Students : <strong> {activeUsers?.length + inactiveUsers?.length || "0"}  </strong>
              </Typography>

              {/* Subscription Active with custom color */}
              <Typography variant="body1" mt={2} color="#089451" >
                <span color="#503dff" > Subscription Active : </span><strong> {activeUsers?.length || "0"} </strong> students
              </Typography>

              {/* Subscription Expired with custom color */}
              <Typography variant="body1" mt={2} color="#ff0000" sx={{ fontWeight: 'bold' }} >
                Subscription expired : <strong> {inactiveUsers?.length || "0"} </strong> students
              </Typography>

              {/* Smaller font size for the caption */}
              <Typography variant="caption" color="textSecondary" mt={0} display="block" sx={{ fontSize: '0.75rem' }}>
                Please inform students to subscribe for uninterrupted services.
              </Typography>

              {/* Manage Button */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  width: '100%',
                  mt: 2
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    backgroundColor: '#503dff', // Custom color
                    '&:hover': {
                      backgroundColor: '#4027cc', // Optional: Hover color
                    },
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '6px' }} >
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M11.5 14.012a10.6 10.6 0 0 0-5.922 1.47c-1.415.842-5.125 2.562-2.865 4.715C3.816 21.248 5.045 22 6.59 22H12m3.5-15.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0M18 20.714V22m0-1.286a3.36 3.36 0 0 1-2.774-1.43M18 20.713a3.36 3.36 0 0 0 2.774-1.43M18 14.285c1.157 0 2.176.568 2.774 1.43M18 14.287a3.36 3.36 0 0 0-2.774 1.43M18 14.287V13m4 1.929l-1.226.788M14 20.07l1.226-.788M14 14.93l1.226.788M22 20.07l-1.226-.788m0-3.566a3.12 3.12 0 0 1 0 3.566m-5.548-3.566a3.12 3.12 0 0 0 0 3.566" color="currentColor" /></svg>
                  Manage
                </Button>
              </Box>


            </CardContent>
          </Card>


          {/* Student Day Stats */}
          <Card
            sx={{
              p: 1,
              borderRadius: 4, border: "1px solid #e8e8e8",
              bgcolor: "#ffffff",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                mb={3}
                color="primary"
                fontWeight="bold"
              >
                Student's Day Status
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography variant="body1" color="textSecondary">
                      🌟 Amazing:
                    </Typography>
                    <Typography variant="h6" color="textPrimary" fontWeight="bold">
                      {amazingStudents.length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography variant="body1" color="textSecondary">
                      👍 Good:
                    </Typography>
                    <Typography variant="h6" color="textPrimary" fontWeight="bold">
                      {goodStudents.length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography variant="body1" color="textSecondary">
                      🙂 Average:
                    </Typography>
                    <Typography variant="h6" color="textPrimary" fontWeight="bold">
                      {Okayish.length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography variant="body1" color="textSecondary">
                      👎 Not Good:
                    </Typography>
                    <Typography variant="h6" color="textPrimary" fontWeight="bold">
                      {notGood.length}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>



  );
};

export default SchoolProfile;
