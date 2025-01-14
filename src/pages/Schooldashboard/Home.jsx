import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from '../../src/Service/apiService';
import { Box, Grid, Typography, Card, CardContent, Avatar, Button, Divider } from "@mui/material";
import { School, Person, LiveTv, AttachMoney, Receipt, Report, Campaign, Laptop, Search, Public} from "@mui/icons-material";
import ClipLoader from "react-spinners/ClipLoader";
import { color } from "chart.js/helpers";


const Data = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m19 5l-7-3l-7 3l3.5 1.5v2S9.667 8 12 8s3.5.5 3.5.5v-2zm0 0v4m-3.5-.5v1a3.5 3.5 0 1 1-7 0v-1m-.717 8.203c-1.1.685-3.986 2.082-2.229 3.831C6.413 21.39 7.37 22 8.571 22h6.858c1.202 0 2.158-.611 3.017-1.466c1.757-1.749-1.128-3.146-2.229-3.83a7.99 7.99 0 0 0-8.434 0" color="currentColor"/></svg>,
    label: "Students",
    route: "/school/studentsdata",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M2 2h14c1.886 0 2.828 0 3.414.586S20 4.114 20 6v6c0 1.886 0 2.828-.586 3.414S17.886 16 16 16H9m1-9.5h6M2 17v-4c0-.943 0-1.414.293-1.707S3.057 11 4 11h2m-4 6h4m-4 0v5m4-5v-6m0 6v5m0-11h6"/><path d="M6 6.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/></g></svg>,
    label: "Teachers",
    route: "/school/Techerdata",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M14 2h-4c-3.28 0-4.919 0-6.081.814a4.5 4.5 0 0 0-1.105 1.105C2 5.08 2 6.72 2 10s0 4.919.814 6.081a4.5 4.5 0 0 0 1.105 1.105C5.08 18 6.72 18 10 18h4c3.28 0 4.919 0 6.081-.814a4.5 4.5 0 0 0 1.105-1.105C22 14.92 22 13.28 22 10s0-4.919-.814-6.081a4.5 4.5 0 0 0-1.105-1.105C18.92 2 17.28 2 14 2m.5 20l-.316-.419c-.71-.940-.887-2.387-.437-3.581M9.5 22l.316-.419c.71-.940.887-2.387.437-3.581M7 22h10"/><path d="M8 14c1.838-2.595 6.119-2.737 8 0m-2-6a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/></g></svg>,
    label: "Live Classes",
    route: "/school/liveclasses",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M19.745 13a7 7 0 1 0-12.072-1"/><path d="M14 6c-1.105 0-2 .672-2 1.5S12.895 9 14 9s2 .672 2 1.5s-.895 1.5-2 1.5m0-6c.87 0 1.612.417 1.886 1M14 6V5m0 7c-.87 0-1.612-.417-1.886-1M14 12v1M3 14h2.395c.294 0 .584.066.847.194l2.042.988c.263.127.553.193.848.193h1.042c1.008 0 1.826.791 1.826 1.767c0 .04-.027.074-.066.085l-2.541.703a1.95 1.95 0 0 1-1.368-.124L5.842 16.75M12 16.5l4.593-1.411a1.985 1.985 0 0 1 2.204.753c.369.51.219 1.242-.319 1.552l-7.515 4.337a2 2 0 0 1-1.568.187L3 20.02"/></g></svg>,
    label: "Salary",
    route: "/school/salary",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M20 9.91V7.817c0-1.693 0-2.54-.267-3.216c-.431-1.087-1.342-1.940-2.497-2.35C16.517 2 15.618 2 13.819 2c-3.149 0-4.723 0-5.98.401c-2.021.71-3.616 2.21-4.37 4.113C3 7.737 3 9.219 3 12.182v2.545c0 3.07 0 4.604.848 5.67q.367.461.856.805C5.836 22 7.467 22 10.728 22h.773c.534 0 1.533 0 2-.003M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.45.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.174-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13.001 2"/><path d="M20.753 15.811c.104-1.264-1.83-2.297-3.309-1.604c-1.847.865-1.686 3.052.595 3.168c1.015.052 1.903-.058 2.507.596c.603.654.865 2.32-.914 2.884s-3.633-.402-3.633-1.672M18.472 13v.978m0 7.242V22"/></g></svg>,
    label: "School Fees",
    route: "/school/fees",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M14 3.5h-4c-3.771 0-5.657 0-6.828 1.172S2 7.729 2 11.5v1c0 3.771 0 5.657 1.172 6.828S6.229 20.5 10 20.5h4c3.771 0 5.657 0 6.828-1.172S22 16.271 22 12.5v-1c0-3.771 0-5.657-1.172-6.828S17.771 3.5 14 3.5"/><path d="M5 16c1.036-2.581 4.896-2.75 6 0M9.75 9.75a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0M14 8.5h5M14 12h5m-5 3.5h2.5"/></g></svg>,
    label: "Report Card",
    route: "/school/reportcard",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M12.5 3h-1C7.022 3 4.782 3 3.391 4.391S2 8.021 2 12.5c0 4.478 0 6.718 1.391 8.109S7.021 22 11.5 22c4.478 0 6.718 0 8.109-1.391S21 16.979 21 12.5v-1"/><path d="M22 5.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0M7 11h4m-4 5h8"/></g></svg>,
    label: "Notice",
    route: "/school/notice",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5.409 17.118c-.359-1.516-.538-2.274-.303-2.858c.146-.363.396-.676.72-.9C6.346 13 7.13 13 8.702 13h6.597c1.57 0 2.355 0 2.875.36c.324.224.574.537.72.9c.235.584.056 1.342-.303 2.858c-.353 1.494-.53 2.24-.97 2.777a3 3 0 0 1-1.02.802c-.628.303-1.402.303-2.949.303h-3.304c-1.547 0-2.32 0-2.948-.303a3 3 0 0 1-1.02-.802c-.402-.537-.618-1.283-.971-2.777M3 21h18m-10-5h2m-5-5c1.838-2.595 6.119-2.737 8 0m-2-6a2 2 0 1 1-4 0a2 2 0 0 1 4 0" color="currentColor"/></svg>,
    label: "Online",
    route: "/school/online",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M22 12.089V9.236c0-1.940 0-2.916-.586-3.52S19.886 5.112 18 5.112h-2.079c-.917 0-.925-.002-1.75-.416l-3.331-1.67c-1.391-.698-2.087-1.047-2.828-1.023S6.6 2.421 5.253 3.208l-1.227.719c-.989.578-1.483.867-1.754 1.348C2 5.756 2 6.342 2 7.513v8.236c0 1.539 0 2.309.342 2.737c.228.285.547.476.9.54c.53.095 1.18-.284 2.478-1.040c.882-.516 1.73-1.052 2.785-.907c.884.122 1.705.681 2.495 1.077M8 2.002v15.034m7-12.027v6.013"/><path d="m20.107 20.175l1.845 1.823m-.783-4.36a3.56 3.56 0 1 1-7.121.001a3.56 3.56 0 0 1 7.121 0"/></g></svg>,
    label: "Career Research",
    route: "/school/career",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 22C6.477 22 2 17.523 2 12a9.97 9.97 0 0 1 2.99-7.132M12 22c-.963-.714-.81-1.540-.326-2.375c.743-1.278.743-1.278.743-2.98c0-1.704 1.012-2.502 4.583-1.788c1.605.321 2.774-1.896 4.857-1.164M12 22c4.946 0 9.053-3.59 9.857-8.307m0 0Q22 12.867 22 12c0-4.881-3.498-8.946-8.123-9.824m0 0c.51.94.305 2.06-.774 2.487c-1.76.697-.5 1.98-2 2.773c-1 .528-2.499.396-3.998-1.189c-.79-.834-1.265-1.29-2.115-1.379m8.887-2.692A10 10 0 0 0 12 2a9.97 9.97 0 0 0-7.01 2.868" color="currentColor"/></svg>,
    label: "Education Abroad",
    route: "/school/educationabroad",
  },
];

const SchoolProfile = () => {


  const [schoolData, setSchoolData] = useState({});
  const [ratingData, setRatingData] = useState(null);
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
        console.log('School Data ' + data[0])

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
        console.log("data is ", allUsers)
        if (error) {
          setError(error);
          console.error("Fetch error:", error);
          return;
        }

        if (allUsers) {
          console.log("Fetched users:", allUsers);
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
        <Grid item xs={12} md={7} lg={8} style={{paddingRight : '24px'}}>
          <Card sx={{ borderRadius: 4, boxShadow: "none", p:2, border :'solid 1px #e8e8e8' }}>
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
                    objectFit: "cover", border : 'solid 1px #696969',
                    mb: { xs: 2, sm: 0 }, marginRight : '30px'
                  }}
                />
                <Box  sx={{display : 'flex', flexDirection : 'column'}} >
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{marginBottom : '5px'}}>
                    {schoolData.school_name || "School Name"}
                  </Typography>
                  <Typography variant="body2" fontWeight={600} gutterBottom sx={{display : 'flex', alignItems : 'start', gap : '10px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M12 2H6c-2.482 0-3 .518-3 3v17h12V5c0-2.482-.518-3-3-3m6 6h-3v14h6V11c0-2.482-.518-3-3-3M8 6h2M8 9h2m-2 3h2"/><path d="M11.5 22v-4c0-.943 0-1.414-.293-1.707S10.443 16 9.5 16h-1c-.943 0-1.414 0-1.707.293S6.5 17.057 6.5 18v4"/></g></svg>
                    {schoolData.address || "School Address"}
                  </Typography>
                </Box>

              </Box>

              <Divider sx={{ height: 1, backgroundColor: '#c9c9c9', my:3 }} />

              {/* Action Buttons */}
              <div>

              <Card variant="outlined" sx={{mb:2, borderRadius : '10px', borderColor : '#503dff'}}>
                <Box 
                sx={{display : 'flex', justifyContent : 'space-between', 
                alignItems : 'center', p : 2,}} >
                  <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'center'}} spacing={2} >
                    <Typography variant="body1">Total Students</Typography>
                    <Typography variant="h6" sx={{fontWeight : 'bold'}} >0</Typography>
                  </Box>
                  <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'center'}} spacing={2} >
                    <Typography variant="body1" >Total Teachers</Typography>
                    <Typography variant="h6" sx={{fontWeight : 'bold'}} >0</Typography>
                  </Box>
                  <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'center'}} spacing={2} >
                    <Typography variant="body1" >School Code</Typography>
                    <Typography variant="h6" sx={{fontWeight : 'bold'}} >{schoolCode}</Typography>
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
                            borderRadius: "16px",  // Updated borderRadius to 15px
                            padding: "20px",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: [
                              "#19b8bd",
                              "#D39D55",
                              "#6256CA",
                              "#C84C05",
                              "#16C47F",
                              "#c44e7f",
                              "#ff914d",
                              "#3d8cf2"
                            ][idx % 8],
                            transition: "transform 0.3s",
                            '&:hover': {
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          {React.cloneElement(item.icon, { style: { color: "#fff" } })}
                        </Box>
                        <Typography
                          variant="body1"
                          align="center"
                          sx={{ mt: 1, fontWeight: "bold" }}  // Set fontWeight to "bold"
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
              mb: 4, borderRadius: 4, p : 1,
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
                  mt : 2
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
