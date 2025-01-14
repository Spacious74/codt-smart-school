import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Rating,
  AvatarGroup,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { FaCertificate, FaSearch } from "react-icons/fa";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import codtlogo from "../../images/codt.png";
import profiless from "../../images/profiles.png";
import profitimage from "../../images/performicom.png";
import Meter from "../../images/meter (2).png";
import Courses from "./Courses.jsx";
import Resorcess from "./Resource.jsx";
import { Link } from "react-router-dom";
import {
  School,
  Person,
  LiveTv,
  AttachMoney,
  Receipt,
  Report,
  Campaign,
  Laptop,
  Search,
  Public,
} from "@mui/icons-material";

const datas = [
  {
    icon: <Person sx={{ fontSize: "48px", color: "blue" }} />,
    label: "Academics",
    route: "/app/academics",
  },

  {
    icon: <LiveTv sx={{ fontSize: "48px", color: "orange" }} />,
    label: "Live Classes",
    route: "/app/home",
  },

  {
    icon: <Receipt sx={{ fontSize: "48px", color: "brown" }} />,
    label: "Pay School Fees",
    route: "/app/pricing",
  },
  {
    icon: <Report sx={{ fontSize: "48px", color: "teal" }} />,
    label: "Report Card",
    route: "/app/academics/exams/examdetail",
  },
  {
    icon: <Campaign sx={{ fontSize: "48px", color: "pink" }} />,
    label: "Notice",
    route: "/app/notice",
  },
  {
    icon: <Laptop sx={{ fontSize: "48px", color: "indigo" }} />,
    label: "Online Courses",
    route: "https://codt.in/",

  },
  {
    icon: <Search sx={{ fontSize: "48px", color: "darkgreen" }} />,
    label: "Career Research",
    route: "/app/career",
  },
  {
    icon: <Public sx={{ fontSize: "48px", color: "gray" }} />,
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
      <Box
        display="flex"
        flexDirection="column"
        sx={{ p: 2, background: "#fafafa" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            {/* Student Profile Section */}
            <CardContent sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                color="textSecondary"
                mb={1}
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
                alignItems="center"
                gap={2}
                justifyContent="flex-start"
                p={2} // Add padding for better spacing
              >
                <Box
                  display={{ xs: "flex", sm: "flex" }} // Always display image as flex
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={`https://codtsmartschool.strangeweb.in/studentapi/${info.data.image}`}
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: "50%", // Make the profile picture circular
                      objectFit: "cover", // Ensure the image covers the box
                      border: "2px solid #503dff", // Add a border around the image
                    }}
                    alt="Profile"
                  />
                </Box>
                <Box textAlign={{ xs: "center", sm: "left" }}>
                  {" "}
                  {/* Center text on mobile */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: "black",
                      fontSize: { xs: "18px", sm: "20px" }, // Responsive font size
                      fontWeight: "600",
                    }}
                  >
                    {info.data.first_name} {info.data.lastName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="black"
                    fontWeight="600"
                  >
                    Class{" "}
                    <span style={{ color: "blue" }}>
                      {info.data.grade || "Loading..."}
                    </span>{" "}
                    - Division{" "}
                    <span style={{ color: "blue" }}>
                      {info.data.division || "Loading..."}
                    </span>{" "}
                    - Roll Number{" "}
                    <span style={{ color: "blue" }}>
                      {info.data.rolenum || "Loading..."}
                    </span>
                  </Typography>
                  <Link to="/app/editstud">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 2,
                        fontSize: "12px",
                        backgroundColor: "#503dff",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(80, 61, 255, 0.8)",
                        },
                        padding: "8px 16px", // Adjust padding for button
                        borderRadius: "5px", // Rounded corners for button
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Link>
                </Box>
              </Box>
            </CardContent>

            <Grid container spacing={2} mt={4} ml={2} mb={5}>
  {datas.map((item, idx) => (
    <Grid item xs={6} sm={4} md={3} lg={2.5} key={idx}>
      <Link to={item.route}>
        <Box
          sx={{

            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
            width: { xs: "80%" },
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: [
              "#089451", // Green
              "#503dff", // Blue
              "#a80000", // Red
              "#eb6a18", // Orange
              "#3d8cf2", // Light Blue
              "#eb6a18", // Orange (repeat)
              "#3d8cf2", // Light Blue (repeat)
              "#ee1527"  // Red
            ][idx % 8],  // Cycle through the colors in the array
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },

          }}
        >


          <Box sx={{ color: "white", fontSize: "40px" }}> {/* Adjust fontSize to increase icon size */}
            {React.cloneElement(item.icon, { sx: { color: "white", fontSize: "40px" } })}
          </Box>
          
        </Box>

        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
          {item.label}
        </Typography>

      </Link>
    </Grid>
  ))}
</Grid>

            <CardContent sx={{ mb: 2, p: 2 }}>
              <Resorcess />
            </CardContent>
          </Grid>

          <Grid item xs={12} sm={4} backgroundColor="white">
            {/* Review Section */}
            <CardContent sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ color: "black", fontSize: "18px", fontWeight: "600" }}
              >
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

            <CardContent sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ color: "black", fontSize: "18px", fontWeight: "600" }}
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
                        borderColor: "black",
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

            {/* See All section */}
            <CardContent sx={{ mb: 6 }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
                sx={{ mt: 1 }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "black", fontSize: "18px", fontWeight: "600" }}
                >
                  See how your classmates are performing{" "}
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
