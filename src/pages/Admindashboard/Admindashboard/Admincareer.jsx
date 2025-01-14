import React , {useState , useEffect} from "react"
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  RadioGroup,
  formControlClasses,
  formControlLabelClasses,
  FormControlLabel,
  Radio,
 
 
  TextField,
  
 
  IconButton,
} from "@mui/material"
import {  PhotoCamera , Remove, Edit} from "@mui/icons-material";
import { Add } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";


const CareerCard = ({ title, tags, image }) => {
  
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Stacks vertically on phones, horizontally on larger screens
        alignItems: "center",
        p: 2,
        borderRadius: 2,
        mb: 2,
        boxShadow: 2,
      }}
    >
      <Avatar
        variant="square"
        src={image}
        alt={title}
        sx={{
          width: { xs: 80, sm: 120 }, // Smaller avatar on phones
          height: { xs: 80, sm: 120 },
          borderRadius: 1,
          mb: { xs: 2, sm: 0 }, // Adds margin below the image on phones
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          textAlign: { xs: "center", sm: "left" }, // Centers text on phones, left-align on larger screens
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        <Typography variant="h6" sx={{ color: "text.primary", fontWeight: "bold" }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" }, mt: 1 }}>
          {tags.map((tag, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: "gray.200",
                color: "gray.600",
                fontSize: "0.75rem",
                fontWeight: "medium",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                mr: 1,
                mb: 1,
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: { xs: "center", sm: "flex-end" }, // Centers button on phones, right-align on larger screens
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#503dff",
            color: "white",
            borderRadius: 1,
            width: { xs: "80%", sm: "auto" }, // Full-width button on phones, auto-width on larger screens
          }}
        >
          Know More
        </Button>
      </CardActions>
    </Card>
  );
};

const Admincareer = () => {
  
  const categorie = [
    "Medical",
    "Science",
    "Design",
    "Photography",
    "Business",
    "Art",
    "Stock Market",
    "Construction"
  ]

  const navigate=useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("adminId"); // Use localStorage instead of sessionStorage
    if (!admin) {
        navigate('/auth/adminlogin');
    }
  }, [navigate]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState(['', '', '']);
  const [thumbnail, setThumbnail] = useState(null);
  const [body, setBody] = useState('');
  const [careers, setCareers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentCareerId, setCurrentCareerId] = useState(null);
  const [notification_for, setNotificationFor] = useState("student");

  // Fetch careers when component mounts
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/careerform.php');
        const data = await response.json();
        if (data.success) {
          setCareers(data.careers);
        } else {
          console.error("Error fetching careers:", data.message);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchCareers();
  }, []);
  


  const handleEditCareer = (career) => {
    setEditMode(true);
    setCurrentCareerId(career.id);
    setTitle(career.title);
    setDescription(career.description);
    setCategories(career.categories.split(','));
    setBody(career.body);
    setThumbnail(career.thumbnail);
    setNotificationFor(career.notification_for) // Note: You'll need to handle the thumbnail separately
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for empty required fields (Frontend Validation)
    if (!title || !description || !body || categories.some(category => category.trim() === '')) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categories", JSON.stringify(categories)); // Categories as JSON string
    formData.append("body", body);
    formData.append("notification_for" , notification_for)

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    // Include the career ID in the request if we're editing
    if (editMode && currentCareerId) {
      formData.append("id", currentCareerId); // Include the ID of the career we're editing
    }

    const method = editMode ? "POST" : "POST"; // Both POST for create and edit
    const url = `https://codtsmartschool.strangeweb.in/studentapi/careerform.php`;

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setIsvisible(false)
        alert(editMode ? 'Career updated successfully!' : 'Career added successfully!');
        
        // Reset form fields after success
        setTitle('');
        setDescription('');
        setCategories(['', '', '']);
        setThumbnail(null);
        setBody('');

        // Reset edit mode
        setEditMode(false);
        setCurrentCareerId(null);
        setNotificationFor("")

        // Refresh careers list
        const fetchCareers = async () => {
          const response = await fetch('https://codtsmartschool.strangeweb.in/studentapi/careerform.php');
          const data = await response.json();
          if (data.success) {
            setCareers(data.careers);
          }
        };

        fetchCareers(); // Re-fetch careers after adding or updating a career
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Failed to submit form');
    }
  };


  
  // Handle Delete career
const handleDeleteCareer = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this career?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`https://codtsmartschool.strangeweb.in/studentapi/careerform.php?id=${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    if (data.success) {
      alert('Career deleted successfully!');
      setCareers(careers.filter(career => career.id !== id)); // Update the careers list
    } else {
      alert('Failed to delete career');
    }
  } catch (error) {
    console.error('Error during delete operation:', error);
    alert('Failed to delete career');
  }
};









const[isvisible , setIsvisible]=useState(false)



console.log(careers)







  return (
    <Box className="p-6">
      <Grid container spacing={2} justifyContent="start" mb={4}>
        <Grid item>
          <Button
           onClick={()=>{setIsvisible(true)}}
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
            <Typography variant="body1">Add New Careers</Typography>
          </Button>
        </Grid>
       
      </Grid>


         {isvisible?<Paper
    component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 4,
        bgcolor: "white",
        maxWidth: 1200,
        mx: "auto",
        borderRadius: 2,
        elevation: 0
      }}
    >
      <Typography variant="h6" sx={{ color: "#503dff", mb: 2 }}>
        Add new Careers
      </Typography>

      <TextField
        label="Title"
        name="title"
        fullWidth
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#503dff" }
          }
        }}
      />

      <TextField
        label="Short description"
        name="short_description"
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Typography variant="body1" sx={{ color: "#503dff", mb: 1 }}>
        Categories
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {categories.map((category, index) => (
          <Grid item xs={4} key={index}>
            <TextField
              fullWidth
              variant="outlined"
              value={category}
              onChange={(e) => {
                const newCategories = [...categories];
                newCategories[index] = e.target.value;
                setCategories(newCategories);
              }}
            />
            {/* <IconButton onClick={() => removeCategory(index)}>
              <Remove sx={{ color: "#ff3d3d" }} />
            </IconButton> */}
            
          </Grid>
        ))}
         <Grid item xs={3}>
         <IconButton onClick={() => setCategories([...categories, ''])}>
              <Add sx={{ color: "#503dff" }} />
            </IconButton>
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ color: "#503dff", mb: 1 }}>
        Add thumbnail
      </Typography>
      <Box
        sx={{
          width: 120,
          height: 120,
          border: "2px dashed #503dff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3
        }}
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
          <PhotoCamera sx={{ fontSize: 50, color: "#503dff" }} />
        </IconButton>
      </Box>

      <TextField
        label="Body"
        name="body"
        fullWidth
        multiline
        rows={5}
        variant="outlined"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#503dff" }
          }
        }}
      />
      <Typography variant="body1">Target Audience:</Typography>
        <RadioGroup value={notification_for} onChange={(e) => setNotificationFor(e.target.value)} row>
          <FormControlLabel value="students" control={<Radio color="primary" />} label="Students" />
          <FormControlLabel value="teachers" control={<Radio color="primary" />} label="Teachers" />
          <FormControlLabel value="school" control={<Radio color="primary" />} label="School" />
        </RadioGroup>

<Button type="submit" variant="contained" sx={{ bgcolor: "#503dff", color: "white" }}>
          {editMode ? 'Update' : 'Post'}
        </Button>
    </Paper>:null}










      {/* Popular Careers */}
      <Typography
        variant="h6"
        className="font-semibold mb-8"
        style={{ marginBottom: "20px" }}
      >
        Popular careers
      </Typography>
      {/* <Grid container spacing={2}>
        {careers.map((career, index) => (
          <Grid item xs={12} key={index}>
           
          </Grid>
        ))}
      </Grid> */}
      <List sx={{ mt: 2 }}>
  {careers.map((career, index) => (
    <ListItem
      key={index}
      button
      onClick={() => handleEditCareer(career)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack items on smaller screens
        gap: { xs: 1, sm: 2 }, // Adjust gap based on screen size
        borderBottom: '1px solid #e0e0e0', // Optional border for separation
        paddingY: 2,
      }}
    >
      <ListItemAvatar>
        {career.thumbnail && (
          <Avatar
            alt={career.title}
            src={`https://codtsmartschool.strangeweb.in/studentapi/${career.thumbnail}`}
            sx={{ width: 56, height: 56, marginRight: { xs: 0, sm: 2 } }}
          />
        )}
      </ListItemAvatar>
      
      <ListItemText
        primaryTypographyProps={{
          fontWeight: 'bold', // Make title bold
          fontSize: { xs: '1rem', sm: '1.1rem' },
        }}
        primary={career.title}
        secondary={`Description: ${career.description}`}
        sx={{
          flex: 1,
          textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens
          marginRight: { xs: 0, sm: 2 },
        }}
      />
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          marginTop: { xs: 1, sm: 0 }, // Add margin between buttons and content on small screens
        }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteCareer(career.id);
          }}
          variant="outlined"
          sx={{
            color: 'red',
            borderColor: 'red',
            textTransform: 'none', // Keep text capitalization as is
            fontSize: '0.85rem',
          }}
        >
          Delete
        </Button>
        
        {/* <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsvisible(true);
            setEditMode(true);
          }}
          variant="outlined"
          sx={{
            color: 'blue',
            borderColor: 'blue',
            textTransform: 'none',
            fontSize: '0.85rem',
          }}
        >
          Edit
        </Button> */}
      </Box>
    </ListItem>
  ))}
</List>


      {/* Top Categories */}
      {/* <Typography
        variant="h6"
        className="font-semibold mt-6 mb-4"
        style={{ marginBottom: "20px" }}
      >
        Top Categories
      </Typography>
      <Box className="flex flex-wrap gap-2">
        {categorie.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            className="text-blueshade border-blueshade rounded-full"
          >
            {category}
          </Button>
        ))}
      </Box> */}
    </Box>
  )
}

export default Admincareer