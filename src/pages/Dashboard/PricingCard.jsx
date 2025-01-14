import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const PricingCard = ({ price, duration, description, isActive = false }) => {
  return (
    <Card
      sx={{
        textAlign: 'center',
        padding: 2,
        borderColor: isActive ? '#e8e8e8' : '#e8e8e8',
        borderWidth: 2,
        borderStyle: 'solid',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        height: '220px'
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          ₹{price}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {duration}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
          {description}
        </Typography>
        {isActive ? (
          <Button variant="outlined" sx={{ color: 'green', borderColor: '#e8e8e8' }}>
            Active
          </Button>
        ) : (
          <Button variant="contained" sx={{ backgroundColor: '#503dff', color: '#fff' }}>
            Subscribe
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingCard;
