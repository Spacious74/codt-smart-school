import React , {useState} from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Container, Card, CardContent,CardMedia, IconButton,Menu, MenuItem
  
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import FlightIcon from "@mui/icons-material/Flight";
import BusinessIcon from "@mui/icons-material/Business";
import MenuIcon from "@mui/icons-material/Menu";
import img1 from "../../assets/a.png"
import img2 from "../../assets/b.png"
import img2br from "../../assets/br.png"

import img3 from "../../assets/10.jpg"
import img4 from "../../assets/d.png"
import img5 from "../../assets/e.png"
import img6 from "../../assets/f.png"
import img7 from "../../assets/g.png"
import img8 from "../../assets/h.png"
import img9 from "../../assets/i.png"
import img10 from "../../assets/3.jpg"
import img11 from "../../assets/o.png"
import img12 from "../../assets/g1.png"
import img13 from "../../assets/q.png"
import i1 from "../../assets/1.jpg"
import i11 from "../../assets/11.jpg"

import img14 from "../../assets/img1.png"
import img15 from "../../assets/img2.png"
import img16 from "../../assets/img3.png"
import img17 from "../../assets/img4.png"
import img18 from "../../assets/img5.png"
import img19 from "../../assets/img6.png"

import uni1 from "../../assets/4.jpg"
import uni2 from "../../assets/5.jpg"
import uni3 from "../../assets/6.jpg"
import uni4 from "../../assets/7.jpg"
import uni5 from "../../assets/8.jpg"
import uni6 from "../../assets/9.jpg"
const images = [
  uni1,
  uni2,
  uni3,
  uni4,
  uni5,
  uni6
];

import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Facebook, Instagram, YouTube, Twitter, LinkedIn, Start } from '@mui/icons-material';
import CourseCarousel from "./Carousel.jsx"
import  './homepage.css'
const styles = {
  fontFamily: 'Poppins, sans-serif',
  
};


const testimonials = [
    {
      title: "St. Lawrence",
      content:
        "Studying through CODT Education Abroad was a life-changing experience! The program provided exceptional support from start to finish, helping me navigate the application process smoothly.",
      stars: 5, // Use 0 if no stars are required
    },
    {
      title: "St. Lawrence",
      content:
        "Studying through CODT Education Abroad was a life-changing experience! The program provided exceptional support from start to finish, helping me navigate the application process smoothly.",
      stars: 5,
    },
    {
      title: "St. Lawrence",
      content:
        "Studying through CODT Education Abroad was a life-changing experience! The program provided exceptional support from start to finish, helping me navigate the application process smoothly.",
      stars: 0,
    },
  ];
  
  const Testimonials = () => {
    return (
      <Box sx={{ py: 6, px: 4, backgroundColor: "#fafafa" }}>
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          fontWeight="bold"
          mb={4}
        >
          What Schools think about us
        </Typography>
  
        <Grid container spacing={3} justifyContent="center"  className="md:px-[160px] sm:px-[20px]">
        
          {testimonials.map((testimonial, index) => (
            <Grid
              item
              xs={12} // Full width on small screens
              sm={6} // Half width on tablets
              md={4} // One-third width on laptops
              key={index}
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                }}
              >
                <CardContent>
                  <FormatQuoteIcon
                    fontSize="large"
                    sx={{ color: "#6a5af9", mb: 1 }}
                  />
                  <Typography
                    variant="h6"
                    component="h3"
                    fontWeight="bold"
                    mb={1}
                  >
                    {testimonial.title}
                  </Typography>
  
                  {testimonial.stars > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <StarIcon key={i} sx={{ color: "#f7b500", mr: 0.5 }} />
                      ))}
                    </Box>
                  )}
  
                  <Typography variant="body1" color="text.secondary">
                    {testimonial.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  





  const NewsCard = ({ image, title, description }) => (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%", // Set the same height for all cards
        justifyContent: "space-between",
        border:"none" // Ensures proper spacing for content
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: "200px", // Set a fixed height for the image
          objectFit: "cover", // Ensures the image covers the area without stretching
          borderRadius: "10px 10px ", // Rounded corners only on the top edges of the image
        }}
        image={image}
        alt={title}
      />
      <CardContent sx={{ marginTop: 4, }}>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <ArrowForwardIcon sx={{bgcolor:"blue" , borderRadius:"50%" , color:"white" , padding:"2px" ,fontSize:"30px" , mr:2}}/>
        <Typography variant="contained" color="primary" size="small" href="#">
          Read more
        </Typography>
      </CardContent>
    </Card>
  );
  
  const News = () => {
    const newsData = [
      {
        image: img5, // Replace with actual image URL
        title: 'High school became more cooler with codt smart school',
        description: 'Studying through CODT Education Abroad was a life-changing experience! The program provided exceptional...'
      },
      {
        image: img6, // Replace with actual image URL
        title: 'Schools Solutions at Codt Corporate',
        description: 'Discover innovative solutions for schools through Codt Corporate’s specialized programs...'
      },
      {
        image: img7, // Replace with actual image URL
        title: 'High school became more cooler with codt smart school',
        description: 'Studying through CODT Education Abroad was a life-changing experience! The program provided exceptional...'
      }
    ];
  
    return (
<div className="md:px-[160px] sm:px-[20px]">
<Typography variant="h5" component="h5" align="start" gutterBottom  style={{ paddingLeft: '30px' }}>
          Latest News
        </Typography>
        <Grid container spacing={4}>
          {newsData.map((news, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <NewsCard {...news} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };



//footer

const Footer = () => {
  return (
    <Box
    sx={{
      backgroundColor: "#f5f5f5",
      padding: "20px",
      paddingTop: "80px",
      paddingBottom: "80px",

      marginTop: "80px",
      overflowX: "hidden",
    }}
  >
    <Grid
      container
      spacing={2}
      justifyContent="flex-start"
      textAlign={{ xs: "start", sm: "left" }}
      sx={{
        paddingLeft: { xs: "20px", sm: "20px", md: "180px" },
        paddingRight: { xs: "20px", sm: "20px", md: "180px" },
      }}
    >
      {/* Logo and Social Icons */}
      <Grid
  item
  xs={12}     // Full width on mobile (12 out of 12 columns)
  sm={4}      // 4 out of 12 columns on small screens (tablet)
  md={3}      // 3 out of 12 columns on medium and larger screens (desktop)
  sx={{
    paddingTop: { xs: 20, sm: 40, md: 60 },  // Adjust top padding responsively
  }}
>
        <Box
          display="flex"
          flexDirection="column"
          alignItems={{ xs: "center", sm: "flex-start" }}
          sx={{
            paddingLeft: { md: "0px" },
            paddingRight: { md: "0px" },
          }}
        >
          <CardMedia
            component="img"
            src={img2}
            sx={{
              height: "65px",
              width: "150px",
              mb: 2,
            }}
          />
          <Typography variant="h6" mb={1} sx={{ fontSize:{xs: 12 , sm:10 , md:14} }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton href="#" aria-label="Facebook" color="primary">
              <Facebook />
            </IconButton>
            <IconButton href="#" aria-label="Instagram" color="secondary">
              <Instagram />
            </IconButton>
            <IconButton href="#" aria-label="YouTube" color="error">
              <YouTube />
            </IconButton>
            <IconButton href="#" aria-label="Twitter" sx={{ color: "#1DA1F2" }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" aria-label="LinkedIn" sx={{ color: "#0072b1" }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Grid>
  
      {/* Management Links */}
      <Grid
  item
  xs={12}     // Full width on mobile (12 out of 12 columns)
  sm={4}      // 4 out of 12 columns on small screens (tablet)
  md={3}      // 3 out of 12 columns on medium and larger screens (desktop)
  sx={{
    paddingTop: { xs: 20, sm: 40, md: 60 },  // Adjust top padding responsively
  }}>        <Box display="flex" flexDirection="column" justifyContent="Start" alignContent="flex-start" gap={2}>
          <Typography variant="h5" gutterBottom>
            <strong>Management</strong>
          </Typography>
          {[
            "Students",
            "Teachers",
            "Academics",
            "Salary",
            "Live Classes",
            "School Fees",
            "Notice",
            "Report Card",
          ].map((item) => (
            <Typography key={item} variant="body2" fontSize={16} color="text.secondary">
              {item}
            </Typography>
          ))}
        </Box>
      </Grid>
  
      {/* Services Links */}
      <Grid
  item
  xs={12}     // Full width on mobile (12 out of 12 columns)
  sm={4}      // 4 out of 12 columns on small screens (tablet)
  md={2}      // 3 out of 12 columns on medium and larger screens (desktop)
  sx={{
    paddingTop: { xs: 20, sm: 40, md: 60 },  // Adjust top padding responsively
  }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h5" gutterBottom>
            <strong>Services</strong>
          </Typography>
          {[
            "Online Courses",
            "Career Research",
            "Education Abroad",
            "NEP Training for Staff and Teachers",
            "Management System",
            "Community Support",
          ].map((item) => (
            <Typography key={item} variant="body2" fontSize={16} color="text.secondary">
              {item}
            </Typography>
          ))}
        </Box>
      </Grid>
    </Grid>
  </Box>
  
  );
};











//education abroad
const EducationAbroad = () => {
  return (
    <Box sx={{ backgroundColor: "#fff9f7",}}>
    <Box
      sx={{
        marginX: { xs: "10px", sm: "20px", md: "50px", lg: "100px" },
         // Responsive left/right spacing
        padding: { xs: "20px", md: "30px" },
        textAlign: "center",
        overflowX: "hidden",
      }}
    >
      {/* Top Section */}
      <Grid
  container
  spacing={4}
  alignItems="center"
  sx={{
    paddingLeft: { xs: "20px", md: "120px" }, // Padding for left
    paddingRight: { xs: "20px", md: "120px" }, // Padding for right
  }}
>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
         <CardMedia
  component="img"
  src={img8}
  alt="Image description" // It's a good practice to add an alt attribute for accessibility
  sx={{
    height: { xs: "120px", sm: "160px" },  // On mobile (xs), height is smaller (120px), larger on medium (sm) and above
    width: { xs: "100%", sm: "350px" },    // On mobile (xs), width is 100% of the container, fixed width on larger screens
    objectFit: "cover",  // Ensures the image covers the specified area without distortion
  }}
/>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e84839",
              color: "#fff",
              borderRadius: "30px",
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: "18px",
              marginTop: "10px",
              textTransform:'capitalize'
            }}
          >
            Start Your Journey
            <ArrowForwardIcon
              sx={{
                bgcolor: "white",
                borderRadius: "50%",
                color: "#ff3d00",
                padding: "4px",
                fontSize: { xs: "24px", md: "30px" },
                ml: 2,
              }}
            />
          </Button>
          <Typography variant="body1" sx={{ marginTop: "20px", fontWeight: 500, fontSize:'22px' }}>
            We offer Free Consultation and easy solution to our students
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "10px", maxWidth: { xs: "100%", md: "80%",fontSize:'18px' } }}
          >
            Summer Camps, Certification Courses, and also apply for degree
            courses, with zero consultation charges
          </Typography>
        </Grid>

        {/* Right Section */}
        <Grid
  item
  xs={12}
  md={6}
  sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: { xs: "center", md: "flex-start" },
   
  }}
>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: { xs: "center", md: "center" },
              mt: { xs: 2, md: 8 },
              ml: {  md: 3 },
              fontSize:'24px',
              fontWeight:'500'
            }}
          >
            800+ Universities to choose from
          </Typography>
          {/* <CardMedia
            component="img"
            src={img9}
            sx={{
              height: "200px",
              width: "100%",
              maxWidth: "380px",
            }}
          /> */}
          <Grid container spacing={2} sx={{ padding: 2 }}>
      {images.map((image, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              image={image}
              alt={`Image ${index + 1}`}
              sx={{ height: 120, objectFit: 'cover' }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Grid
  container
  spacing={4}
  alignItems="center"
  justifyContent="center"
  sx={{
    paddingLeft: { xs: "20px", md: "120px" }, // Padding for left
    paddingRight: { xs: "20px", md: "120px" },
    marginTop: "30px" // Padding for right
  }}
>
        {/* Left Side with Boxes */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} justifyContent="center">
            {[
              { title: "800+", subtitle: "Universities" },
              { title: "46+", subtitle: "Countries" },
              { title: "No Agent Fee", subtitle: "" },
              { title: "Easy Visa Processing", subtitle: "" },
            ].map((stat, index) => (
              <Grid item xs={6} sm={6} key={index}>
                <Card
                  sx={{
                    padding: "20px",
                    boxShadow: "none",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #eee",
                    height: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {stat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side with Image */}
        <Grid item xs={12} md={6}>
          <Box sx={{ marginTop: { xs: "20px", md: "40px" } }}>
            <CardMedia
              component="img"
              image={img10} // Replace with student/globe image
              alt="Student with globe"
              sx={{
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};




  



//2nd page
function SmartSchoolSection() {
  return (
    <Box sx={{ backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Main Layout */}
      <Grid
  container
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt: 2,
    position: "relative",
  }}
  className="px-5 sm:px-20 lg:px-[250px] mt-16" // Tailwind for responsive padding
>
       <Grid
        item
        xs={12}
        md={6}
        sx={{
          textAlign: { xs: "start", md: "left" },
          padding: "2rem",
          maxWidth: "500px",
        }}
      >
        <img
          src={img11}
          alt="CoDT Logo"
          style={{ width: "298px", marginBottom: "20px", alignContent:'start' }}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "24px", md: "30px" } }}
        >
          Empowering <span style={{ color: "#6246ea" }}>educators</span> and{" "}
          <br/>
          <span style={{ color: "#6246ea" }}>students</span>
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "14px", md: "18px" } }}
          color="black"
          gutterBottom
        >
          with our Digital Systems and services
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6246ea", // Main button color
            color: "#fff", // Text color
            borderRadius: "45px", // Rounded corners
            padding: { xs: "0.25rem 0.5rem", md: "0.5rem 1.5rem", sm: "0.2rem 0.5rem" }, // Responsive padding for mobile and desktop
            mt: 2, // Margin-top
            fontSize: { xs: "20px", md: "29px" }, // Responsive font size
            textTransform: "none", // Disable uppercase transformation
            boxShadow: "0px 4px 8px rgba(98, 70, 234, 0.4)", // Box shadow
            "&:hover": {
              backgroundColor: "#5139d5", // Hover background color
            },
            display: "flex", // Align icon and text
            alignItems: "center", // Vertical alignment
          }}
          endIcon={(
            <ArrowForwardIcon
            sx={{
              bgcolor: "#fff", // Background color of the icon (white)
              color: "#6246ea", // Icon color (purple)
              borderRadius: "70%", // Round shape of the icon's background
              padding: "4px", // Padding around the icon
              ml: 2, // Left margin for spacing between text and icon
              height:'50px',
              width:'50px'
            }}
          />
          )}
        >
          Book A Demo
        </Button>
      </Grid>
      {/* Image of Girl */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: { xs: "10rem", md: "0" },  }}
          

      >
        <img
          src={img12}
          alt="CoDT Logo"
          style={{ width: "100%", maxWidth: "900px", position:'absolute', marginTop:'185px' 
             }}
        />
      </Grid>

      {/* Text Content */}
     
    </Grid>

      {/* Bottom Image */}
      <Box> {/* Maintain order */}
        <img src={img13} alt="CoDT Logo"   />
      </Box>



    </Box>
  );
}






const Homepage = () => {
  const logos = [
    { src: img14, alt: "ThePrint" },
    { src: img15, alt: "Business Standard" },
    { src: img16, alt: "ANI" },
    { src: img17, alt: "MSME" },
    { src: img18, alt: "Global Triumph Foundation" },
    { src: img19, alt: "Image Planet" },
  ];
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{fontFamily:"Poppins"}}>
    <Box >
    {/* Header Section */}
    <Box>
  {/* Header Section */}
  
  <AppBar position="static" color="transparent" elevation={0}>
  <Toolbar sx={{ mt: 8 }}>
    {/* CODT Image */}
    <Box
      component="img"
      src={img2br}
      sx={{
        height: "60px",
        backgroundColor: "#f0f0f0",
        // Remove or reduce ml to keep logo closer to navigation
        ml: { xs: "10px", md: "10rem" }, // Reduced margin on larger screens
      }}
    />

    {/* Buttons for larger screens */}
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        ml: { xs: "10px", md: "4rem" }, // Reduced margin on larger screens
        justifyContent: "flex-start",
        gap: 2,
      }}
    >
      <Button
        style={{
          textTransform: "capitalize",
          fontSize: "17px",
          color: "#696666",
          backgroundColor: "transparent",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "transparent"; // Ensure background stays transparent on hover
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        What we do
      </Button>

      <Button
        style={{
          textTransform: "capitalize",
          fontSize: "17px",
          color: "#696666",
          backgroundColor: "transparent",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        Our Services
      </Button>

      <Button
        style={{
          textTransform: "capitalize",
          fontSize: "17px",
          color: "#696666",
          backgroundColor: "transparent",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        Future Of Education with CODT
      </Button>
    </Box>

    {/* Menu icon for smaller screens */}
    <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
      <IconButton color="inherit" onClick={handleMenuClick}>
        <MenuIcon />
      </IconButton>
    </Box>

    {/* Menu for smaller screens */}
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        style: { width: "200px" },
      }}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography>What we do</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography>Our Services</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography>Future Of Education with CODT</Typography>
      </MenuItem>
    </Menu>
  </Toolbar>
</AppBar>

  {/* Hero Section */}
  <Container sx={{ mt: 5, textAlign: { xs: "center", md: "left" } }}>
    <Grid container spacing={3} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
      <Grid item xs={12} md={6}>
      <Typography 
      style={{ fontSize: '2.6rem' , fontWeight:'600' }}
  variant="h4" 
  className="typography-heading" 
  gutterBottom
>
  Everything education needs...
</Typography>  
<Typography variant="h5" style={{ color: '#605252' }} gutterBottom>
          Education Driven More Powerful
        </Typography>
        <Typography variant="h5" style={{ color: '#605252' }} gutterBottom>
          And Smarter with <strong style={{ color: "black"  }}>CODT</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src={img3}
          sx={{
            height: { xs: "300px", md: "440px" }, // Adjust height for responsiveness
            width: { xs: "300px", md: "800px" },
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            marginBottom: { xs: "20px", md: "0" },
            marginTop:{xs:'4px', md:'-70px'}
          }}
        />
      </Grid>
    </Grid>
  </Container>

  {/* Our Services Section */}
  <Container sx={{ mt: 5 }}>

  <Typography 
  variant="h5"  
  style={{ 
    color: '#605252', 
    fontWeight: 500, 
    fontSize: '30px', // Added font size
    fontFamily: 'Poppins, sans-serif' // Optional, for setting font family
  }} 
  textAlign="center" 
  mb={6}
>      Our Services
    </Typography>
    <Grid container spacing={2} justifyContent="center" style={{ fontSize: '32px' }}>
      {[
        { label: "Smart School - LMS", color: "#503dff", icon: <SchoolIcon /> ,link:"https://codtschool.strangeweb.info/auth/schoollogin"},
        { label: "Online Course", color: "#43c466", icon: <ComputerIcon /> ,link:"https://codt.in/"},
        { label: "Education Abroad", color: "#ff3131", icon: <FlightIcon /> ,link:"#"},
        { label: "Institute Courses", color: "#399be6", icon: <BusinessIcon />,link:"#" },
      ].map((service, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Button
           onClick={() => window.open(`${service.link}`, '_blank')}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: service.color,
              color: "#fff",
               fontSize: '19px',
              fontWeight: "bold",
              textTransform:'capitalize',
              px: 3,
              py: 2.2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderRadius: "40px",
              "&:hover": { backgroundColor: service.color },
            }}
          >
            {service.icon}
            {service.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  </Container>
  <Container sx={{ mt: 5 }}>
  <Typography 
  variant="h5"  
  style={{ 
    color: '#605252', 
    fontWeight: 500, 
    fontSize: '22px', // Added font size
    fontFamily: 'Poppins, sans-serif' // Optional, for setting font family
  }} 
  textAlign="center" 
  mb={0}
  mt={10}
>          Featured In
    </Typography>
  <Box
    sx={{
      display: "flex",
      flexWrap: { xs: "wrap", md: "nowrap" }, // Wrap images on phone, no wrap on larger screens
      justifyContent: { xs: "space-between", md: "space-evenly" }, // Space images between on laptop and phone
      overflowX: "auto",
      whiteSpace: "nowrap",
      py: 0,
      px: 2,
      backgroundColor: "white",
      "&::-webkit-scrollbar": {
        height: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#c1c1c1",
        borderRadius: "4px",
      },
    }}
  >
    {logos.map((logo, index) => (
      <Box
        key={index}
        sx={{
          display: "inline-block",
          mx: 2,
          textAlign: "center",
          width: { xs: "30%", md: "auto" }, // Set width for phone (3 per row) and auto for larger screens
          marginBottom: { xs: "1rem", md: "0" }, // Add bottom margin for phone
        }}
      >
        <CardMedia
          component="img"
          src={logo.src}
          alt={logo.alt}
          sx={{
            height: "140px",
            width: "100%",
            objectFit: "contain",
            filter: "grayscale(100%)", // Grayscale logos
          }}
        />
      </Box>
    ))}
  </Box>
</Container>


  {/* Horizontal Image */}
 






  {/* Bottom Section */}
  <Container sx={{ mt: 5, mb: 5, textAlign: { xs: "center", md: "left" } }}>
    <Grid container spacing={2} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
      <Grid item xs={12} md={6}>
       <Typography variant="h3" fontWeight="bold" gutterBottom style={{ fontSize: '2.6rem', color:'black' }}>
  We are Upgrading
</Typography>
<Typography variant="h3" fontWeight="bold" gutterBottom style={{ fontSize: '2.5rem', color:'black' }}>
  education system all
</Typography>
<Typography variant="h3" fontWeight="bold" gutterBottom style={{ fontSize: '2.5rem',color:'black' }}>
  around in <span style={{ color: "#e4361e" }}>India</span>
</Typography>

      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src={img1}
          sx={{
            height: { xs: "300px", md: "450px" }, // Adjust height for responsiveness
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            ml: { xs: 0, md: "20px" },
            marginBottom: { xs: "20px", md: "10rem" },
          }}
        />
      </Grid>
    </Grid>
  </Container>
</Box>

    <SmartSchoolSection/>
    <CourseCarousel/>
    <EducationAbroad/>
    <Testimonials/>
    <News/>
    <Footer/>
    
   
  </Box>
  </div>
 
  );
};

export default Homepage;


