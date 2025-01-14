import React, { useState , useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
// import {startIcon} from '@mui/icons-material'
import { fetchData } from '../../../src/Service/apiService'; // Adjust the path as necessary

const AdminschoolDetails = () => {
  const navigate=useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("adminId"); // Use localStorage instead of sessionStorage
        if (!admin) {
            navigate('/auth/adminlogin');
        }
  }, [navigate]);
  const location = useLocation();
  const { SchoolData } = location.state || {};
  const [notices, setNotices] = useState([]);
  const[error , fetchError]=useState("")
  console.log("schoil", SchoolData);
  const fetchNoticesAsync = async () => {
    // Modify the query to filter by school_code
    const query = `SELECT * FROM notices WHERE school_code = '${"GA99"||SchoolData.schoolcode}' `; 

    const { data: fetchedNotices, error: fetchError } = await fetchData(query); // Fetch data with the schoolCode filter

    if (fetchedNotices) {
        setNotices(fetchedNotices); // Update the state with fetched notices
    } else {
        console.error('Error fetching notices:', fetchError); // Add error handling
    }
};
useEffect(() => {
    

  // Fetch notices based on the current schoolCode
  
      fetchNoticesAsync();
  
}, []); 
console.log("notice" , notices)

  return (
    <div>
      <Card
        sx={{ maxWidth: 800, margin: "20px auto", padding: 2, boxShadow: 3 }}
      >
        <CardContent>
          {/* School Details */}
          <Grid container spacing={2} display={"flex"} flexDirection={"column"} justifyContent="space-between">
            <Grid item sx={{display:"flex" , alignItems:"center" , justifyContent:"flex-start" , gap:"20px"}}>
                
              <Box
                component="img"
                src={`https://codtsmartschool.strangeweb.in/studentapi/uploads/${SchoolData.logo}`} // Replace with school logo URL
                alt="School Logo"
                sx={{
                  width: 50,
                  height: 50,
                  marginRight: 2,
                  borderRadius: "50%",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {SchoolData.school_name || "St. Zeviars International"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {SchoolData.state || "D"}, {SchoolData.city || "D"}
              </Typography>
            </Grid>
            <Grid item display={"flex"} justifyContent={"flex-start"} gap={"20px"} marginLeft={"85px"}>
              <Typography variant="body2" color="black">
                School Code -{" "}
                <span style={{ color: "#1976d2" }}>
                  {SchoolData.schoolcode || "ze06mh"}
                </span>
              </Typography>
              <Typography variant="body2" color="black">
                Status - 
                <span style={{ color: "#2e7d32" }}>
                last active 1 day ago
                </span>
              </Typography>
            </Grid>
            <Box sx={{ marginTop: 2, marginBottom: 2 }} display={"flex"} justifyContent={"flex-start"} gap={"20px"} marginLeft={"100px"}>
            <Typography variant="body1">
              Students -{" "}
              <span style={{color:"#1976d2"}}>{SchoolData.number_of_students || "670"}</span>{" "}
              &nbsp;&nbsp; Teachers -{" "}
              <span style={{color:"#1976d2"}}>{SchoolData.number_of_teachers || "68"}</span>
            </Typography>
          </Box>
          </Grid>

          {/* Stats */}
          

          {/* School Signup Info */}
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              padding: 2,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              School Signup form information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              should display here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              please arrange it as provided
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                startIcon={<i className="fas fa-chalkboard-teacher"></i>}
                fullWidth
              >
                Teachers -{SchoolData.number_of_teachers || "0"}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                startIcon={<i className="fas fa-user-graduate"></i>}
                fullWidth
              >
                Students -{SchoolData.number_of_students || "0"}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                startIcon={<i className="fas fa-bell"></i>}
                fullWidth
              >
                Post Notice -{notices.length}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<i className="fas fa-plus"></i>}
                fullWidth
              >
                Update Syllabus
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminschoolDetails;
