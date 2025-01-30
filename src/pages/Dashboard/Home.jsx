import React, { useEffect, useState } from "react";
import { Box, CardContent, Typography, Avatar, Button, Grid, Rating, AvatarGroup, Divider } from "@mui/material";
import profiless from "../../images/profiles.png";
import Resorcess from "./Resource.jsx";
import { Link } from "react-router-dom";
import academics from '../../assets/Codt logos/academics.png';
import live_class from '../../assets/Codt logos/live_class.png';
import school_fees from '../../assets/Codt logos/school_fees.png';
import report_card from '../../assets/Codt logos/report_card.png';
import notice from '../../assets/Codt logos/notice.png';
import online_course from '../../assets/Codt logos/online_course.png';
import career from '../../assets/Codt logos/career research.png';
import education_abroad from '../../assets/Codt logos/education_abroad.png';

const datas = [
  {
    icon: <img src={academics} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Academics",
    route: "/app/academics",
  },

  {
    icon: <img src={live_class} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Live Classes",
    route: "/app/home",
  },

  {
    icon: <img src={school_fees} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Pay School Fees",
    route: "/app/pricing",
  },
  {
    icon: <img src={report_card} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Report Card",
    route: "/app/academics/exams/examdetail",
  },
  {
    icon: <img src={notice} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Notice",
    route: "/app/notice",
  },
  {
    icon:  <img src={online_course} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Online Courses",
    route: "https://codt.in/",

  },
  {
    icon: <img src={career} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Career",
    route: "/app/career",
  },
  {
    icon: <img src={education_abroad} alt="external-user" style={{borderRadius :'10px'}} />,
    label: "Education Abroad",
    route: "/app/home",
  },
];

const Home = () => {

  const [info, setInfo] = useState(null);

  useEffect(() => {

    const storedData = localStorage.getItem("stud");

    if (storedData) {

      const parsedData = JSON.parse(storedData);
      setInfo(parsedData);

      console.log("ID:", parsedData.data.id);
      console.log("Data:", parsedData.data);

    } else {
      // If not, redirect to the desired path
      window.location.href = "/auth/signin";
    }

  }, []);

  if (!info) {
    // Optionally, you could return null or a loading state here
    return null;
  }

  // Convert the response data into an array if needed
  const dataArray = Object.entries(info.data).map(([key, value]) => ({
    key,
    value,
  }));

  // how was your school today
  const sid = info.data.id; // Replace with the actual student ID
  const schoolcode = info.data.schoolCode; // Replace with the actual school code

  const handleButtonClick = async (response) => {
    const data = {
      sid: sid,
      schoolcode: schoolcode,
      response: response,
    };

    // Log the data being sent to the server
    console.log("Sending data to server:", data);

    try {
      const apiResponse = await fetch(
        "https://codtsmartschool.strangeweb.in/studentapi/schooltoday.php",
        {
          method: "POST", // Ensure this is POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Make sure data is properly formatted
        }
      );

      // Check if the response is ok (status in the range 200-299)
      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await apiResponse.json();
      console.log("Response from server:", result); // Log the server response

      if (result.status === "success") {
        alert(result.message);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the response.");
    }
  }; console.log(info)

  // how was you school today end

  return (
    <>
      {/* <p><strong>ID:</strong> {info.data.id}</p> */}
      <Box display="flex" flexDirection="column" p={2}>

        <Grid container spacing={2} sx={{gap:'26px'}} >

          <Grid xs={12} sm={7.5}
            sx={{ backgroundColor: '#fff', borderRadius: '14px', border: 'solid 1px #e8e8e8', p: 3 }}>
            {/* Student Profile Section */}
            <CardContent sx={{ mb: 2, p: 0 }}>
              <Typography mb={1}
                style={{
                  fontSize: "20px",
                  color: "#503dff",
                  fontWeight: "600",
                }}
              >
                Student Profile
              </Typography>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems="center" gap={2} justifyContent="flex-start"
                py={2} // Add padding for better spacing
              >
                <Box display={{ xs: "flex", sm: "flex" }} justifyContent="center" alignItems="center">
                  <img
                    src={`https://codtsmartschool.strangeweb.in/studentapi/${info.data.image}`}
                    style={{
                      width: 100, height: 100,
                      borderRadius: "50%", // Make the profile picture circular
                      objectFit: "cover", // Ensure the image covers the box
                      border: "2px solid #503dff", // Add a border around the image
                    }}
                    alt="Profile"
                  />
                </Box>
                <Box textAlign={{ xs: "center", sm: "left" }}>
                  {/* Center text on mobile */}
                  <Typography variant="h6"
                    sx={{
                      color: "black",
                      fontSize: { xs: "18px", sm: "20px" }, // Responsive font size
                      fontWeight: "600",
                    }}
                  >
                    {info.data.first_name} {info.data.lastName}
                  </Typography>
                  <Typography variant="body2">
                    Class
                    {/* &nbsp; is blank space character */}
                    <span style={{ color: "blue" }}>
                      &nbsp; {info.data.grade || "Loading..."}
                    </span>
                    &nbsp; |&nbsp; Division
                    <span style={{ color: "blue" }}>
                      &nbsp; {info.data.division || "Loading..."}
                    </span>
                    &nbsp; |&nbsp; Roll Number
                    <span style={{ color: "blue" }}>
                      &nbsp; {info.data.rolenum || "Loading..."}
                    </span>
                  </Typography>
                  <Link to="/app/editstud">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 1,
                        fontSize: "0.85rem",
                        backgroundColor: "#503dff",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(80, 61, 255, 0.8)",
                        },
                        padding: "6px 16px", // Adjust padding for button
                        borderRadius: "8px", // Rounded corners for button
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: "6px" }}
                      ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 22H6.59c-1.545 0-2.774-.752-3.877-1.803c-2.26-2.153 1.45-3.873 2.865-4.715c2.55-1.52 5.628-1.87 8.422-1.054M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.933 7.349c.335-.364.503-.546.681-.652a1.4 1.4 0 0 1 1.397-.02c.18.1.354.277.7.63c.345.353.518.53.616.714c.238.447.23.988-.02 1.427c-.104.182-.282.353-.638.696l-4.231 4.075c-.674.65-1.011.974-1.432 1.139c-.421.164-.885.152-1.81.128l-.127-.003c-.282-.008-.422-.012-.504-.105s-.071-.236-.049-.523l.012-.156c.063-.808.095-1.213.253-1.576c.157-.363.43-.658.974-1.248z" color="currentColor" /></svg>
                      Edit Profile
                    </Button>
                  </Link>
                </Box>
              </Box>
              <Divider sx={{ height: 1, backgroundColor: '#e8e8e8', mt: 1 }} />
            </CardContent>
            <Grid container py={2} spacing={1}>
              {datas.map((item, idx) => (
                <Grid  xs={6} sm={4} md={3} lg={2.5} key={idx}>
                  <Link to={item.route}
                    style={{ textDecoration: "none", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginBottom: '14px'}} >
                    <Box
                      sx={{
                        borderRadius: "12px",
                        padding: "12px",
                        width: { xs: "80%" },
                        height: "90px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all 0.3s ease",
                        '&:hover': {
                          transform: "scale(1.05)",
                        },
                      }}
                    >

                      <Box>
                        {React.cloneElement(item.icon)}
                      </Box>

                    </Box>

                    <Typography variant="body2" sx={{textAlign: 'center', fontWeight: 'bold' }}>
                      {item.label}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ height: '1px', backgroundColor: '#e8e8e8', mb: 2 }} />
            <Resorcess />
          </Grid>

          <Grid xs={12} sm={4} sx={{ borderRadius: '14px', border: 'solid 1px #e8e8e8', backgroundColor: '#fff'}} p={1} >
            {/* Review Section */}
            <CardContent>
              <Typography sx={{color: "black", fontSize: "16px", fontWeight: "600" }}>
                Review your teachers
              </Typography>

              <Box display="flex" alignItems="center" gap={2} sx={{ mt: 1 }}>
                <AvatarGroup max={3}>
                  <Avatar src={profiless} />
                  <Avatar src={profiless} />
                  <Avatar src={profiless} />
                </AvatarGroup>
                <Rating value={4} precision={0.5} readOnly />
              </Box>
              
              <Link to="/app/reviewteacher" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#503dff",
                    color: "white",
                    width: "100%",
                    size: "large",
                    mt: 2,
                  }}
                >
                  Give Review
                </Button>
              </Link>
            </CardContent>
            <Divider sx={{ height: '1px', backgroundColor: '#e8e8e8', my: 1 }} />
            <CardContent>
              <Typography
                sx={{ color: "black", fontSize: "16px", fontWeight: "600" }}
              >
                How was school today?
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={1}>
                {[
                  { label: "🤗 Amazing", value: "Amazing" },
                  { label: "😎 Good", value: "Good" },
                  { label: "😊 Okayish", value: "Okayish" },
                  { label: "😭 Not Good", value: "Not Good" },
                ].map(({ label, value }, index) => (
                  <Grid item xs={6} key={value}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleButtonClick(value)}
                      sx={{
                        mt: 2,
                        color: "black",
                        width: "130px",
                        "&:hover": {
                          borderColor: "black",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      {label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Divider sx={{ height: '1px', backgroundColor: '#e8e8e8', my: 1 }} />
            {/* See All section */}
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
                sx={{ mt: 1 }}
              >
                <Typography sx={{ color: "black", fontSize: "16px", fontWeight: "600" }}>
                  See your classmates performance
                </Typography>
                <AvatarGroup
                  max={6}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Avatar src={profiless} />
                  <Avatar src={profiless} />
                  <Avatar src={profiless} />
                  <Avatar src={profiless} />
                  <Avatar src={profiless} />
                  <Avatar src={profiless} />
                </AvatarGroup>
                <Typography
                  variant="body2"
                  color="primary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  See All
                </Typography>
              </Box>
            </CardContent>
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default Home;
