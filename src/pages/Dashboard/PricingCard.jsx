import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const PricingCard = ({ price, duration, description, isActive = false }) => {
  return (
    <Card elevation={0}
      sx={{
        textAlign: 'center',
        padding: 2,
        borderColor: isActive ? '#e8e8e8' : '#e8e8e8',
        width : '300px',
        border : 'solid 1px #cecece',
        backgroundColor : '#fff',
        borderRadius: '12px'
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
