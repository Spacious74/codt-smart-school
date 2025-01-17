import React, { useEffect, useState } from "react";
import { Box, CardContent, Typography, Avatar, Button, Grid, Rating, AvatarGroup, Divider } from "@mui/material";
import profiless from "../../images/profiles.png";
import Resorcess from "./Resource.jsx";
import { Link } from "react-router-dom";

const datas = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m19 5l-7-3l-7 3l3.5 1.5v2S9.667 8 12 8s3.5.5 3.5.5v-2zm0 0v4m-3.5-.5v1a3.5 3.5 0 1 1-7 0v-1m-.717 8.203c-1.1.685-3.986 2.082-2.229 3.831C6.413 21.39 7.37 22 8.571 22h6.858c1.202 0 2.158-.611 3.017-1.466c1.757-1.749-1.128-3.146-2.229-3.83a7.99 7.99 0 0 0-8.434 0" color="currentColor" /></svg>,
    label: "Academics",
    route: "/app/academics",
  },

  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M14 2h-4c-3.28 0-4.919 0-6.081.814a4.5 4.5 0 0 0-1.105 1.105C2 5.08 2 6.72 2 10s0 4.919.814 6.081a4.5 4.5 0 0 0 1.105 1.105C5.08 18 6.72 18 10 18h4c3.28 0 4.919 0 6.081-.814a4.5 4.5 0 0 0 1.105-1.105C22 14.92 22 13.28 22 10s0-4.919-.814-6.081a4.5 4.5 0 0 0-1.105-1.105C18.92 2 17.28 2 14 2m.5 20l-.316-.419c-.71-.940-.887-2.387-.437-3.581M9.5 22l.316-.419c.71-.940.887-2.387.437-3.581M7 22h10" /><path d="M8 14c1.838-2.595 6.119-2.737 8 0m-2-6a2 2 0 1 1-4 0a2 2 0 0 1 4 0" /></g></svg>,
    label: "Live Classes",
    route: "/app/home",
  },

  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M20 9.91V7.817c0-1.693 0-2.54-.267-3.216c-.431-1.087-1.342-1.940-2.497-2.35C16.517 2 15.618 2 13.819 2c-3.149 0-4.723 0-5.98.401c-2.021.71-3.616 2.21-4.37 4.113C3 7.737 3 9.219 3 12.182v2.545c0 3.07 0 4.604.848 5.67q.367.461.856.805C5.836 22 7.467 22 10.728 22h.773c.534 0 1.533 0 2-.003M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.45.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.174-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13.001 2" /><path d="M20.753 15.811c.104-1.264-1.83-2.297-3.309-1.604c-1.847.865-1.686 3.052.595 3.168c1.015.052 1.903-.058 2.507.596c.603.654.865 2.32-.914 2.884s-3.633-.402-3.633-1.672M18.472 13v.978m0 7.242V22" /></g></svg>,
    label: "Pay School Fees",
    route: "/app/pricing",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M14 3.5h-4c-3.771 0-5.657 0-6.828 1.172S2 7.729 2 11.5v1c0 3.771 0 5.657 1.172 6.828S6.229 20.5 10 20.5h4c3.771 0 5.657 0 6.828-1.172S22 16.271 22 12.5v-1c0-3.771 0-5.657-1.172-6.828S17.771 3.5 14 3.5" /><path d="M5 16c1.036-2.581 4.896-2.75 6 0M9.75 9.75a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0M14 8.5h5M14 12h5m-5 3.5h2.5" /></g></svg>,
    label: "Report Card",
    route: "/app/academics/exams/examdetail",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" color="currentColor"><path d="M12.5 3h-1C7.022 3 4.782 3 3.391 4.391S2 8.021 2 12.5c0 4.478 0 6.718 1.391 8.109S7.021 22 11.5 22c4.478 0 6.718 0 8.109-1.391S21 16.979 21 12.5v-1" /><path d="M22 5.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0M7 11h4m-4 5h8" /></g></svg>,
    label: "Notice",
    route: "/app/notice",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="M20.5 16.929V10c0-3.771 0-5.657-1.172-6.828S16.271 2 12.5 2h-1C7.729 2 5.843 2 4.672 3.172S3.5 6.229 3.5 10v9.5" /><path d="M20.5 17H6a2.5 2.5 0 0 0 0 5h14.5" /><path d="M20.5 17a2.5 2.5 0 0 0 0 5M8 7.374C9.149 6.504 10.52 6 11.995 6c1.478 0 2.854.508 4.005 1.382m-1.826 2.336a4.3 4.3 0 0 0-2.18-.594c-.779 0-1.516.211-2.17.588M12 12h.006" /></g></svg>,
    label: "Online Courses",
    route: "https://codt.in/",

  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color="currentColor"><path d="M21.16 9.928c1.033-.386 1.126-2.235.209-4.129c-.918-1.893-2.498-3.114-3.53-2.727m3.322 6.856c-1.032.387-2.612-.834-3.53-2.727c-.917-1.894-.824-3.743.208-4.13m3.322 6.857l-15 9c-1.032.387-2.612-.834-3.53-2.727c-.917-1.894-.824-3.743.208-4.13l15-9" /><path d="M15 13.607c-1.362-.573-4.077-2.657-4.043-6.406m.543 8.5c-1.167-.557-3.6-2.623-4-6.432M15.43 14c.598 1.13 1.209 4.112-.88 7l-.987-1.416L11 20.81s1.825-1.923.953-4.81" /></g></svg>,
    label: "Career",
    route: "/app/career",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.498 5c-1.303-.022-1.928.234-2.275 1.142C2.013 6.693 2 7.296 2 7.886V18c.108.634.288 1.055.742 1.4c.741.56 1.725.637 2.64.803c2.004.363 3.747.978 6.612 1.797m7.495-17c.577-.05 1.01-.023 1.354.13c1.372.615 1.144 2.632 1.144 4.136V17c.007.597-.031 1.061-.115 1.432c-.32 1.41-2.129 1.587-3.55 1.85c-1.778.328-3.675.897-6.328 1.718m0 0v-7m-.001-3a5 5 0 0 0 4.997-5c0-2.762-2.237-5-4.997-5m0 10a5 5 0 0 1-4.997-5c0-2.762 2.237-5 4.997-5m0 10c1.104 0 1.999-2.24 1.999-5c0-2.762-.895-5-2-5m0 10c-1.103 0-1.998-2.24-1.998-5c0-2.762.895-5 1.999-5" color="currentColor" /></svg>,
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
                    style={{
                      textDecoration: "none", display: 'flex', justifyContent: 'center',
                      flexDirection: 'column', alignItems: 'center', marginBottom: '14px'
                    }} >
                    <Box
                      sx={{
                        borderRadius: "12px",
                        padding: "16px",
                        width: { xs: "80%" },
                        height: "90px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: [
                          "#445E93",
                          "#FF9D23",
                          "#6256CA",
                          "crimson",
                          "#089451",
                          "#E73879",
                          "#ff914d",
                          "#3d8cf2"
                        ][idx % 8],  // Cycle through the colors in the array
                        transition: "all 0.3s ease",
                        '&:hover': {
                          transform: "scale(1.05)",
                        },
                      }}
                    >

                      <Box sx={{ color: "white", fontSize: "40px" }}> {/* Adjust fontSize to increase icon size */}
                        {React.cloneElement(item.icon, { sx: { color: "white", fontSize: "40px" } })}
                      </Box>

                    </Box>

                    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}>
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
