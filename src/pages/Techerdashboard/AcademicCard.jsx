import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Grid, Paper, Card, CardContent, Tabs, Tab } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);
import { School, Person, LiveTv, AttachMoney, Receipt, Report, Campaign, Laptop, Search, Public,
  Assignment, Book
} from "@mui/icons-material";


const data = [
  {
    icon: <Assignment sx={{ fontSize: "48px", color: "white" }} />, // Changed icon to Assignment
    label: "Exams",
    route: "/school/academicschool/exam",
  },
  {
    icon: <LiveTv sx={{ fontSize: "48px", color: "white" }} />, // Kept LiveTv icon for live-related feature
    label: "Assignments",
    route: "/school/academicschool/assignment",
  },
  {
    icon: <Book sx={{ fontSize: "48px", color: "white" }} />, // Changed icon to Book for syllabus
    label: "Syllabus",
    route: "/school/academicschool/syllabus",
  },
];


const Teacheracademics = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const performanceData = {
    datasets: [
      {
        data: [25, 50, 100],
        backgroundColor: ['#f3f4f6', '#503dff', '#cbd5e1'],
        borderWidth: 0,
      },
    ],
  };

  const attendanceData = {
    datasets: [
      {
        data: [73, 27],
        backgroundColor: ['#41b8d5', '#6ce5e8'],
        cutout: '70%',
      },
    ],
  };
 

  return (
    <>
     <Grid container spacing={2} mt={4} ml={2} mb={5} display="flex">
                {data.map((item, idx) => {
                  const backgroundColors = ["#eb6a18", "#3d8cf2", "#a80000"];
                  const backgroundColor = backgroundColors[idx % backgroundColors.length];
                  return(
                  <Grid item xs={4} sm={2.5} md={3} lg={1.5} key={idx} > 
                    <Link to={item.route}>
                      <Box
                        sx={{
                          borderRadius: "8px",
                          textAlign: "center",
                          width: "100%",
                          height: "100px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: backgroundColor,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                        {item.label}
                      </Typography>
                    </Link>
                  </Grid>
                )})}
      

       </Grid>
             

    </>
  )
};

export default Teacheracademics;
