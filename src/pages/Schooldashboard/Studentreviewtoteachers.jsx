import React from 'react';
import profile from '../../images/profiles.png';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const TeacherReview = ({ name, rating, image }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        mb: 2,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: '12px' },
        }}
      >
        <Avatar src={profile} sx={{ width: 56, height: 56, mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'center', sm: 'flex-start' },
            flexDirection: 'column',
            flexGrow: 1,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '0.875rem', md: '1rem' },
              mb: { xs: 1, sm: 0 },
            }}
          >
            {name} gave you {rating}/5
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            {Array(Math.floor(rating))
              .fill(0)
              .map((_, index) => (
                <FaStar key={index} style={{ color: '#FFD700', marginRight: 2 }} />
              ))}
            {rating % 1 !== 0 && <FaStarHalfAlt style={{ color: '#FFD700', marginRight: 2 }} />}
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ width: { xs: '100%', sm: 'auto' }, px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: '#503dff',
            color: 'white',
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#4030cc',
            },
          }}
        >
          See More
        </Button>
      </CardActions>
    </Card>
  );
};

const ReviewsList = () => {
  const reviews = [
    { name: 'Mrs. Nipa Nayak', rating: 4.5, image: 'https://via.placeholder.com/56' },
    { name: 'Mr. Sandip Ujwal', rating: 4.5, image: 'https://via.placeholder.com/56' },
    { name: 'Mrs. Sejal Goswami', rating: 4.5, image: 'https://via.placeholder.com/56' },
    { name: 'Mr. Ketan Patel', rating: 4.5, image: 'https://via.placeholder.com/56' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        What Students think about Mrs. Neepa
      </Typography>
      <Grid container direction="column">
        {reviews.map((review, index) => (
          <Grid item key={index}>
            <TeacherReview
              name={review.name}
              rating={review.rating}
              image={review.image}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#503dff',
          color: '#fff',
          borderRadius: '8px',
          textTransform: 'none',
          mt: 2,
          width: '100%',
          maxWidth: '120px',
          display: 'block',
          mx: 'auto',
          '&:hover': {
            backgroundColor: '#503dff',
          },
        }}
      >
        See All
      </Button>
    </Box>
  );
};

export default ReviewsList;
