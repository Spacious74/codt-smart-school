import React ,{useState , useEffect} from 'react';
import { Grid, Paper, Typography, Button,Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { fetchData } from "../../../src/Service/apiService"
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


const Dashboard = () => {

  const [data, setData] = useState({
  student:"",
  teacher:"",
  school:"",
  career:"",
  traning:""
  }
  );
 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {
    const admin = localStorage.getItem("adminId"); // Use localStorage instead of sessionStorage
        if (!admin) {
            navigate('/auth/adminlogin');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            const { data: fetchedData, error: fetchError } = await fetchData('SELECT * FROM teachers'); // Adjust SQL query as needed
            const { data: studentfetchedData, error: studentfetchError } = await fetchData('SELECT * FROM students'); // Adjust SQL query as needed
            const { data: schoolfetchedData, error: schoolfetchError } = await fetchData('SELECT * FROM schools'); // Adjust SQL query as needed
            // const { data: traningfetchedData, error: traningfetchError } = await fetchData('SELECT * FROM training_programs'); // Adjust SQL query as needed
            const { data: careerfetchedData, error: careerfetchError } = await fetchData('SELECT * FROM careers'); // Adjust SQL query as needed
            const { data: training_programsData, error: training_programsError } = await fetchData('SELECT * FROM training_programs'); // Adjust SQL query as needed
           
           
            if (fetchedData && studentfetchedData && schoolfetchedData) {
                setData({...data , teacher: fetchData.length , student:studentfetchedData.length , school:schoolfetchedData.length , career:careerfetchedData.length , traning:training_programsData.length});
            } else {
                setError(fetchError);
            }
            setLoading(false);
        };

        fetchDataAsync(); 
    }, []);
     if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
     <ClipLoader color="#000000" size={50} />
   </div>;
    if (error) return <div>Error: {error}</div>;




  console.log("data is ", data)







  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
    {/* First Row: Schools, Students, Teachers */}
    <Grid
      container
      spacing={3}
      sx={{
        borderBottom: '4px solid rgba(200, 200, 200, 0.5)',
        marginBottom: '2rem',
        paddingBottom: '1rem',
      }}
    >
      <Grid item xs={12} md={4}>
        <Typography variant="h6" color="#503dff" align="left">
          Schools
        </Typography>
        <Paper sx={{ padding: '50px 20px', margin: '10px 0', backgroundColor: '#e9e1e12b' }}>
          <Typography variant="h4">{data?.school}</Typography>
          <Typography>Total schools enrolled</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" color="#503dff" align="left">
          Students
        </Typography>
        <Paper sx={{ padding: '50px 20px', margin: '10px 0', backgroundColor: '#e9e1e12b' }}>
          <Typography variant="h4">{data?.student}</Typography>
          <Typography>Total Students</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" color="#503dff" align="left">
          Teachers
        </Typography>
        <Paper sx={{ padding: '50px 20px', margin: '10px 0', backgroundColor: '#e9e1e12b' }}>
          <Typography variant="h4">{data?.teacher}</Typography>
          <Typography>Total Teachers</Typography>
        </Paper>
      </Grid>
    </Grid>
  
    {/* Action Buttons */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: { xs: '20px', sm: '50px' }, // Reduced gap on phones, larger on bigger screens
        marginTop: '20px',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on phones
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PersonIcon />}
        sx={{
          width: { xs: '100%', sm: '300px' }, // Full width on phones, fixed width on larger screens
          mb: { xs: '10px', sm: 0 }, // Add margin below each button on phones
        }}
      >
        Post Training Workshop
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PersonIcon />}
        sx={{
          width: { xs: '100%', sm: '300px' },
          mb: { xs: '10px', sm: 0 },
        }}
      >
        Post Notice
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PersonIcon />}
        sx={{
          width: { xs: '100%', sm: '300px' },
          mb: { xs: '10px', sm: 0 },
        }}
      >
        Create Teams
      </Button>
    </Box>
  
    {/* Second Row: Career Research, Education Abroad, Training Programs */}
    <Grid container spacing={3} style={{ marginTop: '20px' }}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" color="#503dff" align="left">Career Research</Typography>
        <Paper sx={{ padding: '20px', margin: '10px 0', backgroundColor: '#e9e1e12b' }}>
          <Typography variant="h4">{data.career}</Typography>
          <Typography>Total students who used Career Research till date</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" color="#503dff" align="left">Education Abroad</Typography>
        <Paper sx={{ padding: '20px', margin: '10px 0', backgroundColor: '#e9e1e12b' }}>
          <Typography variant="h4">10,000</Typography>
          <Typography>Total students who requested for abroad service</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" color="#503dff" align="left">Training Programs</Typography>
        <Paper sx={{ padding: '20px', margin: '10px 0', backgroundColor: '#e9e1e12b' }}>
          <Typography variant="h4">50</Typography>
          <Typography>Total Teacher Training programs taken by CODT</Typography>
        </Paper>
      </Grid>
    </Grid>
  
    {/* Third Row: Trainers */}
    <Grid container spacing={3} style={{ marginTop: '20px' }}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" color="#503dff" align="left">Trainers Associated</Typography>
        <Paper sx={{ padding: '50px 20px', margin: '10px 0', backgroundColor: '#e9e1e12b' }}>
          <Typography variant="h4">50</Typography>
          <Typography color="textSecondary">Total trainers associated with CODT</Typography>
        </Paper>
      </Grid>
    </Grid>
  </div>
  
  
  );
};

export default Dashboard;
