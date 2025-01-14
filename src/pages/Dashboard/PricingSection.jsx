import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Link } from '@mui/material';
import PricingCard from './PricingCard.jsx';

const PricingSection = () => {
  const [purchasedPlan, setPurchasedPlan] = useState(null);
  const [plans] = useState([
   
  
  ]);

  useEffect(() => {
    const fetchPurchasedPlan = async () => {
      const storedUser22 = 70; // Fixed ID for testing
      try {
        const response = await fetch(`https://codtsmartschool.strangeweb.in/studentapi/studplan.php?sid=${storedUser22}`);
        const data = await response.json();
        
        console.log('API Response:', data); // Log the full response

        if (data && data.length > 0) {
          const activePlan = data[0]; // Get the first plan as the active one
          console.log('Active Plan:', activePlan); // Log the active plan

          setPurchasedPlan(activePlan);
        } else {
          console.warn('No plans found or data structure is unexpected.');
        }
      } catch (error) {
        console.error('Error fetching purchased plan:', error);
      }
    };

    fetchPurchasedPlan();
  }, []);

  return (
    <Box sx={{ padding: 3, textAlign: 'start' }}>
      {purchasedPlan && (
        <>
         <Typography variant="h4" sx={{color:'#503dff'  }}>Your Purchased Plan</Typography>
        <Box sx={{ marginBottom: 4, width: 300, backgroundColor: 'white', borderRadius: 2, padding: 2, color: 'white' }}>
         
          <PricingCard
                      price={purchasedPlan.price} // Plan name

            planname={purchasedPlan.planename} // Plan name
            duration={`${purchasedPlan.Expiri} Days`} // Duration from Expiri
            description={`Plan Date: ${purchasedPlan.Date}`} // Description with date
            bgColor="transparent" // Use transparent to avoid double background
            isActive={true} // Indicate it's the active plan
          />
        </Box>
        </>

      )}

      <Grid container spacing={2} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.planname}>
            <PricingCard
              price={plan.price}
              planname={plan.planname}
              duration={plan.duration}
              description={plan.description}
              isActive={purchasedPlan && purchasedPlan.planename === plan.planname}
              bgColor={purchasedPlan && purchasedPlan.planename === plan.planname ? 'white' : 'white'} // Green for active plan
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'left', padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="body1" sx={{ mt: 3 }}>
          Your plan will end on <Link href="#" sx={{ color: '#503dff' }}>21 April 2024</Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 4 }}>
          Upgrade to a higher plan for uninterrupted services.
        </Typography>
      </Box>
      
      <Box sx={{ textAlign: 'left', padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h6">Need Help regarding Payment?</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Contact Support: <Link href="tel:+919900990009" sx={{ color: '#503dff' }}>+91 990 099 0009</Link>
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Drop an email, we will get back to you in the next 24 hours:
          <Link href="mailto:abc@xyz.com" sx={{ color: '#503dff', ml: 1 }}>
            abc@xyz.com
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default PricingSection;
