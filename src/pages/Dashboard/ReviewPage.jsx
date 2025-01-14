import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Card, CardContent, Grid } from '@mui/material';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { fetchData } from '../../src/Service/apiService'; // Ensure this function is correctly implemented

// TeacherReviewCard component to display individual teacher review
const TeacherReviewCard = ({ reviewText, rating, date }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '12px',
        mb: 3,
        padding: '16px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderColor: '#503dff',
      }}
    >
      <CardContent>
        {/* Review Text */}
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.9rem',
            color: 'text.secondary',
            mb: 2,
          }}
        >
          {reviewText}
        </Typography>

        {/* Rating and Date */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: '#503dff', mr: 1 }}>
              {rating} / 5
            </Typography>
            {Array(Math.floor(rating))
              .fill(0)
              .map((_, index) => (
                <FaStar key={index} style={{ color: '#FFD700', marginRight: 2 }} />
              ))}
            {rating % 1 !== 0 && <FaStarHalfAlt style={{ color: '#FFD700', marginRight: 2 }} />}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.8rem',
            }}
          >
            Date - {date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Main ReviewsList component
const ReviewsList = () => {
  const [teacherReviews, setTeacherReviews] = useState([]); // State to hold reviews data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [uid, setUid] = useState(''); // User ID state

  // Fetch reviews data based on uid (student's unique id)
  const fetchReviewsData = async () => {
    try {
      const query = `SELECT * FROM reviews WHERE sid = ${uid};`; // Assuming the query is correct
      const { data, error: fetchError } = await fetchData(query);

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      if (data) {
        setTeacherReviews(data); // Store fetched reviews in the state
      } else {
        setError('No reviews found');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve user data from localStorage and set state for uid
  useEffect(() => {
    const storedStud = localStorage.getItem('stud');
    if (storedStud) {
      const stud = JSON.parse(storedStud);
      const { user_id } = stud.data; // Get the user id (uid) from localStorage
      setUid(user_id); // Update state with user id
    } else {
      console.log('No user data found in localStorage.');
    }
  }, []);

  // Fetch reviews data when uid is available
  useEffect(() => {
    if (uid) {
      fetchReviewsData(); // Fetch the reviews when uid is set
    }
  }, [uid]); // Trigger fetch when uid changes

  // Loading and error handling
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          mb: 6,
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        What teachers think about you
      </Typography>

      {/* Render Teacher Reviews */}
      <Grid container spacing={2}>
        {teacherReviews.map((review, index) => (
          <Grid item xs={12} key={index}>
            {/* Teacher's Profile */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2, // Margin below the photo and name
              }}
            >
              <Avatar
                src="https://via.placeholder.com/100" // Placeholder for now, can be dynamic
                alt="Teacher Avatar"
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {review.teachername} {/* Displaying teacher's name dynamically from review data */}
              </Typography>
            </Box>

            {/* Review Card */}
            <TeacherReviewCard
              reviewText={review.review} // Review text from database
              rating={review.rating} // Rating from database
              date={review.created_at} // Created date from database
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewsList;
