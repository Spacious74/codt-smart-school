import React, { useState , useEffect} from "react"
import { Button, Grid, Typography, Paper,TextField,Box  , Card, CardContent,  Divider ,  RadioGroup,
  formControlClasses,
  formControlLabelClasses,
  FormControlLabel,
  Radio,} from "@mui/material" // Import Paper
import { Link, useNavigate } from "react-router-dom" // Import Link
import Add from "@mui/icons-material/Add" // Import Add icon
import Training from "./Training"

const Admintraining = () => {
  const navigate=useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("adminId"); // Use localStorage instead of sessionStorage
    if (!admin) {
        navigate('/auth/adminlogin');
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    trainerName: "",
    trainerDescription: "",
    body: "",
    posterId: "",
    notification_for:"student"
    
});
const [programs, setPrograms] = useState([]);
const [editId, setEditId] = useState(null);
const[isvisilbe , setIsvisible]=useState(false)

useEffect(() => {
    fetchPrograms();
}, []);

const fetchPrograms = async () => {
    const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/trainingProgram.php");
    const data = await response.json();
    setPrograms(data);
};

const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId
        ? `https://codtsmartschool.strangeweb.in/studentapi/trainingProgram.php?id=${editId}`
        : "https://codtsmartschool.strangeweb.in/studentapi/trainingProgram.php";

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...formData,
            id: editId,
        }),
    });

    if (response.ok) {
      setIsvisible(false)
        fetchPrograms();
        resetForm();
    } else {
        console.error("Error during the request", response);
    }
};

const handleEdit = (program) => {
    setFormData({
        title: program.title,
        shortDescription: program.short_description,
        trainerName: program.trainer_name,
        trainerDescription: program.trainer_description,
        body: program.body,
        posterId: program.poster_id,
        notification_for:program.notification_for
         // Populate posterId
    });
    setEditId(program.id);
};

const handleDelete = async (id) => {
    const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/trainingProgram.php", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ id: id }),
    });

    if (response.ok) {
        fetchPrograms();
    } else {
        const errorMessage = await response.json();
        console.error("Error deleting program:", errorMessage);
    }
};

const resetForm = () => {
    setFormData({
        title: "",
        shortDescription: "",
        trainerName: "",
        trainerDescription: "",
        body: "",
        posterId: "",
        notification_for:""
        // Reset posterId
    });
    setEditId(null);
};
const [isVisible, setIsVisible] = useState({}); // Track visibility for each program

const toggleVisibility = (id) => {
  setIsVisible((prev) => ({
    ...prev,
    [id]: !prev[id], // Toggle visibility for the clicked program
  }));
};
console.log("programs " , programs)
  return (
    <div>
      {isvisilbe? <Box
      component="form"
      
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        maxWidth: 1200,
        margin: "0 auto",
        backgroundColor: "#ffff",
        borderRadius: "10px",
        boxShadow: 2 // Adjust this value for different shadow intensities
      }}
    >
      <Typography variant="h6" color="#6B50FF">
        Training Program
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Short Description"
        variant="outlined"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleInputChange}
        multiline
        minRows={2}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Trainer Name"
        variant="outlined"
        name="trainerName"
        value={formData.trainerName}
        onChange={handleInputChange}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Trainer Description"
        variant="outlined"
        name="trainerDescription"
        value={formData.trainerDescription}
        onChange={handleInputChange}
        multiline
        minRows={2}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Body"
        variant="outlined"
        name="body"
        value={formData.body}
        onChange={handleInputChange}
        multiline
        minRows={3}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />
   <TextField label="Poster ID" variant="outlined" name="posterId" value={formData.posterId} onChange={handleInputChange} fullWidth /> {/* New field for posterId */}
   <Typography variant="body1">Target Audience:</Typography>
        <RadioGroup value={formData.notification_for} onChange={(e) => setFormData({ ...formData, notification_for: e.target.value })} row>
          <FormControlLabel value="students" control={<Radio color="primary" />} label="Students" />
          <FormControlLabel value="teachers" control={<Radio color="primary" />} label="Teachers" />
          <FormControlLabel value="school" control={<Radio color="primary" />} label="School" />
        </RadioGroup>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#6B50FF",
          color: "#FFF",
          alignSelf: "flex-end",
          ":hover": {
            backgroundColor: "#5638D6"
          }
        }}
      >
         {editId ? "UPDATE" : "POST"}
      </Button>
    </Box>:null}
      <Typography variant="h6" mt={2} mb={4} sx={{ color: "#503dff" }}>
        Training Program
      </Typography>
      {isvisilbe?null:<Grid container spacing={2} justifyContent="start" mb={4}>
        <Grid item>
          <Button
           onClick={()=>{
            setIsvisible(true)
           }}
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "#503dff", // Use the specified blue color for text
              boxShadow: 2,
              borderRadius: 2,
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              fontWeight: "bold", // Increased font weight
              fontSize: "16px" // Increased font size
            }}
          >
            <Add sx={{ marginRight: 1, fontSize: "34px" }} />
            <Typography variant="body1">Add New Training Program</Typography>
          </Button>
        </Grid>
      </Grid>}

      {/* <Grid
        container
        spacing={3}
        sx={{ marginBottom: "2rem", paddingBottom: "1rem" }}
      >
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: "50px 20px",
              margin: "10px 0",
              backgroundColor: "#e9e1e12b"
            }}
          >
            <Typography variant="h4" align="center" sx={{ color: "#503dff" }}>
              50
            </Typography>
            <Typography align="center" sx={{ color: "#503dff" }}>
              Training Programs Executed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: "50px 20px",
              margin: "10px 0",
              backgroundColor: "#e9e1e12b"
            }}
          >
            <Typography variant="h4" align="center" sx={{ color: "#503dff" }}>
              10
            </Typography>
            <Typography align="center" sx={{ color: "#503dff" }}>
              Training Programs Lined Up
            </Typography>
          </Paper>
        </Grid>
      </Grid> */}
      {/* <Typography variant="h5" mt={2} color="#4d4d4d">
        LATEST TRAINING PROGRAMS
      </Typography> */}
      {/* <Box mt={3}>
      <Typography variant="h5" gutterBottom>Training Programs</Typography>
      {programs.map((program) => (
       <Card key={program.id} sx={{ mb: 3, boxShadow: 3, borderRadius: 2, padding: 2 }}>
       <CardContent>
         <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }} gutterBottom>
           {program.title}
         </Typography>
     
         <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
           <strong>Trainer:</strong> {program.trainer_name}
         </Typography>
         
         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
           {program.body}
         </Typography>
       </CardContent>
     
       <Box display="flex" justifyContent="flex-end" sx={{ p: 1 }}>
         <Button
           variant="contained"
           color="primary"
           size="small"
           sx={{ mr: 1 }}
           onClick={() => { 
            setIsvisible(true);
             handleEdit(program);
           }}
         >
           Edit
         </Button>
         <Button
           variant="outlined"
           color="error"
           size="small"
           onClick={() => handleDelete(program.id)}
         >
           Delete
         </Button>
       </Box>
     </Card>
     
      ))}
    </Box> */}
     <Box mt={3}>
      <Typography variant="h5" gutterBottom>Training Programs</Typography>
      {programs.map((program) => (
        <Card key={program.id} sx={{ mb: 3, boxShadow: 3, borderRadius: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }} gutterBottom>
              {program.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {program.short_description.length > 100
                ? `${program.short_description.slice(0, 100)}...`
                : program.short_description}
              <span
                onClick={() => toggleVisibility(program.id)}
                style={{ color: "#503dff", cursor: "pointer" }}
              >
                {program.short_description.length > 100 ? ' See More' : ''}
              </span>
            </Typography>
            
            {/* Show trainer_description if isVisible is true */}
            {isVisible[program.id] && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Trainer Description:</strong> {program.trainer_description}
              </Typography>
            )}

            {/* Posted At */}
            <Typography variant="caption" color="text.secondary" sx={{  }}>
              Posted At: {new Date(program.created_at).toLocaleString()}
            </Typography>
          </CardContent>

          <Box display="flex" justifyContent="flex-end" sx={{ p: 1 }}>
            {/* <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ mr: 1 }}
              onClick={() => { 
                handleEdit(program);
              }}
            >
              Edit
            </Button> */}
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(program.id)}
            >
              Delete
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
    </div>
  )
}

export default Admintraining
