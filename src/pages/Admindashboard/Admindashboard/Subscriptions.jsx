import React, { useState, useEffect } from 'react';
import { fetchData } from '../../../src/Service/apiService';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ClipLoader from "react-spinners/ClipLoader";


const TeacherReview = ({ name, image, plan, expiry, price }) => {
  return (
    <Card
    variant="outlined"
    sx={{
      display: "flex",
      alignItems: "center",
      borderRadius: "16px",
      mb: 2,
      flexDirection: { xs: "column", sm: "row" },
      border: "2px solid", // Adding a custom border
      borderColor: "#503dff", // Applying the custom color
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 2, sm: "12px" },
      }}
    >
      <Avatar
        src={image}
        alt={name}
        sx={{ width: 56, height: 56, mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
      >
        {image ? null : <PersonIcon />}
      </Avatar>
      <div className="flex_box">
        <div>{name}</div>
        <div>Plan: {plan}</div>
        <div>Expiry: {expiry}</div>
        <div>Price: ₹{price}</div>
      </div>
    </CardContent>
  </Card>
  
  );
};

const Subscriptions = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [stud, setStud] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // To check if there are more records to load

  useEffect(() => {
    const fetchDataAsync = async () => {
      const query = `
        SELECT 
          students.id AS student_id,
          students.first_name,
          students.last_name,
          students.status,
          students.image,
          purchaseedcourses.planename,
          purchaseedcourses.Expiri,
          purchaseedcourses.price
        FROM 
          students
        JOIN 
          purchaseedcourses
        ON 
          students.id = purchaseedcourses.sid
        WHERE 
          students.status = "active"
        LIMIT ${(page - 1) * 10}, 10;  // Limit the results based on the page
      `;

      const { data: fetchedData, error: fetchError } = await fetchData(query);

      if (fetchedData) {
        setStud(prev => [...prev, ...fetchedData]); // Append new data to the existing list
        if (fetchedData.length < 10) {
          setHasMore(false); // No more data to load
        }
      } else {
        setError(fetchError);
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, [page]);

  const filteredReviews = stud?.length > 0
    ? stud.filter(review =>
        `${review.first_name} ${review.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>

      <Typography variant="h6" mt={2} mb={4} sx={{ color: "#503dff" }}>
        Students Subscription
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "start", mb: 2 }}>
      <TextField
  variant="outlined"
  placeholder="Search by name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{
    flexGrow: 1,
    mr: 2,
    maxWidth: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#503dff", // Border color
      },
      "&:hover fieldset": {
        borderColor: "#755cff", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#503dff", // Border color when focused
      },
    },
    "& .MuiInputBase-input": {
      color: "#503dff", // Text color
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#755cff", // Placeholder color
    },
  }}
/>

      </Box>

      <Box>
        <Grid container direction="column">
          {loading ? (

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
<ClipLoader color="#000000" size={50} />
</div>

          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            filteredReviews.map((review, index) => (
              <Grid item key={index}>
                <TeacherReview
                  name={`${review.first_name} ${review.last_name}`}
                  image={review.image}
                  plan={review.planename}
                  expiry={review.Expiri}
                  price={review.price}
                />
              </Grid>
            ))
          )}
        </Grid>

        {/* Load More Button */}
        {hasMore && !loading && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#503dff",
              color: "#fff",
              borderRadius: "8px",
              textTransform: "none",
              mt: 2,
              width: "100%",
              maxWidth: "120px",
              display: "block",
              mx: "auto",
              "&:hover": {
                backgroundColor: "#4030cc"
              }
            }}
            onClick={() => setPage(prev => prev + 1)} // Increase page number
          >
            Load More
          </Button>
        )}
      </Box>
    </>
  );
};

export default Subscriptions;
