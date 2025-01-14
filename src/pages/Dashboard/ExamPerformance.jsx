import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
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
import Schoollogo from "../../images/School.png";

const data = [
  {
    icon: <Person sx={{ fontSize: "48px", color: "blue" }} />,
    label: "Upcoming Exams",
    route: "app/academics/exams/examdetail",
  },
  {
    icon: <School sx={{ fontSize: "48px", color: "green" }} />,
    label: "Exam Results",
    route: "/school/Techerdata",
  },
  {
    icon: <LiveTv sx={{ fontSize: "48px", color: "orange" }} />,
    label: "Generate Report Card",
    route: "/school/studentsdata",
  },
  
];

const ExamPerformance = () => {
  

  return (
    <Box p={1} >
      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} md={7} lg={8}>
          <Box sx={{ padding: 1, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" color="primary">
                Exam Performance
              </Typography>
             
              {/* Action Buttons */}
              <Grid container spacing={2} mt={2}>
                {data.map((item, idx) => (
                  <Grid item xs={6} sm={4} md={3} lg={2.5} key={idx}>
                    <Link to={item.route}>
                      <Box
                        sx={{
                          border: "2px solid #503dff",
                          borderRadius: "8px",
                          padding: "16px",
                          textAlign: "center",
                          width: "100%",
                          height: "120px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                        {item.label}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Box>
        </Grid>

        {/* Right Section */}
        
      </Grid>
    </Box>
  );
};

export default ExamPerformance;

