
import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Grid, Paper, Card, CardContent, Tabs, Tab } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Link } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

import {School, Person, LiveTv, AttachMoney, Receipt, Report, Campaign, Laptop, Search, Public, Assignment, Book} from "@mui/icons-material";

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
    const backgroundColor = backgroundColors[idx % backgroundColors.length]; // Cycles through the colors

    return (
      <Grid item xs={4} sm={2.5} md={3} lg={1.5} key={idx}> 
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
              backgroundColor: backgroundColor, // Apply dynamic background color
            }}
          >
            {item.icon}
          </Box>
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            {item.label}
          </Typography>
        </Link>
      </Grid>
    );
  })}
</Grid>

             

    </>
  )
};

export default Teacheracademics;




































// import React from 'react';
// import { Box, Button, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { FaClipboardList, FaTasks, FaPencilAlt } from 'react-icons/fa'; // Import icons
// import AssignmentForm from './Assignmentschool.jsx';
// import ExamForm from './Postexam.jsx';

// // Quick Action Button Data
// const quickActions = [
//   { title: 'Topic Record', icon: <FaClipboardList /> },
//   { title: 'Post new Assignment', icon: <FaPencilAlt /> },
//   { title: 'Manage Exams', icon: <FaTasks /> }
// ];

// // Manage Section Data
// const manageItems = [
//   { title: 'Assignments' },
//   { title: 'Exams' },
//   { title: 'Syllabus Status' }
// ];

// // Assignments Posted Data
// const assignments = [
//   {
//     subject: 'Science',
//     title: 'assignment 1',
//     dueDate: '24 March 2024',
//     studentsSubmitted: '40 / 100 students submitted'
//   },
//   {
//     subject: 'Science',
//     title: 'environment project',
//     dueDate: '24 March 2024',
//     studentsSubmitted: '40 / 100 students submitted'
//   },
//   {
//     subject: 'Science',
//     title: 'science report',
//     dueDate: '24 March 2024',
//     studentsSubmitted: '40 / 100 students submitted'
//   }
// ];

// const Dashboard = () => {
//   return (
//     <Box p={4}>
//       {/* Quick Actions */}
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Quick Actions
//       </Typography>
//       <Grid 
//       container 
//       spacing={0} // Remove default spacing
//       sx={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }} // Use flex display with custom gap
//     >
//       <Grid item xs={12} sm={6} md={2}>
//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             height: '70px',
//             fontWeight: '600',
//             backgroundColor: 'white',
//             color: '#503dff',
//           }}
//         >
//           Topic Record
//         </Button>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             height: '70px',
//             fontWeight: '600',
//             backgroundColor: 'white',
//             color: '#503dff',
//           }}
//         >
//           Post New Assignment 
//         </Button>
//       </Grid>
//       <Grid item xs={12} sm={6} md={2}>
//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             height: '70px',
//             fontWeight: '600',
//             backgroundColor: 'white',
//             color: '#503dff',
//           }}
//         >
//           Manage Exams
//         </Button>
//       </Grid>
//     </Grid>
  

//       {/* Manage Section */}
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Manage
//       </Typography>
//       <Grid 
//       container 
//       spacing={0} // Remove default spacing
//       sx={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }} // Use flex display with smaller custom gap
//     >
//       {manageItems.map((item, index) => (
//         <Grid item xs={12} sm={6} md={2} key={index}> {/* Adjusted grid sizes for better responsiveness */}
//           <Button
//             variant="outlined"
//             fullWidth
//             sx={{
//               borderRadius: '8px',
//               color: 'black',
//               borderColor: '#6a67ce',
//               height: '60px',
//               fontWeight: 'bold',
//               '&:hover': {
//                 backgroundColor: 'rgba(106, 103, 206, 0.1)'
//               }
//             }}
//           >
//             {item.title}
//           </Button>
//         </Grid>
//       ))}
//     </Grid>

//       {/* Quick View */}
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Quick View
//       </Typography>
//       <Card variant="outlined" sx={{ borderColor: '#6a67ce', marginBottom: '16px' }}>
//       <CardContent>
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Assignments posted by you
//         </Typography>
//         <TableContainer component={Paper} sx={{ boxShadow: 'none', display: { xs: 'none', md: 'block' } }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left">Subject</TableCell>
//                 <TableCell align="left">Assignment</TableCell>
//                 <TableCell align="left">Due Date</TableCell>
//                 <TableCell align="center">Questions</TableCell>
//                 <TableCell align="center">Submissions</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {assignments.map((assignment, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{assignment.subject}</TableCell>
//                   <TableCell>{assignment.title}</TableCell>
//                   <TableCell>{`Last date to submit - ${assignment.dueDate}`}</TableCell>
//                   <TableCell align="center">
//                     <Button variant="text" sx={{ color: '#6a67ce' }}>
//                       Questions
//                     </Button>
//                   </TableCell>
//                   <TableCell align="center">{assignment.studentsSubmitted}</TableCell>
//                   <TableCell align="center">
//                     <Button
//                       variant="contained"
//                       sx={{
//                         backgroundColor: '#6a67ce',
//                         color: '#fff',
//                         borderRadius: '8px',
//                         '&:hover': {
//                           backgroundColor: '#5a57be'
//                         }
//                       }}
//                     >
//                       Edit
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Responsive Card View for Mobile */}
//         <Box display={{ xs: 'block', md: 'none' }}>
//           {assignments.map((assignment, index) => (
//             <Card key={index} variant="outlined" sx={{ marginBottom: '16px', borderColor: '#6a67ce' }}>
//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold">
//                   {assignment.subject}
//                 </Typography>
//                 <Typography variant="body1">{assignment.title}</Typography>
//                 <Typography variant="body2">{`Due Date: ${assignment.dueDate}`}</Typography>
//                 <Typography variant="body2">{`Submissions: ${assignment.studentsSubmitted}`}</Typography>
//                 <Box mt={2}>
//                   <Button variant="text" sx={{ color: '#6a67ce', marginRight: '8px' }}>
//                     Questions
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: '#6a67ce',
//                       color: '#fff',
//                       borderRadius: '8px',
//                       '&:hover': {
//                         backgroundColor: '#5a57be'
//                       }
//                     }}
//                   >
//                     Edit
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       </CardContent>
//       <Box textAlign="center" p={2}>
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: '#6a67ce',
//             color: '#fff',
//             borderRadius: '8px',
//             px: 4,
//             '&:hover': {
//               backgroundColor: '#5a57be'
//             }
//           }}
//         >
//           See All
//         </Button>
//       </Box>
//     </Card>

//       {/* <AssignmentForm />
//       <ExamForm /> */}

//       <Paper elevation={3} style={{ padding: '20px', marginTop: '30px' }}>
//         <Typography variant="h6" fontWeight="bold" gutterBottom style={{ paddingBottom: '20px' }}>
//           Exam Performance
//         </Typography>
//         <Grid container spacing={2}>
//           {[1, 2, 3].map((item, index) => (
//             <Grid
//               container
//               key={index}
//               sx={{
//                 borderBottom: '1px solid black',
//                 padding: { xs: '10px 20px', sm: '10px 40px' },
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 alignItems: 'center',
//                 gap: '15px'
//               }}
//             >
//               <Grid item xs={12} sm={8} textAlign={{ xs: 'center', sm: 'left' }}>
//                 <Typography>Unit {item} Test Series</Typography>
//               </Grid>
//               <Grid item xs={12} sm={1} textAlign={{ xs: 'center', sm: 'left' }} mt={{ xs: 0, sm: 0 }}>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     backgroundColor: '#503dff',
//                     color: 'white',
//                     width: { xs: '100%', sm: 'auto' },
//                     textTransform: 'none',
//                   }}
//                 >
//                   Edit
//                 </Button>
//               </Grid>
//             </Grid>
//           ))}
//         </Grid>

//         {/* See More Button */}
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#503dff',
//               color: 'white',
//               width: { xs: '100%', sm: 'auto' },
//               textTransform: 'none',
//             }}
//           >
//             See More
//           </Button>
//         </div>
//       </Paper>
//     </Box>
//   );
// };

// export default Dashboard;













// // import React from 'react';
// // import { Box, Button, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// // import { FaClipboardList, FaTasks, FaPencilAlt } from 'react-icons/fa'; // Import icons
// // import AssignmentForm from './Assignmentschool.tsx';
// // import ExamForm from './Postexam.tsx';

// // // Quick Action Button Data
// // const quickActions = [
// //   { title: 'Topic Record', icon: <FaClipboardList /> },
// //   { title: 'Post new Assignment', icon: <FaPencilAlt /> },
// //   { title: 'Manage Exams', icon: <FaTasks /> }
// // ];

// // // Manage Section Data
// // const manageItems = [
// //   { title: 'Assignments' },
// //   { title: 'Exams' },
// //   { title: 'Syllabus Status' }
// // ];

// // // Assignments Posted Data
// // const assignments = [
// //   {
// //     subject: 'Science',
// //     title: 'assignment 1',
// //     dueDate: '24 March 2024',
// //     studentsSubmitted: '40 / 100 students submitted'
// //   },
// //   {
// //     subject: 'Science',
// //     title: 'environment project',
// //     dueDate: '24 March 2024',
// //     studentsSubmitted: '40 / 100 students submitted'
// //   },
// //   {
// //     subject: 'Science',
// //     title: 'science report',
// //     dueDate: '24 March 2024',
// //     studentsSubmitted: '40 / 100 students submitted'
// //   }
// // ];

// // const Dashboard: React.FC = () => {
// //   return (
// //     <Box p={4}>
// //       {/* Quick Actions */}
// //       <Typography variant="h6" fontWeight="bold" mb={2}>
// //         Quick Actions
// //       </Typography>
// //       <Grid 
// //     container 
// //     spacing={0} // Remove default spacing
// //     sx={{ display: 'flex', gap: '15px', marginBottom:'20px' }} // Use flex display with custom gap
// //   >
// //     <Grid item xs={12} sm={2} md={1.7}>
// //       <Button
// //         fullWidth
// //         variant="contained"
// //         sx={{
// //           height:'70px',
// //           fontWeight: '600',
// //           width: '150px',
// //           backgroundColor: 'white',
// //           color: '#503dff',
// //         }}
// //       >
// //         Topic Record
// //       </Button>
// //     </Grid>
// //     <Grid item xs={12} sm={2} md={1.7}>
// //       <Button
// //         fullWidth
// //         variant="contained"
// //         sx={{
// //           height:'70px',
// //           fontWeight: '600',
// //           width: '280px',
// //           backgroundColor: 'white',
// //           color: '#503dff',
// //         }}
// //       >
// //        Post new Assignment 
// //       </Button>
// //     </Grid>
// //       <Grid item xs={12} sm={2} md={1.7}>
// //       <Button
// //         fullWidth
// //         variant="contained"
// //         sx={{
// //           height:'70px',
// //           fontWeight: '600',
// //           width: '150px',
// //           backgroundColor: 'white',
// //           color: '#503dff',
// //           marginLeft:'8rem'
// //         }}
// //       >
// //      Manage Exams
// //       </Button>
// //     </Grid>
   
// //   </Grid>
     

// //       {/* Manage Section */}
// //       <Typography variant="h6" fontWeight="bold" mb={2}>
// //         Manage
// //       </Typography>
// //       <Grid 
// //   container 
// //   spacing={0} // Remove default spacing
// //   sx={{ display: 'flex', gap: '12px', marginBottom: '20px' }} // Use flex display with smaller custom gap
// // >
// //   {manageItems.map((item, index) => (
// //         <Grid item xs={12} sm={2} md={2.2} key={index}>
// //       <Button
// //         variant="outlined"
// //         fullWidth
// //         sx={{
// //           borderRadius: '8px',
// //           color: 'black',
// //           borderColor: '#6a67ce',
// //           height: '60px',
// //           width: '200px',
// //           fontWeight: 'bold',
// //           '&:hover': {
// //             backgroundColor: 'rgba(106, 103, 206, 0.1)'
// //           }
// //         }}
// //       >
// //         {item.title}
// //       </Button>
// //     </Grid>
// //   ))}
// // </Grid>

// //       {/* Quick View */}
// //       <Typography variant="h6" fontWeight="bold" mb={2}>
// //         Quick View
// //       </Typography>
// //       <Card variant="outlined" sx={{ borderColor: '#6a67ce'}}>
// //         <CardContent>
// //           <Typography variant="h6" fontWeight="bold" mb={2}>
// //             Assignments posted by you
// //           </Typography>
// //           <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
// //             <Table>
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell align="left">Subject</TableCell>
// //                   <TableCell align="left">Assignment</TableCell>
// //                   <TableCell align="left">Due Date</TableCell>
// //                   <TableCell align="center">Questions</TableCell>
// //                   <TableCell align="center">Submissions</TableCell>
// //                   <TableCell align="center">Actions</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {assignments.map((assignment, index) => (
// //                   <TableRow key={index}>
// //                     <TableCell>{assignment.subject}</TableCell>
// //                     <TableCell>{assignment.title}</TableCell>
// //                     <TableCell>{`Last date to submit - ${assignment.dueDate}`}</TableCell>
// //                     <TableCell align="center">
// //                       <Button variant="text" sx={{ color: '#6a67ce' }}>
// //                         Questions
// //                       </Button>
// //                     </TableCell>
// //                     <TableCell align="center">{assignment.studentsSubmitted}</TableCell>
// //                     <TableCell align="center">
// //                       <Button
// //                         variant="contained"
// //                         sx={{
// //                           backgroundColor: '#6a67ce',
// //                           color: '#fff',
// //                           borderRadius: '8px',
// //                           '&:hover': {
// //                             backgroundColor: '#5a57be'
// //                           }
// //                         }}
// //                       >
// //                         Edit
// //                       </Button>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </CardContent>
// //         <Box textAlign="center" p={2}>
// //           <Button
// //             variant="contained"
// //             sx={{
// //               backgroundColor: '#6a67ce',
// //               color: '#fff',
// //               borderRadius: '8px',
// //               px: 4,
// //               '&:hover': {
// //                 backgroundColor: '#5a57be'
// //               }
// //             }}
// //           >
// //             See All
// //           </Button>
// //         </Box>
// //       </Card>

// //       {/* <AssignmentForm/>
// //       <ExamForm/> */}

// //       <Paper elevation={3} style={{ padding: '20px', marginTop: '30px' }}>
// //       <Typography variant="h6" fontWeight="bold" gutterBottom style={{ paddingBottom: '20px' }}>
// //         Exam Performance
// //       </Typography>
// //       <Grid container spacing={2}>
// //         {/* Performance Rows */}
// //         {[1, 2, 3].map((item, index) => (
// //           <Grid
// //             container
// //             key={index}
// //             sx={{
// //               borderBottom: '1px solid black',
// //               padding: { xs: '10px 20px', sm: '10px 40px' }, // Adjusting padding for mobile
// //               flexDirection: { xs: 'column', sm: 'row' }, // Stack items vertically on mobile
// //               alignItems: 'center', // Align items in the center on mobile
// //               gap:'15px'
// //             }}
// //           >
// //             <Grid item xs={12} sm={8} textAlign={{ xs: 'center', sm: 'left' }}>
// //               <Typography>Unit {item} Test Series</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={1} textAlign={{ xs: 'center', sm: 'left' }} mt={{ xs: 0, sm: 0 }}>
// //             <Button
// //           variant="contained"
// //           sx={{
// //             backgroundColor: '#503dff',
// //             color: 'white',
// //             width: { xs: '100%', sm: 'auto' }, // Full-width button on mobile
// //             textTransform: 'none',
// //           }}
// //         >
// //          Edit
// //         </Button>
// //             </Grid>
            
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* See More Button */}
// //       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
// //         <Button
// //           variant="contained"
// //           sx={{
// //             backgroundColor: '#503dff',
// //             color: 'white',
// //             width: { xs: '100%', sm: 'auto' }, // Full-width button on mobile
// //             textTransform: 'none',
// //           }}
// //         >
// //           See More
// //         </Button>
// //       </div>
// //     </Paper>
// //     </Box>
// //   );
// // };

// // export default Dashboard;
// // 