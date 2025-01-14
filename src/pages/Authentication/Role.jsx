import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { FaUserGraduate, FaChalkboardTeacher, FaSchool } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; 
import signupimg from '../../images/signupimg.png';

const SelectRole = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Define the roles array
  const roles = [
    {
      label: "Student",
      icon: <FaUserGraduate size={40} color="white" />,
      route: "/auth/signup", // Route for Student
    },
    {
      label: "Teacher",
      icon: <FaChalkboardTeacher size={40} color="white" />,
      route: "/auth/techsubject", // Route for Teacher
    },
    {
      label: "School",
      icon: <FaSchool size={40} color="white" />,
      route: "/auth/school", // Route for School
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center justify-center min-h-screen">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img
                className="hidden dark:block"
                src="../../src/assets/logo.png"
                alt="Logo"
                style={{ width: "200px" }}
              />
              <img
                className="dark:hidden"
                src="../../src/assets/logo.png"
                alt="Logo"
                style={{ width: "200px" }}
              />
            </Link>

            <p className="text-lg 2xl:px-20">
              We create Smart Schools with our Technology
            </p>

            <img
              src={signupimg}
              alt="Signup"
              className="mt-4 mx-auto" // Center image on mobile
              style={{ height: "300px", width: "300px" }}
            />
          </div>
        </div>

        <div className="w-full xl:w-1/2 xl:px-24 xl:py-16 flex justify-center items-center">
          <Grid container spacing={4} maxWidth={800} justifyContent="center">
            {roles.map((role) => (
              <Grid item xs={12} sm={12} key={role.label}>
                <Card
                  onClick={() => navigate(role.route)} // Navigate on click
                  sx={{
                    backgroundColor: "#503dff",
                    color: "white",
                    borderRadius: "20px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    padding: "10px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      gap: '40px',
                      alignItems: "center", 
                      justifyContent: "center",
                    }}
                  >
                    {role.icon}
                    <Typography
                      variant="h6"
                      component="div"
                      style={{ marginTop: "15px" }}
                    >
                      {role.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
